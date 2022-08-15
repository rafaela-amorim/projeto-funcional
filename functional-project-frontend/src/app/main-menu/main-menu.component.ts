import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

interface SelectRepoData {
	repository: string
}

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent {
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

    selectRepo (data: SelectRepoData) {
        if(data.repository) {
            this.router.navigate([`/${data.repository}`])
        }
    }
}