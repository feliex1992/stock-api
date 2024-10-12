import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { LoginUserPasswordDTO } from "../dtos/LoginUserPasswordDTO";
import { validate } from "class-validator";
import bcrypt from 'bcrypt';
import { AuthUseCase } from "../use-cases/AuthUseCase";
import JWTUtils from "../utils/jwtUtils";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { LoginByNoPhoneDTO } from "../dtos/LoginByNoPhoneDTO";
import WhatsappWeb from "../../infrastructure/WhatsappWeb";
import redisClient from "../../infrastructure/RedisClient";
import { VerifyOTPDTO } from "../dtos/VerifyOTPDTO";

const OTP_EXPIRY = 300; // 5 Minutes

export class UserController {
  private authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  public async logIn(req: Request, res: Response): Promise<any> {
    const loginUserPasswordDTO = plainToInstance(LoginUserPasswordDTO, req.body);

    const errors = await validate(loginUserPasswordDTO);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const user = await this.authUseCase.logIn(loginUserPasswordDTO);

      if (!user) return res.status(400).json({
        error: {
          message: 'Username or password incorrect!'
        }
      });

      if (bcrypt.compareSync(loginUserPasswordDTO.password, user.password!)) {
        const token = new JWTUtils().generateToken({ 
          id: user.id,
          user_name: user.user_name,
        })

        return res.status(200).json({ 
          message: 'Login successful',
          token,
          id: user.id,
          user_name: user.user_name,
          full_name : user.full_name
        });
      } else {
        return res.status(400).json({ error: {
          message: 'Username or password incorrect!'
        }});
      }
    } catch(e: any) {
      if (typeof e === 'string') {
        return res.status(400).json({
          error: {
            message: e
          }
        });
      } else {
        return res.status(400).json(e);
      }
    }
  }

  public async logInByNoPhone(req: Request, res: Response): Promise<any> {
    const loginByNoPhoneDTO = plainToInstance(LoginByNoPhoneDTO, req.body);

    const errors = await validate(loginByNoPhoneDTO);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const user = await this.authUseCase.loginByNoPhone(loginByNoPhoneDTO);
      if (!user) return res.status(400).json({
        error: {
          message: `Invalid phone number!`
        }
      });

      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      const otpKey = `otp:${user.phone}`;

      // Store OTP in Redis with 5 minutes expiry
      await redisClient.set(otpKey, otp, {
        EX: OTP_EXPIRY, // Set expiry in seconds
      });

      // Send OTP
      await WhatsappWeb.sendMessage(user.phone!, `Halo! Berikut kode OTP Anda: ${otp}. Kode ini hanya berlaku 5 menit. Mohon jaga kerahasiaannya.`);
      return res.status(200).json({ message: 'OTP sent successfully' });
    } catch(e: any) {
      if (typeof e === 'string') {
        return res.status(400).json({
          error: {
            message: e
          }
        });
      } else {
        return res.status(400).json(e);
      }
    }
  }

  public async verifyOTPLogin(req: Request, res: Response): Promise<any> {
    const verifyOTPDTO = plainToInstance(VerifyOTPDTO, req.body);

    const errors = await validate(verifyOTPDTO);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const { phone, otp } = verifyOTPDTO;

      const otpKey = `otp:${phone}`;

      const storedOtp = await redisClient.get(otpKey);

      if (!storedOtp) {
        return res.status(400).json({ message: 'OTP expired or not found' });
      }

      if (storedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      const user = await this.authUseCase.getOneUserByFilter(`WHERE phone = '${phone}'`);
      if (!user) return res.status(400).json({
        error: {
          message: 'Invalid phone number!'
        }
      });

      // OTP is valid, generate JWT
      const token = new JWTUtils().generateToken({ 
        id: user.id,
        user_name: user.user_name,
      })

      // Clear OTP after successful login
      await redisClient.del(otpKey);

      return res.status(200).json({ 
        message: 'Login successful',
        token,
        id: user.id,
        user_name: user.user_name,
        full_name : user.full_name
      });
    } catch(e: any) {
      if (typeof e === 'string') {
        return res.status(400).json({
          error: {
            message: e
          }
        });
      } else {
        return res.status(400).json(e);
      }
    }
  }

  public async register(req: Request, res: Response): Promise<any> {
    const registerUserDTO = plainToInstance(RegisterUserDTO, req.body);

    const errors = await validate(registerUserDTO);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      if (registerUserDTO.password !== registerUserDTO.retype_password) return res.status(400).json({
        error: {
          message: 'Password and re-type password is not match!'
        }
      });
  
      const salt = bcrypt.genSaltSync(10);
      registerUserDTO.password = bcrypt.hashSync(registerUserDTO.retype_password, salt);
  
      const user = await this.authUseCase.register(registerUserDTO);
      return res.status(201).json(user);
    } catch(e: any) {
      if (typeof e === 'string') {
        return res.status(400).json({
          error: {
            message: e
          }
        });
      } else {
        return res.status(400).json(e);
      }
    }
  }
}