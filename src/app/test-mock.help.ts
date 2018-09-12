import { Hero } from "./hero";
import { of } from "rxjs";

export const defaultHeroes = [
    { id: 1, name: 'Andres' },
    { id: 2, name: 'Harold' },
    { id: 3, name: 'Daniel 1' },
    { id: 4, name: 'Daniel 2' },
    { id: 5, name: 'Sebastian' }
];
export let onlyHero: Hero = { id: 1, name: 'Andres' };
export let responseHeroes = [];

export const MockHeroService = {
    getHeroes: () => {
        return of(responseHeroes);
    },
    setHeroes: (heroes) => { // it's doesn't a method of hero service, this is simply help for setting the variable heroes.
        responseHeroes = heroes;
    },
    getHero: (id: number) => {
        defaultHeroes.forEach(hero => {

        });
    }
};