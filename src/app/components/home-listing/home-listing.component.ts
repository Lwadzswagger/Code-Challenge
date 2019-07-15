import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListingService } from './../../services/listing.service';
import data from './../../../assets/mockdata/listingData.json';

@Component({
  selector: 'app-home-listing',
  templateUrl: './home-listing.component.html',
  styleUrls: ['./home-listing.component.sass']
})
export class HomeListingComponent implements OnInit {
  title = 'Code-Challenge';
  searchText;
  listingData = data;
  category: any = [];

  constructor(
    public listingService: ListingService,
    public router: Router
  ) { }

  ngOnInit() {
    this.category = this.listingData.categories;
    // console.log(this.listingData.categories);

    // this.listingService.getData()      .subscribe(res => console.log('home page', this.listingData = res));
  }

  selectItem(item: any) {
    this.listingService.selectedItem = item;
    console.log(item);
    this.router.navigateByUrl('details');

  }
  createAd(){
    this.router.navigateByUrl('createAd')
  }

}
