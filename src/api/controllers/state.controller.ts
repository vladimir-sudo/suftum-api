import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import {StateService} from "../services/state.service";

@Controller()
export class StateController {
    constructor(private readonly stateService: StateService) {
    }

    @Get('/:country')
    async index(@Res() response, @Param('country') country: string) {
        try {
            const states = await this.stateService.findAll({country});

            return response.status(HttpStatus.CREATED).json({
                states,
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
