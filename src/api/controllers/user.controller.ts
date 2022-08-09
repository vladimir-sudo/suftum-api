import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UsePipes} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {GetUsersDto} from "../dto/getUsers.dto";
import {UpdateUserDto} from "../dto/updateUser.dto";
import {CreateUserDto} from "../dto/createUser.dto";

@Controller()
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    @Get()
    async index(@Res() response, @Query() getUsersDto: GetUsersDto) {
        try {
            const users = await this.usersService.findAll(getUsersDto);

            return response.status(HttpStatus.CREATED).json({
                users,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: ' + err.message,
                error: 'Bad Request'
            });
        }
    }

    @Get('/:id')
    async find(@Res() response, @Param('id') id: string) {
        try {
            const user = await this.usersService.find(id);

            return response.status(HttpStatus.CREATED).json({
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: ' + err.message,
                error: 'Bad Request'
            });
        }
    }

    @Post()
    async create(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.usersService.create(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created! ' + err.message,
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async update(@Res() response, @Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        try {
            const user = await this.usersService.update(id, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'User has been updated successfully',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not updated! ' + err.message,
                error: 'Bad Request'
            });
        }
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id: string) {
        try {
            const user = await this.usersService.delete(id);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                user,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
