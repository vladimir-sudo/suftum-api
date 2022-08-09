import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";
import {Country, CountrySchema} from "../schemas/country.schema";
import {City, CitySchema} from "../schemas/city.schema";
import {State, StateSchema} from "../schemas/state.schema";
import {UserController} from "../controllers/user.controller";
import {UserService} from "../services/user.service";
import {CityService} from "../services/city.service";
import {StateService} from "../services/state.service";
import {CountryService} from "../services/country.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name: Country.name,
                schema: CountrySchema
            },
            {
                name: City.name,
                schema: CitySchema
            },
            {
                name: State.name,
                schema: StateSchema
            },
        ])
    ],
    controllers: [UserController],
    providers: [
        UserService,
        CityService,
        StateService,
        CountryService
    ],
})
export class UserModule {
}
