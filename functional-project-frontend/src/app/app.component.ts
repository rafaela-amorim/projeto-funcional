import { group } from '@angular/animations';
import { Component } from '@angular/core';
import {distinct, group_By} from '../utils/utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Functional Programming';
}


const peopleDefault = [

  { id: 1, name: 'John', age: 20 },
  { id: 9, name: 'Luke', age: 21 },
  { id: 4, name: 'John', age: 23 },
  { id: 5, name: 'Luke', age: 25 },
  { id: 8, name: 'Bea', age: 27 },
  { id: 6, name: 'James', age: 25 },
  { id: 3, name: 'mary', age: 20 },
  { id: 7, name: 'Luci', age: 26 },
  { id: 2, name: 'Jane', age: 21 },
  { id: 10, name: 'Bryan', age: 29 },

];

console.log(distinct(peopleDefault, "name"));
console.log(group_By(peopleDefault, "age"));