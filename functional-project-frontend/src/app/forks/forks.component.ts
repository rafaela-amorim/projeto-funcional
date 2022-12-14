import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { GithubApiService } from '../utils/github-api.service';

interface SelectRepoData {
    repoitory: string
}

@Component({
    selector: 'app-forks',
    templateUrl: 'forks.component.html',
    styleUrls: ['./forks.component.css']
})

export class ForksComponent implements OnInit {
    readonly default_hd : string[];
	
	forks: Fork[];
    filteredForks: Fork[];
    users: Record<string, Fork[]>;
    user: string
    repo: string
    forks_populares: Fork[];
    groupForksAsGroup: any = {};
    loading: boolean = true;
	cabecalho: string[];
	issuesForks: Fork[];

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private githubApi: GithubApiService) {
		this.default_hd = ['#',"Repositório","Estrelas","Assistindo","Forks","Issues","Criação","Atualização","Downloads","Linguagem"];
		
		this.forks = []
        this.filteredForks = []
        this.user = route.snapshot.params['user'];
        this.repo = route.snapshot.params['repository'];
        this.users = {};
        this.forks_populares = [];
		this.issuesForks = [];

		this.cabecalho = this.default_hd;

    }

    ngOnInit() {
		this.cabecalho = this.default_hd;
		this.issuesForks = [];
		this.groupForksAsGroup = [];

        this.githubApi.getAllForks(this.user, this.repo).then((data: Fork[]) => {
            this.forks = data
            this.filteredForks = data
            this.loading = false;
        })
    }

    forksPopulares() {
		this.cabecalho = this.default_hd;
		this.issuesForks = [];
		this.groupForksAsGroup = [];

        this.githubApi.forksPopulares(this.user, this.repo).then((response: Fork[]) => {
            this.filteredForks = response;
        });
    }

    agruparPorIssue() {
		this.cabecalho = ['#',"Tem issues", "Repositório", "Criação","Downloads","Linguagem"];
		this.groupForksAsGroup = [];
		this.filteredForks = [];

		this.githubApi.agruparPorIssue(this.user, this.repo).then((response: any[]) => {
			if (response[1])
				this.issuesForks = response[1]['true'];
			(response[0]['false'].forEach((e : Fork) => {
				this.issuesForks.push(e)
			}))
		})
    }

    distinctLanguage() {
		this.cabecalho = this.default_hd;
		this.issuesForks = [];
		this.groupForksAsGroup = [];

        this.githubApi.distinctLanguage(this.user, this.repo).then((response: any[]) => {
            this.filteredForks = response;
            console.log("response: " + response)
        });
    }

    forksdeForks() {
		this.cabecalho = this.default_hd;
		this.issuesForks = [];
		this.groupForksAsGroup = [];

        this.githubApi.qtdForksdeForks(this.user, this.repo).then((response: number) => {
            alert(`Quantidade de forks secundários do repositório ${this.user}/${this.repo}: ${response}`);
        })
    }

    agrupaPorData() {
		this.cabecalho = ['#',"Ano de Criação", "Repositório", "Criação"]
		this.filteredForks = [];
		this.issuesForks = [];

        this.githubApi.agrupaPorData(this.user, this.repo).then((response: any[]) => {
			Object.keys(response).forEach((k : string) => {
				(response[parseInt(k)].forEach((e : Fork) => {
					this.groupForksAsGroup.push(e)
				}))
			})
        });
    }
}