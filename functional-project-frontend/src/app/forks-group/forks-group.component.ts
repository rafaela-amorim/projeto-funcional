import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-forks-group',
    templateUrl: 'forks-group.component.html',
    styleUrls: ['./forks-group.component.css']
})

export class ForksGroupComponent {
	@Input() groupedForks: any[] = [];
}