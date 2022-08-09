import {IsEmail, IsString, MaxLength, IsDate, IsNumber} from "class-validator";
import {UserDto} from "./user.dto";

export class GetUsersDto implements UserDto {
    @IsString()
    @MaxLength(30)
    firstName: string;

    @IsString()
    @MaxLength(30)
    lastName: string;

    @IsDate()
    @MaxLength(30)
    birthDay: string;

    @IsEmail()
    @MaxLength(30)
    email: string;

    @IsString()
    @MaxLength(30)
    gender: string;

    @IsString()
    @MaxLength(30)
    country: string;

    @IsString()
    @MaxLength(30)
    city: string;

    @IsString()
    @MaxLength(30)
    state: string;

    @IsString()
    @MaxLength(30)
    address: string;

    @IsString()
    @MaxLength(30)
    pinCode: string;

    @IsNumber()
    @MaxLength(30)
    skip: number;

    @IsNumber()
    @MaxLength(30)
    limit: number;
}