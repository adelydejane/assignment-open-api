import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { GnewsService } from './gnews/gnews.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController], 
  providers: [GnewsService],
})
export class AppModule {}