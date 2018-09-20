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
        responseHeroes = [... heroes]; //copy only value, if you equal usally for example (responseHeroes = heores) this is a reference in memory. 
    },
    getHero: (id: number) => {
        for (let i = 0; i < responseHeroes.length; i++) {
            let hero = responseHeroes[i];
            if (hero.id == id) {
                let _hero = new Hero();
                _hero.id = hero.id;
                _hero.name = hero.name;
                return of(_hero);
            }
        };
    }, 
    updateHero: (hero: Hero) => {
        for(let i = 0; i < responseHeroes.length; i++){
            let _hero = responseHeroes[i];            
            if(_hero.id == hero.id){
                responseHeroes[i] = hero;
            }
        }
        return of(null);    
    }
};