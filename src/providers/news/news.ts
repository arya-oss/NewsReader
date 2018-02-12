import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsProvider {

  articles: Object[];
  API_KEY = '9d2333b3a8df420b989c14b57dc87781';
  BASE_URL = 'https://newsapi.org/v2/top-headlines'

  constructor(public http: Http) {

  }

  loadArticles(): any {
    return new Promise( (resolve, reject) => {
      this.http.get('assets/data/news.json')
        .toPromise()
        .then(res => {
          this.articles = res.json().articles;
          resolve();
        }, msg => {
          reject(msg);
        })
    });
  }

}
