import { ListingService } from './../../services/listing.service';
import { Component, OnInit } from '@angular/core';
import data from './../../../assets/mockdata/listingData.json'

@Component({
  selector: 'app-home-listing',
  templateUrl: './home-listing.component.html',
  styleUrls: ['./home-listing.component.sass']
})
export class HomeListingComponent implements OnInit {
  title = 'Code-Challenge';
  searchText;
  listingData = data;
  constructor(
    public listingService: ListingService
  ) { }

  ngOnInit() {
    // this.listingService.getData()      .subscribe(res => console.log('home page', this.listingData = res));
  }

}
