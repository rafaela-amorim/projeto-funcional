import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { GithubApiService } from '../utils/github-api.service';
import { orderBy, group_By, distinct, fold, compose } from '../utils/utils';

interface SelectRepoData {
    repoitory: string
}

@Component({
    selector: 'app-forks',
    templateUrl: './forks.component.html',
    styleUrls: ['./forks.component.css']
})

export class ForksComponent implements OnInit{
    forks: Fork[];
    filteredForks: Fork[];
    users: Record<string, Fork[]>;
    user: string
    repo: string
	// forks_count: number;
    forks_populares: Fork[];

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private githubApi: GithubApiService) {
        this.forks = []
        this.filteredForks = []
		// this.forks_count= -1;
        this.user = route.snapshot.params['user'];
        this.repo = route.snapshot.params['repository'];
        this.users = {};
        this.forks_populares = [];
        
    }

    ngOnInit () {
        // this.githubApi.getAllForks(this.user, this.repo).then((data: Fork[]) => {
        //     this.forks = data
        //     this.filteredForks = data
        //     // this.users = group_By(data, (fork: Fork) => fork.user.login);
        // })

		this.githubApi.getForks(this.user, this.repo, 3).subscribe((data: Fork[]) => {
            this.forks = data
            this.filteredForks = data
            // this.users = group_By(data, (fork: Fork) => fork.user.login);
        })
    }

	forksPopulares() {
		this.githubApi.forksPopulares(this.user, this.repo).then((response : Fork[]) => {
			this.filteredForks = response;
			// console.log("response: " + response)
		});
	}
}