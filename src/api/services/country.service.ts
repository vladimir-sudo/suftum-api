import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Country, CountryDocument} from "../schemas/country.schema";
import {GetUsersDto} from "../dto/getUsers.dto";
import {User} from "../schemas/user.schema";

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country.name) private countryModel: Model<CountryDocument>
    ) {}

    async getOrCreate(name: string): Promise<Country> {
        const country = await this.countryModel.findOne({name}).exec();

        if (!country) {
            const createdCountry = new this.countryModel({name});
            return createdCountry.save();
        }
        return country;
    }

    async findById(id: string): Promise<Country> {
        const country = await this.countryModel.findById(id);

        if (!country) {
            throw new NotFoundException(`Country #${id} not found`);
        }
        return country;
    }

    async findAll(): Promise<Country[]> {
        return await this.countryModel.find().exec();
    }
}