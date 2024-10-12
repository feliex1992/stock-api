import { IsNotEmpty, IsString } from "class-validator";

export class VerifyOTPDTO {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}