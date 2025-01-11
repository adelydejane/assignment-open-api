import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GnewsService {
  private readonly API_URL = 'https://gnews.io/api/v4';
  private readonly API_KEY = '2d504ef974176296de39be6496a611e2'; 
  constructor(private readonly httpService: HttpService) {}

  async getTopHeadlines(): Promise<any> {
    try {
      const url = `${this.API_URL}/top-headlines?token=${this.API_KEY}&lang=en`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch data from GNews API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}