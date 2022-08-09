import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Country, CountrySchema} from "../schemas/country.schema";
import {StateController} from "../controllers/state.controller";
import {State, StateSchema} from "../schemas/state.schema";
import {StateService} from "../services/state.service";

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
        ])
    ],
    controllers: [StateController],
    providers: [
        StateService
    ],
})
export class StateModule {
}
