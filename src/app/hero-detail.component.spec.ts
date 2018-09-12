import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { responseHeroes, defaultHeroes, MockHeroService } from './test-mock.help';

describe('Test for HeroDetailComponet', () => {
    let heroDetailComponent: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;

    //Arrange
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, FormsModule], //If our component uses routing, httpclient
            declarations: [HeroDetailComponent], //Here we put all the components that use our component. 
            providers: [
                //Here we can inject the dependencies that our component needs.
                //If our dependecies are services, we can create a simulated service.
                { provide: HeroService, useValue: MockHeroService },
            ]
        }).compileComponents();
    }));

    //Arrange
    beforeEach(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        heroDetailComponent = fixture.componentInstance;

        //fixture.detectChanges();// Comments, so that it does run the of method ngOnInit();
    });

    it('should create', () => {
        expect(heroDetailComponent).toBeTruthy();
    });

    describe('When the component starts', () => {
        it('should the hero variable be undefined', () => {
            expect(heroDetailComponent.hero).toBeUndefined();
        });
    });

    describe('When the ngOnInit method starts', () => {
        it('should call function getHero', () => {
            fixture.detectChanges();
            spyOn(heroDetailComponent, 'getHero');
            expect(heroDetailComponent.getHero).toHaveBeenCalled();
        });

        // it('should the heroes variable be great than or equal zero', () => {
        //     MockHeroService.setHeroes(defaultHeroes);
        //     //responseHeroes = defaultHeroes; //Simulated with some heroe
        //     fixture.detectChanges();
        //     expect(dashBoardComponent.heroes.length).toEqual(responseHeroes.length);
        //     MockHeroService.setHeroes([]);
        //     //responseHeroes = []; //Simulate empty
        //     fixture.detectChanges();
        //     expect(dashBoardComponent.heroes.length).toBeGreaterThanOrEqual(0);
        // });

        // it('should to render all heroes in page', () => {
        //     MockHeroService.setHeroes(defaultHeroes);
        //     fixture.detectChanges();
        //     const heroesBoxDivs = debugElement.queryAll(By.css('.test-go-to-detail'));
        //     expect(heroesBoxDivs.length).toEqual(responseHeroes.length);
        // });
    });
});
