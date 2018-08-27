import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular/umd';
import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';

import { UserService } from '../../services/user-services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  isValidFormSubmitted = false;
  unauthorized = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  user = new User();
  tab3Root = ContactPage;

  constructor( public navCtrl: NavController, public userService: UserService ) {

  }

  get username(){
    return this.loginForm.get( 'username' );
  }
  
  get password(){
    return this.loginForm.get( 'password' );
  }

  onFormSubmit(){
    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.user = this.loginForm.value;
    this.userService.loginUser( this.user )
    .then( (data) => {
      this.loginForm.reset();
      this.unauthorized = false;
      this.navCtrl.push( AboutPage, data );
    }, () => {
      this.unauthorized = true;
    });
    this.loginForm.reset();


  }

  logEvent(event){
    console.log(event)
    this.navCtrl.push(ContactPage);
  }
  
}
