import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsProvider {

  articles: Object[];
  API_KEY = '9d2333b3a8df420b989c14b57dc87781';
  BASE_URL = 'https://newsapi.org/v2/top-headlines'

  constructor(public http: HttpClient) {

  }

  loadArticles(): any {
    const options =  {params: new HttpParams().set('country', 'in').set('apiKey', this.API_KEY)};
    this.http.get(this.BASE_URL, options)
      .subscribe(data => this.articles = data['articles']);
  }

}
