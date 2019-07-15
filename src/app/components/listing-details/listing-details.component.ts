import { ListingService } from './../../services/listing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.sass']
})
export class ListingDetailsComponent implements OnInit {
  item;
  constructor(
    public listingServices: ListingService,
  ) { }

  ngOnInit() {
    this.item = this.listingServices.selectedItem;
  }


  ontactSeller() {
    window.alert('Thank you on your interest on this offer, The seller will get back to you ASAP')
  }
}
