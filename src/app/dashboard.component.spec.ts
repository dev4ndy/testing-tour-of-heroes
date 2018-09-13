import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from './hero.service';
import { defaultHeroes, MockHeroService, responseHeroes } from './test-mock.help';

describe('Test for DashBoardComponent', () => {
    // let's instanciate the component
    let dashBoardComponent: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;
    let location: Location;
    let debugElement: DebugElement;

    const routes: Routes = [
        { path: 'detail/:id', component: HeroDetailComponent }
    ];

    //Arrange
    beforeEach(async(() => {        
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes), FormsModule], //If our component uses routing, httpclient
            declarations: [DashboardComponent, HeroDetailComponent, HeroSearchComponent], //Here we put all the components that use our component. 
            providers: [
                //Here we can inject the dependencies that our component needs.
                //If our dependecies are services, we can create a simulated service.
                { provide: HeroService, useValue: MockHeroService },
            ]
        }).compileComponents();
    }));

    //Arrange
    beforeEach(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(DashboardComponent);
        debugElement = fixture.debugElement;
        dashBoardComponent = fixture.componentInstance;
        //fixture.detectChanges();// Comments, so that it does run the of method ngOnInit();
    });

    it('should create', () => {
        expect(dashBoardComponent).toBeTruthy();
    });

    describe('When the component starts', () => {
        it('should the hero variable be undefined', () => {
            expect(dashBoardComponent.heroes).toBeUndefined();
        });
    });

    describe('When the ngOnInit method starts', () => {
        it('should the heroes variable be defined', () => {
            fixture.detectChanges();
            expect(dashBoardComponent.heroes).toBeDefined();
        });

        it('should the heroes variable be great than or equal zero', () => {
            MockHeroService.setHeroes(defaultHeroes);
            //responseHeroes = defaultHeroes; //Simulated with some heroe
            fixture.detectChanges();
            expect(dashBoardComponent.heroes.length).toEqual(responseHeroes.length);
            MockHeroService.setHeroes([]);
            //responseHeroes = []; //Simulate empty
            fixture.detectChanges();
            expect(dashBoardComponent.heroes.length).toBeGreaterThanOrEqual(0);
        });

        it('should to render all heroes in page', () => {
            MockHeroService.setHeroes(defaultHeroes);
            fixture.detectChanges();
            const heroesBoxDivs = debugElement.queryAll(By.css('.test-go-to-detail'));
            expect(heroesBoxDivs.length).toEqual(responseHeroes.length);
        });
    });

    describe('When the user does click in a hero', () => {
        /**
         * This case of test works when the element don't have routerLink Directive. 
         */
        /* it('should call gotoDetail', () => {
              responseHeroes = defaultHeroes;
              fixture.detectChanges();
              spyOn(dashBoardComponent, 'gotoDetail');
              let buttons = fixture.debugElement.queryAll(By.css('.test-go-to-detail'));
              buttons[0].triggerEventHandler('click', null);
              expect(dashBoardComponent.gotoDetail).toHaveBeenCalled();
          });*/

        it('should takes you to detail/:id', fakeAsync(() => {
            MockHeroService.setHeroes(defaultHeroes);
            fixture.detectChanges();
            // Find all generated div's, where is located the routerLink. 
            let button = debugElement.queryAll(By.css('.test-go-to-detail'));
            button[0].triggerEventHandler('click', null); //simulate click in the DOM
            //We wait for all pending promises to be resolved.
            tick();
            expect(location.path()).toBe(`/detail/${defaultHeroes[0].id}`);
        }));
    });
});