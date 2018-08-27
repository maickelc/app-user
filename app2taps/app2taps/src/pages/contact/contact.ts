import { Component, Injectable, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular/umd';
// import { Http, Headers } from '@angular/http';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/umd';
import { UserService } from '../../services/user-services';
import { User } from '../../model/user';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
@Injectable()
export class ContactPage implements OnInit {
  isValidFormSubmitted = false;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [ Validators.required, Validators.minLength(5) ])
  });
  user = new User();
  
  constructor(public navCtrl: NavController, public userService: UserService, public alertCtrl: AlertController) {
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Seja bem vindo '+ this.user.name,
      subTitle: 'Usuario registrado com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }
  ngOnInit(){

  }
  get name() {
    return this.userForm.get('name');
  }
  get username() {
    return this.userForm.get('username');
  }
  get password(){
    return this.userForm.get('password');
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.userForm.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.user = this.userForm.value;
    this.userService.createUser( this.user )
    .then( () => {
      this.showAlert();
    })
    this.userForm.reset();

    this.navCtrl.push(HomePage);
 }

  onSubmit( formData ){
    var data = formData.form.value;
  }

}
