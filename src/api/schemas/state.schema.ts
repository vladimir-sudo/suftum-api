import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Country} from "./country.schema";

export type StateDocument = State & mongoose.Document;

@Schema()
export class State {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
    country: Country;
}

export const StateSchema = SchemaFactory.createForClass(State);