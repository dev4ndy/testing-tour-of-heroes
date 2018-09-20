import { DebugElement } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, async, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockHeroService, defaultHeroes } from "./test-mock.help";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { throwError } from "rxjs";

fdescribe('HeroesComponent', ()=>{
    let heroesComponent: HeroesComponent;
    let debugElement: DebugElement;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroeService: HeroService;
    
    //Arrange
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, RouterTestingModule], 
            declarations: [HeroesComponent], 
            providers: [
                {provide: HeroService, useValue: MockHeroService}
            ]
        }).compileComponents()
    }));

    beforeEach(() => {
        MockHeroService.setHeroes(defaultHeroes);
        heroeService = TestBed.get(HeroService);
        fixture = TestBed.createComponent(HeroesComponent);
        debugElement = fixture.debugElement;
        heroesComponent = fixture.componentInstance;
    });

    afterEach(() => {
          MockHeroService.setHeroes(defaultHeroes); 
    });

    it('should created', ()=>{
        expect(heroesComponent).toBeTruthy();
    });

    describe('When the component starts', () => {
        it('should the heroes variable be undefined', () =>{
            expect(heroesComponent.heroes).toBeUndefined();
        });
        it('should the selectedHero variable be undefined', () => {
            expect(heroesComponent.selectedHero).toBeUndefined();
        });
        it('should the addingHero variable be defined and equal to false', ()=>{
            expect(heroesComponent.addingHero).toBeDefined();
            expect(heroesComponent.addingHero).toBeFalsy();
        });
        it('should the error variable be undefined', () => {
            expect(heroesComponent.error).toBeUndefined();
        });
        it('should the showNgFor variable be defined and equal to false', () =>{
            expect(heroesComponent.showNgFor).toBeDefined();
            expect(heroesComponent.showNgFor).toBeFalsy();
        });
    });    

    describe('When the ngOnInit methods starts', ()=>{
        it('should call at function getHeroes()', () => {
            spyOn(heroesComponent, 'getHeroes');
            fixture.detectChanges();
            expect(heroesComponent.getHeroes).toHaveBeenCalled();
        });
    });
    
    describe('When the getHeroes function is run without errors', () =>{

        it('should call at function getHeroes of the service', () => {
            spyOn(heroeService, 'getHeroes').and.callThrough();
            heroesComponent.getHeroes();
            expect(heroeService.getHeroes).toHaveBeenCalled();
            expect(heroeService.getHeroes).toHaveBeenCalledTimes(1);
        });

        it('should the heroes variable be defined', () => {
            heroesComponent.getHeroes();
            expect(heroesComponent.heroes).toBeDefined();
        });

        it('should render all heroes in the page', () => {
            MockHeroService.setHeroes(defaultHeroes);
            spyOn(heroeService, 'getHeroes').and.callThrough();
            heroesComponent.getHeroes();
            let lsLi = debugElement.queryAll(By.css('li'));
            expect(lsLi.length).toEqual(defaultHeroes.length);
        });
    }); 

    describe('When the getHeroes function is run with error in service', () => {

        it('should call at function getHeroes of the service', () => {
            spyOn(heroeService, 'getHeroes').and.returnValue(throwError('Error'));
            heroesComponent.getHeroes();
            expect(heroeService.getHeroes).toHaveBeenCalled();
            expect(heroeService.getHeroes).toHaveBeenCalledTimes(1);
        });

        it('should the heroes variable be undefined', () => {
            spyOn(heroeService, 'getHeroes').and.returnValue(throwError('Error'));
            heroesComponent.getHeroes();
            expect(heroesComponent.heroes).toBeUndefined();
        });

        it('should the error variable to be defined', () => {
            spyOn(heroeService, 'getHeroes').and.returnValue(throwError('Error'));
            heroesComponent.getHeroes();
            expect(heroesComponent.error).toBeDefined();
        });

        it('should render nothing heroes in the page', ()=>{
            spyOn(heroeService, 'getHeroes').and.returnValue(throwError('Error'));
            heroesComponent.getHeroes();
            fixture.detectChanges();
            let ul = debugElement.query(By.css('ul'));
            expect(ul.children.length).toBe(0);
        });
    });
});