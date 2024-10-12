import { User } from "../../domain/entities/User";
import { LoginByNoPhoneDTO } from "../dtos/LoginByNoPhoneDTO";
import { LoginUserPasswordDTO } from "../dtos/LoginUserPasswordDTO";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { UserRepository } from "../repositories/UserRepository";

export class AuthUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async logIn(loginUserPasswordDTO: LoginUserPasswordDTO): Promise<User> {
    const user = await this.userRepository.getOneByFilter(`WHERE user_name = '${loginUserPasswordDTO.user_name}'`);
    return user;
  }

  public async loginByNoPhone(loginByNoPhoneDTO: LoginByNoPhoneDTO): Promise<User> {
    const user = await this.userRepository.getOneByFilter(`WHERE phone = '${loginByNoPhoneDTO.phone}'`);
    return user;
  }

  public async getOneUserByFilter(filter: string): Promise<User> {
    const user = await this.userRepository.getOneByFilter(filter);
    return user;
  }

  public async register(registerUserDTO: RegisterUserDTO): Promise<User> {
    const { user_name, full_name, phone, password } = registerUserDTO;
    const user: User = { user_name, full_name, phone, password };
    return await this.userRepository.create(user);
  }
}