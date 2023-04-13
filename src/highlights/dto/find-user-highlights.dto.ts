import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class FindUserHighlightsDto {
  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsEnum(['newest', 'oldest'], {
    message: 'Sortby must either be newest or oldest',
  })
  sortBy?: 'newest' | 'oldest';
}
