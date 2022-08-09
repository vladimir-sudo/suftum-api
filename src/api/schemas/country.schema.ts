import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CountryDocument = Country & mongoose.Document;

@Schema()
export class Country {
    @Prop()
    name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);