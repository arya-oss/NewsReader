import { Component } from '@angular/core';
import { NavController, NavParams, Refresher, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import {NewsProvider} from '../../providers/news/news';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsProvider: NewsProvider,
              public toastCtrl: ToastController,
              private tts: TextToSpeech,
              private iab: InAppBrowser) {

  }

  ionViewDidLoad() {
    this.newsProvider.loadArticles();
  }

  doRefresh(refresher: Refresher) {
    this.newsProvider.loadArticles().then( _ => {
      setTimeout(() => {
        refresher.complete();
        const toast = this.toastCtrl.create({
          message: 'News have been updated',
          duration: 2000
        });
        toast.present();
      }, 1000);
    });
  }

  speakNews(event, item) {
    console.log('speak news ' + item.title);
    this.tts.speak(item.title + ' ' + item.description)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  openInBrowser(event, url) {
    console.log('opening link in browser '+ url);
    const browser = this.iab.create(url);
    browser.show();
  }
}
