import { Component } from '@angular/core';
import { FilterPipe } from './pipes/filter.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Code-Challenge';
  searchText;

  constructor( 
  ){

  }


  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2',
    'Jake the dog',
    'Princess the bubblegum',
    'Lumpy Space Princess',
    'Beemo1 lumpy',
    'Bees'
  ]


}
