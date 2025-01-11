# API Endpoint Documentation: GNews API Integration

This API allows users to fetch the latest top headlines from the GNews service based on predefined parameters.

**Base URL**: `http://localhost:3000/api`

---

## Endpoints

### **1. Get Top Headlines (GET)**
- **Method**: `GET`
- **Endpoint**: `/headlines`
- **Description**: Retrieves the latest top headlines from the GNews API, with options to specify country and limit the number of articles.

#### **Request Parameters**
- **country** (optional, string): The country code for filtering headlines. Defaults to `ph`.
- **limit** (optional, integer): The number of articles to return. Defaults to `1`.

#### **Response**

- **200 OK**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "TITLE": "More than 250 baby sea turtles released in Batangas and Quezon",
          "DESCRIPTION": "Some 250 baby sea turtles or hatchlings were released into the waters...",
          "CONTENT": "The baby sea turtles were released on January 9...",
          "URL": "https://www.gmanetwork.com/news/topstories/regions/932546/more-than-250-baby-sea-turtles-released...",
          "IMAGE": "https://images.gmanews.tv/webpics/2025/01/seaturtles_2025_01_11_09_13_40.jpg",
          "PUBLISHED AT": "2025-01-11T01:35:07Z"
        }
      ]
    }
    ```

- **400 Bad Request**:
    ```json
    {
      "status": "error",
      "message": "Failed to fetch data from GNews API"
    }
    ```

---

## Implementation Details

### **Modules**

#### 1. `AppModule`
Registers the necessary modules, controllers, and providers.

```typescript
@Module({
  imports: [HttpModule],
  providers: [GnewsService],
  controllers: [GnewsController],
})
export class AppModule {}
```

---

#### 2. `AppController`
Handles the `/headlines` endpoint and interacts with the GNews API using Axios. Allows specifying country and article limit through query parameters.

```typescript
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
```

---

#### 3. `GnewsService`
Encapsulates the logic for fetching data from the GNews API and includes error handling.

```typescript
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
      throw new HttpException('Failed to fetch data from GNews API', HttpStatus.BAD_REQUEST);
    }
  }
}
```

---

#### 4. `ApiService`
Provides additional methods for interacting with the GNews API using RxJS for observables.

```typescript
@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://gnews.io/api/v4/top-headlines';
  private readonly apiKey = '2d504ef974176296de39be6496a611e2';

  constructor(private readonly httpService: HttpService) {}

  getTopHeadlines(query: any): Observable<any> {
    const params = {
      apiKey: this.apiKey,
      language: 'en',
      country: query.country || 'ph', 
    };

    return this.httpService
      .get(this.apiUrl, { params })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error(error);
          throw new Error('Failed to fetch news');
        })
      );
  }
}
```

---

## Example Usage

### **Postman Request**

- **Method**: `GET`
- **URL**: `http://localhost:3000/api/headlines`

#### **Request Parameters**
- **country** (optional): `us`
- **limit** (optional): `5`

#### **Sample Response**
- **Success (200 OK)**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "TITLE": "More than 250 baby sea turtles released in Batangas and Quezon",
          "DESCRIPTION": "Some 250 baby sea turtles or hatchlings were released into the waters...",
          "CONTENT": "The baby sea turtles were released on January 9...",
          "URL": "https://www.gmanetwork.com/news/topstories/regions/932546/more-than-250-baby-sea-turtles-released...",
          "IMAGE": "https://images.gmanews.tv/webpics/2025/01/seaturtles_2025_01_11_09_13_40.jpg",
          "PUBLISHED AT": "2025-01-11T01:35:07Z"
        }
      ]
    }
    ```

- **Error (400 Bad Request)**:
    ```json
    {
      "status": "error",
      "message": "Failed to fetch data from GNews API"
    }
    ```
