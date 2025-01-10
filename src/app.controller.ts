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
      const selectedCountry = country || 'ph'; // Default to 'ph' for the Philippines
      const articleLimit = parseInt(limit, 10) || 1; // Default to 5 articles if no limit provided

      const response = await axios.get(
        'http://localhost:3000/api/headlines', // Updated to use a known working endpoint
        {
          params: {
            apiKey: '2d504ef974176296de39be6496a611e2', // Replace with your actual API key
            country: selectedCountry, // Set country to Philippines (ph)
            pageSize: articleLimit, // Limit the number of articles
            language: 'en', // Ensure articles are in English
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
