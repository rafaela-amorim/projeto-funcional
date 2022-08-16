import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { orderByDesc } from './utils/utils';
import { lastValueFrom,throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Functional Programming';
}
