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

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private githubApi: GithubApiService) {
        this.forks = []
        this.filteredForks = []
        this.user = route.snapshot.params['user'];
        this.repo = route.snapshot.params['repository'];
        this.users = {};
    }

    ngOnInit () {
        this.githubApi.getForks(this.user, this.repo).subscribe((data: Fork[]) => {
            this.forks = data
            this.filteredForks = data
            // this.users = group_By(data, (fork: Fork) => fork.user.login);
        })
    }
}