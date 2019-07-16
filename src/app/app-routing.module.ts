import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { AuthGuard } from './services/auth.guard';
import { HomeListingComponent } from './components/home-listing/home-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch: 'full' },

  {
    path: 'listing',
    component: HomeListingComponent,
  },
  {
    path: 'details',
    component: ListingDetailsComponent,
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'createAd',
    component: CreateListingComponent,
    // canActivate: [AuthGuard]

  },
  {
    path: 'create-Profile',
    component: CreateProfileComponent,
    // canActivate: [AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
