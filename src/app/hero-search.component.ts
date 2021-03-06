import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
  selector: 'my-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService
  ) {}

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {    
    this.heroes = this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(term => term ? this.heroSearchService.search(term) : of<Hero[]>([])),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<Hero[]>([]);
      })
    );    
  }
}