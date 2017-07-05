import {Http} from '@angular/http';
import {Component} from '@angular/core';

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinct';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'GitHub Instant Search';
    searchTerm: string;
    results;
    latestSearch = new Subject<string>();

    constructor(public http: Http) {
        this.results = this.latestSearch
            .debounceTime(500)
            .distinct()
            .filter(term => !!term)
            .switchMap(term =>
                 this.http.get(`https://api.github.com/search/repositories?q=${term}&sort=stars&order=desc`)
                    .map(res => res.json()
                        .items.map(item => item)));
    }

    newSearch(term) {
        this.latestSearch.next(term);
    }
}
