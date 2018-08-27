import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/umd';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  name: string = '';

  constructor(public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.name = this.navParams.get('name');
  }

}
