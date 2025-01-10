import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';

@Controller('api')
export class AppController {
  @Get('headlines')
  async getHeadlines(
    @Query('country') country: string, 
    @Query('limit') limit: string,
  ) {
    try {
      const selectedCountry = country || 'ph'; 
      const articleLimit = parseInt(limit, 10) || 1; 

      const response = await axios.get(
        'http://localhost:3000/api/headlines', 
        {
          params: {
            apiKey: '2d504ef974176296de39be6496a611e2', 
            country: selectedCountry, 
            pageSize: articleLimit, 
            language: 'en', 
          },
        },
      );

      const articles = response.data.articles.slice(0, articleLimit).map((article: any) => ({
        TITLE: article.title,
        DESCRIPTION: article.description,
        CONTENT: article.content,
        URL: article.url,
        IMAGE: article.urlToImage,
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
