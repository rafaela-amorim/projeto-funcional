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

  readonly apiURL: string;
  owner: string = 'globocom';
  repository_name: string = 'm3u8';

  constructor(private http: HttpClient) {
    this.apiURL = 'https://api.github.com/repos';
  }

  listarForks(page = 1) {
    this.http
      .get(
        `${this.apiURL}/${this.owner}/${this.repository_name}/forks?page=${page}`
      )
      .subscribe((resultado) => console.log(resultado));
  }

}
