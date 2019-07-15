import { AngularFireModule } from '@angular/fire';
import { Injectable } from '@angular/core';
import { Observable, of, asapScheduler } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import 'firebase/storage';
import { UploadFiles } from 'src/app/models/uploadFiles.model';

// import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

class Ad {
  name: any;
  adPictureURL: any;
  // tslint:disable-next-line: variable-name
  _id: string;
  index: any;
  Currency: any;
  slug: any;
  isActive: any;
  price: any;
  email: any;
  phone: any;
  address: any;
  about: any;
  registered: any;
  category: any;

}
@Injectable({
  providedIn: 'root'
})
export class ListingService {
  selectedItem: any;
  ad = {
    name: '',
    adPhotoUrl: '',

  }
  baseUrl = '../../mockdata/listingData.json';

  private uploads: Observable<UploadFiles[]>;
  private uploadTask: firebase.storage.UploadTask;

  constructor(
    private af: AngularFireModule,
    public http: HttpClient,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private router: Router
  ) { }




  createAd(data: Ad) {


    const createUserObj = {

    };

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('ads')
        .doc(data._id)
        .set(createUserObj)
        .then(res => {
          console.log('User created Successfully!!!');
          this.router.navigateByUrl('/menu/first/home');
        }, err => reject(err));
    });
  }





  public getData() {
    return this.http.get<any[]>(`${this.baseUrl}`)
      .pipe(
        tap(_ => this.log('Fetched listing Data')),
        catchError(this.handleError('GET listing data', []))
      );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }





  pushUpload(upload: UploadFiles, basepath: string, adName: string) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${basepath}/${adName}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.error('upload just failed', error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.ref.getDownloadURL()) {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            this.ad.adPhotoUrl = url;
          });
          upload.name = upload.file.name;

          // this.saveFileData(upload, `${basepath}/${storeName}`);
          // console.log('download url for pic ',upload.url);
          // console.log('file name',upload.name);

          console.log('File uploaded');
          return;
        } else {
          console.error('No download URL!');
        }
      });
  }






}
