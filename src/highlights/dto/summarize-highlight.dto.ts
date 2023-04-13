import { MinLength } from 'class-validator';

export class SummarizeHighlightDto {
  @MinLength(1)
  text: string;
}
