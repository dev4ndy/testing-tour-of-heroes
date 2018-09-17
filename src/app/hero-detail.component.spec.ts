import { CommonModule, Location, UpperCasePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { defaultHeroes, MockHeroService } from './test-mock.help';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Test for HeroDetailComponet', () => {
    let heroDetailComponent: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let location: Location;
    let heroService: HeroService;
    let param = { id: 1 };
    let debugElement: DebugElement;
    let upperCase = new UpperCasePipe();

    //Arrange
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, FormsModule], //If our component uses routing, httpclient
            declarations: [HeroDetailComponent], //Here we put all the components that use our component. 
            providers: [
                //Here we can inject the dependencies that our component needs.
                //If our dependecies are services, we can create a simulated service.
                {
                    provide: ActivatedRoute, useValue: {
                        params: of(param)
                    }
                },
                { provide: HeroService, useValue: MockHeroService },
            ]
        }).compileComponents();
    }));

    //Arrange
    beforeEach(() => {
        MockHeroService.setHeroes(defaultHeroes);
        heroService = TestBed.get(HeroService);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(HeroDetailComponent);
        debugElement = fixture.debugElement;
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
            expect(heroDetailComponent.getHero).toHaveBeenCalledTimes(1);
        });
    });

    /**
     *  First we test that the function 
     */
    describe('When the function getHero it run with param route valid', () => {
        it('should call the function getHero of HeroService', () => {
            //As the service HeroService is injected like a MockService, really it is call at function getHero of the MockService thus return data hero test.
            //The function getHero recive a parameter that is the "id", this param the provides route 
            spyOn(heroService, 'getHero').and.callThrough();
            heroDetailComponent.getHero(); //Real call at function getHero.
            expect(heroService.getHero).toHaveBeenCalledWith(param.id);
            expect(heroService.getHero).toHaveBeenCalledTimes(1);
        });

        it('should the hero variable be defined', () => {
            heroDetailComponent.getHero();
            expect(heroDetailComponent.hero).toBeDefined();
        });

        it('should render a hero in page', fakeAsync(() => {
            fixture.detectChanges();
            let h2 = debugElement.query(By.css('h2'));
            let text = h2.nativeElement.textContent || h2.nativeElement.innerText;
            expect(text).toBe(`${upperCase.transform('Andres')} Details`);
            tick();   //Use with fakeAsync
            //  fixture.whenStable().then(() => { // Used with async
            let input = debugElement.query(By.css('input'));
            expect(input.nativeElement.value).toBe('Andres');
            //   });           
        }));
    });

    describe('When the user do click in the button Go Back', () => {
        it('should call function goBack()', () => {
            spyOn(heroDetailComponent, 'goBack');
            fixture.detectChanges();
            let button = debugElement.query(By.css('.test-button-go-back'));
            button.triggerEventHandler('click', null);
            expect(heroDetailComponent.goBack).toHaveBeenCalled();
            expect(heroDetailComponent.goBack).toHaveBeenCalledTimes(1);
        }); 

        it('should call function back of Location', () => {
            spyOn(location, 'back');
            heroDetailComponent.goBack(); //Real call at function goBack().
            expect(location.back).toHaveBeenCalled()
            expect(location.back).toHaveBeenCalledTimes(1);
        });
    });

    describe('When the user do click in the button save', () => {
        it('should call function save()', () => {
            spyOn(heroDetailComponent, 'save');
            fixture.detectChanges();
            let button = debugElement.query(By.css('.test-button-save'));
            button.triggerEventHandler('click', null);
            expect(heroDetailComponent.save).toHaveBeenCalled();
            expect(heroDetailComponent.save).toHaveBeenCalledTimes(1);
        });

        it('should update name of the hero', () => {
            spyOn(heroService, 'updateHero').and.callThrough();
            fixture.detectChanges();
            /**
             * First we change the name at input
             */
            let input = debugElement.query(By.css('input'));
            input.nativeElement.value = 'Andres 2';
            input.nativeElement.dispatchEvent(new Event('input')); //emmit event from input for detect changes in ngmodel
            heroDetailComponent.save();
            expect(heroDetailComponent.hero).toEqual(defaultHeroes[0]); 
        });

        it('should call function goBack()', () =>{
            spyOn(heroDetailComponent, 'goBack');
            fixture.detectChanges();
            heroDetailComponent.save();
            expect(heroDetailComponent.goBack).toHaveBeenCalled();
            expect(heroDetailComponent.goBack).toHaveBeenCalledTimes(1);
        });
    });
});
