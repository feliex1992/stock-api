import { IsNotEmpty, IsString } from "class-validator";

export class LoginByNoPhoneDTO {
  @IsString()
  @IsNotEmpty()
  phone: string;
}