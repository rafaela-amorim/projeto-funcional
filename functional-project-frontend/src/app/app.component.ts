import { Component } from '@angular/core';
import { distinct, group_By, orderBy } from '../utils/utils';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { IRepository } from '../utils/repository';
import { observable, Observable } from 'rxjs';

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

  forksPopulares() {
	let listaForks : object[] = [];
    
	
	//`${this.apiURL}/${this.owner}/${this.repository_name}/forks?page=${i}`

	let qtdForks = 406; // modificar isso

	for (let p = 0; p < Math.ceil(qtdForks / 30); p++) {
		let response = this.http.get(`${this.apiURL}/${this.owner}/${this.repository_name}/forks?page=${p}`);
		
		for (let i = 0; i < 30; i++) {
			response.subscribe((res : any) => listaForks.push(res));
		}
	}

	// nao ta funcionando
	console.log(listaForks.length);
	
  }
}
