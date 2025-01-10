import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GnewsService } from './gnews.service';

@Controller('api')
export class GnewsController {
  constructor(private readonly gnewsService: GnewsService) {}

  @Get('headlines')
  async getHeadlines() {
    try {
      const headlines = await this.gnewsService.getTopHeadlines();
      return {
        status: 'success',
        data: headlines,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve headlines',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
