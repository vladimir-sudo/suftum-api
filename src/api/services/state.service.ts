import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Country, CountryDocument} from "../schemas/country.schema";
import {State, StateDocument} from "../schemas/state.schema";
import {City} from "../schemas/city.schema";

@Injectable()
export class StateService {
    constructor(
        @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
        @InjectModel(State.name) private stateModel: Model<StateDocument>
    ) {}

    async getOrCreate(name: string, country: Country): Promise<State> {
        const state = await this.stateModel.findOne({name}).exec();

        if (!state) {
            const createdState = new this.stateModel({name, country});
            return createdState.save();
        }
        return state;
    }

    async findById(id: string): Promise<State> {
        const state = await this.stateModel.findById(id);

        if (!state) {
            throw new NotFoundException(`State #${id} not found`);
        }
        return state;
    }

    async findAll(search): Promise<State[]> {
        return await this.stateModel.find(search).exec();
    }
}