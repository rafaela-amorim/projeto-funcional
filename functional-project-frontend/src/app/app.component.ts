import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { orderByDesc } from './utils/utils';
import { lastValueFrom } from 'rxjs';

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

  qtdForks(url : string) {
	this.http
	.get(url)
	.subscribe((resultado : any) => console.log(resultado.forks));
  }

  async forksPopulares() {
	let listaForks : object[] = [];
	this.qtdForks(`${this.apiURL}/${this.owner}/${this.repository_name}`)
	let tam = 406; // modificar isso

	for (let p = 0; p < Math.ceil(tam / 30); p++) {
		let response = this.http.get(`${this.apiURL}/${this.owner}/${this.repository_name}/forks?page=${p}`);
		let json : any = await lastValueFrom(response);
		
		for (let i = 0; i < json.length; i++) {
			listaForks.push(json[i]);	
		}
	}

	console.log(orderByDesc<any, string>(listaForks, "stargazers_count").slice(0,10));

  }
}
