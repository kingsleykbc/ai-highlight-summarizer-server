import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SummarizeHighlightDto } from './dto/summarize-highlight.dto';
import { Highlight } from './schemas/highlight.schema';
import { HighlightsService } from './highlights.service';
import { AuthenticatedRequest } from 'src/auth/authenticated-request.interface';
import { FindUserHighlightsDto } from './dto/find-user-highlights.dto';
import { EditHighlightDto } from './dto/edit-highlight.dto';

@Controller('highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('summarize')
  async summarize(
    @Req() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) summarizeHighlightDto: SummarizeHighlightDto,
  ) {
    const user = req.user;
    return this.highlightsService.summarize(user.id, summarizeHighlightDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserHighlights(
    @Req() req: AuthenticatedRequest,
    @Query(new ValidationPipe()) filters: FindUserHighlightsDto,
  ): Promise<Highlight[]> {
    const user = req.user;
    return this.highlightsService.findUserHighlights(user.id, filters);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Req() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) updateHighlightDto: EditHighlightDto,
  ) {
    const user = req.user;
    return this.highlightsService.update(user.id, updateHighlightDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const user = req.user;
    return this.highlightsService.delete(user.id, id);
  }
}
