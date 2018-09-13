import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { MockActivatedRoute } from './mocks/activate-route.mock';
import { MockHeroService, defaultHeroes } from './test-mock.help';
import { Subject, of } from 'rxjs';

describe('Test for HeroDetailComponet', () => {
    let heroDetailComponent: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let location: Location;
    let activeRoute: MockActivatedRoute;
    let params: Params;
    let heroService: HeroService;
    //Arrange
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, FormsModule], //If our component uses routing, httpclient
            declarations: [HeroDetailComponent], //Here we put all the components that use our component. 
            providers: [
                //Here we can inject the dependencies that our component needs.
                //If our dependecies are services, we can create a simulated service.
                //{ provide: ActivatedRoute, useValue: activeRoute },
                // { provide: ActivatedRoute, useValue: { params: params } },
                {
                    provide: ActivatedRoute, useValue: {
                        params: of({ id: 1 })
                    }
                },
                { provide: HeroService, useValue: MockHeroService },
            ]
        }).compileComponents();
    }));

    //Arrange
    beforeEach(() => {
        heroService = TestBed.get(HeroService);
        //params = new Subject<Params>();
        //activeRoute = new MockActivatedRoute();
        location = TestBed.get(Location);
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
            spyOn(heroDetailComponent, 'getHero');
            fixture.detectChanges();
            expect(heroDetailComponent.getHero).toHaveBeenCalled();
        });
    });

    describe('When the function getHero it run', () => {
        it('should the hero varibale be defined', () => {
            spyOn(heroService, 'getHero').and.callThrough();
            MockHeroService.setHeroes(defaultHeroes);            
            //activeRoute.testParams = { id: 1234 };
            //fixture.detectChanges();            
            heroDetailComponent.getHero();

            expect(heroService.getHero).toHaveBeenCalled();
            // 
            //heroDetailComponent.getHero();
            // tick to make sure the async observable resolves*/
        });
    });
});
