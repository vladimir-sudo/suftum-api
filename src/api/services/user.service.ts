import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "../dto/createUser.dto";
import {GetUsersDto} from "../dto/getUsers.dto";
import {UpdateUserDto} from "../dto/updateUser.dto";
import {City, CityDocument} from "../schemas/city.schema";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(City.name) private cityModel: Model<CityDocument>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);

        return createdUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});

        if (!existingUser) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return existingUser;
    }

    async delete(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return deletedUser;
    }

    async find(id): Promise<User> {
        return await this.userModel.findOne({_id: id})
            .populate([
                'country',
                'state',
                'city'
            ])
            .exec();
    }

    async findAll(getUsersDto: GetUsersDto): Promise<User[]> {
        const search: any = {
            firstName: new RegExp(getUsersDto.firstName ?? '', 'i'),
            lastName: new RegExp(getUsersDto.lastName ?? '', 'i'),
            email: new RegExp(getUsersDto.email ?? '', 'i'),
            address: new RegExp(getUsersDto.address ?? '', 'i'),
            pinCode: new RegExp(getUsersDto.pinCode ?? '', 'i'),
        };

        if (!!getUsersDto.birthDay) {
            search.birthDay = getUsersDto.birthDay;
        }

        if (!!getUsersDto.gender) {
            search.gender = getUsersDto.gender;
        }

        let users = await this.userModel.find(search)
            .populate(['country', 'state', 'city'])
            .exec();

        if (!!getUsersDto.country) {
            users = users.filter((u: any) => {
                return getUsersDto.country === u.country._id.toString();
            })
        }
        if (!!getUsersDto.city) {
            users = users.filter((u: any) => {
                return getUsersDto.city === u.city._id.toString();
            })
        }
        if (!!getUsersDto.state) {
            users = users.filter((u: any) => {
                return getUsersDto.state === u.state._id.toString();
            })
        }
        return users
    }
}
