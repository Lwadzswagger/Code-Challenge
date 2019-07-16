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
  filterByCategory; 
deals 
  keywords = '';
  cat = '';
 

  categories = ['Cars', 'Furniture', 'Property', 'Electronics'];


  constructor(
    public listingService: ListingService,
    public router: Router
  ) { }

  ngOnInit() {
    this.category = this.listingData.categories; 
    this.listingService.getDeals().subscribe((res) => {
        this.deals = res;
        
    }) ;
  }

  selectItem(item: any) {
    this.listingService.selectedItem = item;
    this.router.navigateByUrl('details');
  }
  createAd() {
    this.router.navigateByUrl('createAd');
  }

  // tslint:disable-next-line: no-shadowed-variable
  filterForeCategory(data: any) {
    this.filterByCategory = data;
  }
}
