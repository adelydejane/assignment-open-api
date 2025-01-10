import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GnewsService } from './gnews/gnews.service';
import { GnewsController } from './gnews/gnews.controller';

@Module({
  imports: [HttpModule],
  providers: [GnewsService],
  controllers: [GnewsController],
})
export class AppModule {}
