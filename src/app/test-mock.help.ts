import { Hero } from "./hero";
import { of, observable } from "rxjs";

export let defaultHeroes = [
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
        for (let i = 0; i <= defaultHeroes.length; i++) {
            let hero = defaultHeroes[i];
            if (hero.id == id) {
                return of(hero);
            }
        };
    }, 
    updateHero: (hero: Hero) => {
        defaultHeroes = defaultHeroes.map(_hero => {
            if(_hero.id = hero.id){
                return hero;
            }
        });
        return of(null);    
    }
};