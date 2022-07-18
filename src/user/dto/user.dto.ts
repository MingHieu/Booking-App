import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
