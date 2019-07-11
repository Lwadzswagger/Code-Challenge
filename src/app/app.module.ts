import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilterPipe} from './pipes/filter.pipe';

import { FormsModule } from '@angular/forms';
import { HomeListingComponent } from './components/home-listing/home-listing.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';

@NgModule({
  declarations: [
    AppComponent, FilterPipe, HomeListingComponent, ListingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
