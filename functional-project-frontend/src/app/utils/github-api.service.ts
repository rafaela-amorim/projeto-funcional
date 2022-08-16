import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

// funções utils
import {orderByDesc} from './utils';

@Injectable({
  providedIn: 'root'
})

export class GithubApiService {

  apiURL = 'https://api.github.com'
  token = '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'

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
    let result: Fork[] = [];
	let tam = await this.qtdForks(user, repo);

    for(let page = 1; page <= Math.ceil(tam / 30); page++) {
      let forks = await lastValueFrom(this.getForks(user, repo, page));
      forks.forEach((elem : Fork) => {result.push(elem)});
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

}