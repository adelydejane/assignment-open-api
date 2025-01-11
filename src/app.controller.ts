import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('api') 
export class AppController {
  @Get('headlines') 
  async getHeadlines() {
    try {
      const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
        params: {
          apikey: '2d504ef974176296de39be6496a611e2', 
          lang: 'en',
          country: 'ph',
        },
      });

      const articles = response.data.articles.map((article: any) => ({
        TITLE: article.title,
        DESCRIPTION: article.description,
        CONTENT: article.content,
        URL: article.url,
        IMAGE: article.image,
        'PUBLISHED AT': article.publishedAt,
      }));

      return {
        status: 'success',
        data: articles,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
