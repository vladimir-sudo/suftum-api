import {Module} from '@nestjs/common';
import {RouterModule} from "@nestjs/core";
import {UserModule} from "./api/modules/user.module";
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from "@nestjs/config";
import {CountryModule} from "./api/modules/country.module";
import {CityModule} from "./api/modules/city.module";
import {StateModule} from "./api/modules/state.module";
import {User, UserSchema} from "./api/schemas/user.schema";
import {Country, CountrySchema} from "./api/schemas/country.schema";
import {City, CitySchema} from "./api/schemas/city.schema";
import {State, StateSchema} from "./api/schemas/state.schema";

@Module({
    imports: [
        UserModule,
        CountryModule,
        StateModule,
        CityModule,
        RouterModule.register([
            {
                path: 'api',
                children: [
                    {
                        path: 'users',
                        module: UserModule,
                    },
                    {
                        path: 'countries',
                        module: CountryModule,
                    },
                    {
                        path: 'states',
                        module: StateModule,
                    },
                    {
                        path: 'cities',
                        module: CityModule,
                    },
                ]
            }
        ]),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`),
    ],
})
export class AppModule {
}
