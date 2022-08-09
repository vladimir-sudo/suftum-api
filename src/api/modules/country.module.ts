import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {CountryController} from "../controllers/country.controller";
import {Country, CountrySchema} from "../schemas/country.schema";
import {CountryService} from "../services/country.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Country.name,
                schema: CountrySchema
            },
        ])
    ],
    controllers: [CountryController],
    providers: [
        CountryService
    ],
})
export class CountryModule {
}
