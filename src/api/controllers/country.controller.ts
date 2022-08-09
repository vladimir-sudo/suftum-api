import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {CountryService} from "../services/country.service";

@Controller()
export class CountryController {
    constructor(private readonly countryService: CountryService) {
    }

    @Get()
    async index(@Res() response) {
        try {
            const countries = await this.countryService.findAll();

            return response.status(HttpStatus.CREATED).json({
                countries,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: ' + err.message,
                error: 'Bad Request'
            });
        }
    }
}
