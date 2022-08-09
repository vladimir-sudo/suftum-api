import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/user.schema";
import {Model, Types} from "mongoose";
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

        const populateCountry: any = {path: 'country', match: {}};
        const populateState: any = {path: 'state', match: {}};
        const populateCity: any = {path: 'city', match: {}};

        if (!!getUsersDto.country) {
            populateCountry.match._id = getUsersDto.country;
        }
        if (!!getUsersDto.city) {
            populateCity.match._id = getUsersDto.city;
        }
        if (!!getUsersDto.state) {
            populateState.match._id = getUsersDto.state;
        }

        const populate = [populateCountry, populateCountry, populateCity];

        let users =  await this.userModel.find(search)
            .populate(populate)
            .exec();

        users = users.filter((u: User) => u.country && u.state && u.city);

        return users;
    }

    public paginate(users: User[], skip: number = 0, limit: number = 10) {
        return {
            length: users.length,
            users: users.splice(skip ?? 0, limit ?? 5),
        };
    }
}
