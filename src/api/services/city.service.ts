import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Country, CountryDocument} from "../schemas/country.schema";
import {City, CityDocument} from "../schemas/city.schema";

@Injectable()
export class CityService {
    constructor(
        @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
        @InjectModel(City.name) private cityModel: Model<CityDocument>
    ) {}

    async getOrCreate(name: string, country: Country): Promise<City> {
        const city = await this.cityModel.findOne({name}).exec();

        if (!city) {
            const createdCity = new this.cityModel({name, country});
            return createdCity.save();
        }
        return city;
    }

    async findById(id: string): Promise<City> {
        const city = await this.cityModel.findById(id);

        if (!city) {
            throw new NotFoundException(`City #${id} not found`);
        }
        return city;
    }

    async findAll(search): Promise<City[]> {
        return await this.cityModel.find(search).exec();
    }
}