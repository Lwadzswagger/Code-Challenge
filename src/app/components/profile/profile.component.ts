import { Component, OnInit } from '@angular/core';
import { ListingDetailsComponent } from '../listing-details/listing-details.component';
import { ListingService } from 'src/app/services/listing.service';
import { UploadFiles } from 'src/app/models/uploadFiles.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user = {
    name: '',
    address: '',
    phone: '',
    userPictureURL: '',
    uid: '',
    email: ''
  }
    ;
  uploading = true;

  UserPicture: any;





  constructor(
    public listingService: ListingService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  profileDetect(event: any) {
    const file = (event.target as HTMLInputElement).files;
    if (file && file.length === 1) {
      this.UserPicture = new UploadFiles(file.item(0));
      this.filePreview(event, 'store-pics');

      this.listingService.pushUpload(this.UserPicture, 'user-Pictures', this.user.name);


    } else {
      console.error('No Ad photo found!');
    }

  }



  filePreview(event: any, fileType: string) {
    const reader = new FileReader();
    console.log('filetype', fileType);

    // tslint:disable-next-line: no-shadowed-variable
    reader.onload = (event: any) => {
      switch (fileType) {
        case 'Ad-Pictures': this.user.userPictureURL = event.target.result;
          // tslint:disable-next-line: align
          break;
        default:
          break;
      }

    };

    reader.readAsDataURL(event.target.files[0]);
  }


  addProfile() {
    this.authService.createProfile(this.user);

  }

}
