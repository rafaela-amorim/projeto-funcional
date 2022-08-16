import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import { token } from './meutoken';

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
      this.apiURL + `/repos/${user}/${repo}/forks?page=${page}`,
      this.httpOptions
     ).pipe(retry(1), catchError(this.handleError));
  }

  async getAllForks(user:string, repo:string): Promise<Fork[]> {
    const tam = await this.qtdForks(user, repo);
    let result: Fork[] = [];

    for(let page = 1; page <= Math.ceil(tam / 30); page++) {
      let forks = await lastValueFrom(this.getForks(user, repo, page));
      forks.forEach((elem : Fork) => {
			// elem.date_string = elem.created_at.toDateString();
			result.push(elem)
		});
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
		// let tam = await this.qtdForks(user, repo);
		console.log("aguardando forks populares");

		let listaForks : Fork[] = await this.getAllForks(user, repo);

		let lista = orderByDesc(listaForks, "stargazers_count").slice(0,10);
		return lista;
	}

	async agrupaPorIssue(user: string, repo: string) : Promise<Fork[]> {
		// let tam = await this.qtdForks(user, repo);
		console.log("aguardando agrupa por issues");

		let listaForks: Fork[] = await this.getAllForks(user, repo);
		let grupo = group_By(listaForks, "has_issues");

		let values: Fork[] = Object.values(grupo);
		return values;		
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

}