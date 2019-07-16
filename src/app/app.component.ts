import { Component } from '@angular/core';
import { FilterPipe } from './pipes/filter.pipe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  public location = '' ;
  constructor(
    private  router : Router
  ) {
    this.location = router.url;
  }




}
