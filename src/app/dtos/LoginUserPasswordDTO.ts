import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserPasswordDTO {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}