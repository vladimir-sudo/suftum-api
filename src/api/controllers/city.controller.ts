import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import {CityService} from "../services/city.service";

@Controller()
export class CityController {
    constructor(private readonly cityService: CityService) {
    }

    @Get('/:state')
    async index(@Res() response, @Param('state') state: string) {
        try {
            const cities = await this.cityService.findAll({state});

            return response.status(HttpStatus.CREATED).json({
                cities,
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
