
import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserService{

    constructor(private http: Http){

    }

    loginUser( user: User ){
      return new Promise( ( resolve, reject ) => {
        var header = new Headers();
        header.append('Content-type', 'application/json');
        this.http.post('http://127.0.0.1:8000/user/login', user, {headers: header} )
        .subscribe( (result: any ) => {
          resolve( result.json() );
        },
        (error) => {
          console.log(error);
          reject( error.statusText )
        }
      );
      });
    }

    createUser( user: User ){
        return new Promise( ( resolve, reject ) => {
            var header = new Headers();
            header.append('Content-type', 'application/json');
            this.http.post('http://127.0.0.1:8000/user', user, {headers: header} )
            .subscribe( (result: any ) => {
              resolve( result.json() );
            },
            (error) => {
              console.log(error);
              reject( error.json() );
            });
          });
     }
}