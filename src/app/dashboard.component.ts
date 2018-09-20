import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(
        heroes => {
          if (heroes.length != 0) {
            this.heroes = heroes
          }else{
            this.heroes = [];
          }
        }
      );
  }

  /*gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', hero.id]);
  }*/
}
