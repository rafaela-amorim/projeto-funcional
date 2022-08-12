import { Component } from '@angular/core';
//import { distinct, group_By, orderBy } from '../utils/utils';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'Functional Programming';

	readonly apiURL: string;
	owner: string = 'rails';
	repository_name: string = 'rails';

	constructor(private http: HttpClient) {
	this.apiURL = 'https://api.github.com/repos';
	}

	listarForks(page = 1) {
	this.http
		.get(
		`${this.apiURL}/${this.owner}/${this.repository_name}/forks?page=${page}`
		).subscribe((resultado) => console.log(resultado));
	}

	forksPopulares() {
		// usar orderBy para ordenar por stargazers
	this.http
		.get(
		`${this.apiURL}/${this.owner}/${this.repository_name}/forks?sort=stargazers`
		).subscribe((resultado) => console.log(resultado));
	}
}