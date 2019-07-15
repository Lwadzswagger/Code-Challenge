import { ListingService } from './../../services/listing.service';
import { Component, OnInit } from '@angular/core';

import { UploadFiles } from 'src/app/models/uploadFiles.model';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.sass']
})
export class CreateListingComponent implements OnInit {

  today: number = Date.now();


  adDetails = {
    name: '',
    adPictureURL: '',
     _id: '',
    index: 2,
    Currency: 'Doller',
    slug: '',
    isActive: true,
    price: '',
    email: 'livingstonwynn@kraggle.com',
    phone: '+27 (71) 2265 436',
    address: '',
    // tslint:disable-next-line: max-line-length
    about: 'Officia incididunt minim ex elit magna commodo. Nulla minim laboris Lorem ut est laboris consectetur duis. Eiusmod aute esse aute tempor adipisicing magna nostrud eiusmod labore. Anim dolore excepteur sit labore duis ex nisi excepteur eiusmod proident.\r\n',
    // about: '',
    registered: this.today,
    category: ''
  };

  adPicture: any;





  constructor(
    public listingService: ListingService,
  ) { }

  ngOnInit() {
    this.adDetails._id = this.guid();
  }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }




  profileDetect(event: any) {
    const file = (event.target as HTMLInputElement).files;
    if (file && file.length === 1) {
      this.adPicture = new UploadFiles(file.item(0));
      this.filePreview(event, 'store-pics');
      // push profile
      // if (this.adDetails.name) {
        this.listingService.pushUpload(this.adPicture, 'Ad-Pictures', this.adDetails.name);
      // }

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
        case 'Ad-Pictures': this.adDetails.adPictureURL = event.target.result;
                            break;
        default:
          break;
      }

    };

    reader.readAsDataURL(event.target.files[0]);
  }

createAd() {
  console.log(this.adDetails);

  this.listingService.createAd( this.adDetails);
}


}
