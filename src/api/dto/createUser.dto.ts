import {IsNotEmpty, IsEmail, IsString, MaxLength, IsDate} from "class-validator";
import {UserDto} from "./user.dto";

export class CreateUserDto implements UserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    lastName: string;

    @IsDate()
    @MaxLength(30)
    @IsNotEmpty()
    birthDay: string;

    @IsEmail()
    @MaxLength(30)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    gender: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    country: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    city: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    state: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    address: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    pinCode: string;
}