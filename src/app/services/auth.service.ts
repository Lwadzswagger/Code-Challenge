import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth ,    } from '@angular/fire/auth';
import { ListingService } from './listing.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

class User {
  name;
  address;
  phone;
  userPictureURL;
  uid;
  email;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public listingService: ListingService,
    private firestore: AngularFirestore,


  ) {
    this.user$ = this.afAuth.authState;
  //  this.authState = this.afAuth.authState;
  }


  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }
 

  doRegister(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {

          resolve(res);
          this.router.navigate(['/profile']);
        }, err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(res => this.router.navigate(['/']));
  }


  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {

        resolve(res);
        console.log('logged in successfully');

        this.router.navigate(['/listing']);
      }, err => reject(err));
    });

  }
  createProfile(data: User) {
    data.userPictureURL = this.listingService.userDisplayPhoto;
    data.uid = this.afAuth.auth.currentUser.uid;
    data.email = this.afAuth.auth.currentUser.email;
    console.log('before send', data);



    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Users')
        // .doc('' + data._id)
        .add(data)
        .then(res => {
          console.log('User created Successfully!!!');
          this.router.navigateByUrl('/listing');
        }, err => reject(err));
    });
  }


  // get authenticated(): boolean {
  //   return this.authState !== null;
  // }

  get currentUserObservable(): any {
    return this.afAuth.auth;
  }


}
