import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { AuthGuard } from './services/auth.guard';
import { HomeListingComponent } from './components/home-listing/home-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch: 'full' },

  {
    path: 'listing',
    component: HomeListingComponent,
  },
  {
    path: 'details',
    component: ListingDetailsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: LoginComponent
  },{
    path: 'createAd',
    component: CreateListingComponent
  },{
    path: 'create-Profile',
    component: CreateProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
