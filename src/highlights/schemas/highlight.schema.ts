import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type HighlightDocument = Highlight & Document;

@Schema()
export class Highlight {
  @Prop({ required: true })
  userID: mongoose.Types.ObjectId;

  @Prop()
  text: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  label: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const HighlightSchema = SchemaFactory.createForClass(Highlight);

export interface Highlight {
  id: string;
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  text: string;
  summary: string;
  label: string;
  tags: string[];
}
