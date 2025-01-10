import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GnewsService } from './gnews/gnews.service';

@Module({
  imports: [HttpModule],
  providers: [GnewsService],
})
export class AppModule {}
