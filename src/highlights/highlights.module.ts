import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HighlightsController } from './highlights.controller';
import { HighlightsService } from './highlights.service';
import { Highlight, HighlightSchema } from './schemas/highlight.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Highlight.name, schema: HighlightSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [HighlightsController],
  providers: [HighlightsService, JwtAuthGuard],
})
export class HighlightsModule {}
