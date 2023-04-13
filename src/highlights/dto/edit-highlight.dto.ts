import { IsOptional, IsString } from 'class-validator';

export class EditHighlightDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  label?: string;
}
