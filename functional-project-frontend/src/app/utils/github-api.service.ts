import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import { token } from './token';

// funções utils
import {orderByDesc, group_By, distinct, fold} from './utils';

@Injectable({
  providedIn: 'root'
})

export class GithubApiService {
	apiURL = 'https://api.github.com'
	token = token;

	httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		authorization: `token ${this.token}`
	}),
	};

	constructor(private http: HttpClient) {}

	getForks(user: string, repo: string, page: number): Observable<Fork[]> {
		return this.http.get<Fork[]>(
			this.apiURL + `/repos/${user}/${repo}/forks?page=${page}&per_page=100`,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	async getAllForks(user:string, repo:string): Promise<Fork[]> {
		let result: Fork[] = [];

		let stopLoop = true;
		let page = 1;
		while (stopLoop) {
			let forks = await lastValueFrom(this.getForks(user, repo, page));

			if (forks.length === 0) stopLoop = false;

			forks.forEach((elem : Fork) => {
				result.push(elem)
			});

			page++;
		}

		return result;
	}

	handleError(error: any) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.message;
		} else if (error.error.message === 'Bad credentials') {
			errorMessage = `Token inválido`;
		} else {
			errorMessage = `Usuário ou repositório não existe`;
		}
		window.alert(errorMessage);
		return throwError(() => {
			return errorMessage;
		});
	}

	/*
	*/
	async qtdForks(user: string, repo: string): Promise<number> {
		let forks_count : any = -1;

		let json = await lastValueFrom(this.http.get<IRepository> (
			this.apiURL + `/repos/${user}/${repo}`,
			this.httpOptions
		))
		forks_count = json.forks_count;

		return forks_count;
	}

	async forksPopulares(user: string, repo: string) : Promise<Fork[]> {
		let tam = await this.qtdForks(user, repo);
		console.log("tamanho " + tam);

		let listaForks : Fork[] = await this.getAllForks(user, repo);

		let lista = orderByDesc(listaForks, "stargazers_count").slice(0,10);
		return lista;
	}

  	async agruparPorIssue(user: string, repo: string) : Promise<Fork[]> {
		console.log("aguardando agrupa por issues");

		let listaForks: Fork[] = await this.getAllForks(user, repo);
		let grupo = group_By(listaForks, "has_issues");

		
		return grupo;
		// let values: Fork[] = Object.values(grupo);	
		// return values;
	}

	async distinctLanguage(user: string, repo: string) : Promise<Fork[]> {
		console.log("aguardando distinct languages");
		let listaForks : Fork[] = await this.getAllForks(user, repo);
		return distinct(listaForks, "language");
	}

	async qtdForksdeForks(user: string, repo: string) : Promise<number> {
		console.log("aguardando forks de forks");
		let listaForks : Fork[] = await this.getAllForks(user, repo);
		return fold(
			(acc, curr) => acc + curr.forks,
			0, listaForks);
	}

	async agrupaPorData(user: string, repo: string) : Promise<any> {
		let listaForks : any[] = await this.getAllForks(user, repo);

		const result = listaForks.reduce((r, a) => {
		const year  = new Date(a.created_at).getFullYear()
		r[year] = r[year] || []
		r[year].push(a)
		return r;
		}, Object.create(null));

		return result;
	}
}