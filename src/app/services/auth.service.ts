import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.user$ = afAuth.authState;
   }



  doRegister(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword( email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(res => this.router.navigate(['/']));
  }

}
