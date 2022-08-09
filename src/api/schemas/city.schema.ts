import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {State} from "./state.schema";
import {Country} from "./country.schema";

export type CityDocument = City & mongoose.Document;

@Schema()
export class City {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State' })
    state: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
    country: Country;
}

export const CitySchema = SchemaFactory.createForClass(City);