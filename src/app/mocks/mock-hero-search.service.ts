import { Observable, of } from "rxjs";
import { Hero } from "../hero";

export const defaultHeroes = [
    { id: 1, name: 'Andres' },
    { id: 2, name: 'Harold' },
    { id: 3, name: 'Daniel 1' },
    { id: 4, name: 'Daniel 2' },
    { id: 5, name: 'Sebastian' }
];
export let onlyHero: Hero = { id: 1, name: 'Andres' };
export let responseHeroes = [];

export const MockHeroSearchService = {
    search: (term: string): Observable<Array<Hero>> => {
        let heroes = defaultHeroes.filter(hero => hero.name.includes(term)) as Array<Hero>;
        return of(heroes);
    }
}