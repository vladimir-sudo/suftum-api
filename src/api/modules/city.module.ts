import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Country, CountrySchema} from "../schemas/country.schema";
import {StateController} from "../controllers/state.controller";
import {State, StateSchema} from "../schemas/state.schema";
import {StateService} from "../services/state.service";
import {City, CitySchema} from "../schemas/city.schema";
import {CityController} from "../controllers/city.controller";
import {CityService} from "../services/city.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Country.name,
                schema: CountrySchema
            },
            {
                name: State.name,
                schema: StateSchema
            },
            {
                name: City.name,
                schema: CitySchema
            },
        ])
    ],
    controllers: [CityController],
    providers: [
        CityService
    ],
})
export class CityModule {
}
