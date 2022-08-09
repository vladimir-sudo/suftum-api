import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {State} from "./state.schema";
import {City} from "./city.schema";
import {Type} from "class-transformer";
import {Country} from "./country.schema";

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    birthDay: string;

    @Prop()
    email: string;

    @Prop()
    gender: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
    @Type(() => City)
    city: City;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State' })
    @Type(() => State)
    state: State

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
    @Type(() => Country)
    country: Country;

    @Prop()
    address: string;

    @Prop()
    pinCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);