import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { CommonModule, UpperCasePipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule, SpyNgModuleFactoryLoader } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { HeroSearchComponent } from "./hero-search.component";
import { HeroSearchService } from "./hero-search.service";
import { DebugElement } from "@angular/core";
import { MockHeroSearchService } from "./mocks/mock-hero-search.service";
import { By } from "@angular/platform-browser";

describe('Test for HeroDetailComponet', () => {
    let heroSearchComponent: HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;
    let location: Location;
    let heroSearchService: HeroSearchService;
    let param = { id: 1 };
    let debugElement: DebugElement;

    //Arrange
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, FormsModule], //If our component uses routing, httpclient
            declarations: [HeroSearchComponent], //Here we put all the components that use our component. 
            providers: [
                //Here we can inject the dependencies that our component needs.
                //If our dependecies are services, we can create a simulated service.
                { provide: HeroSearchService, useValue: MockHeroSearchService },
            ]
        }).compileComponents();
    }));

    //Arrange
    beforeEach(() => {
        heroSearchService = TestBed.get(HeroSearchService);
        fixture = TestBed.createComponent(HeroSearchComponent);
        debugElement = fixture.debugElement;
        heroSearchComponent = fixture.componentInstance;
        //fixture.detectChanges();// Comments, so that it does run the of method ngOnInit();
    });

    it('should create', () => {
        expect(heroSearchComponent).toBeTruthy();
    });

    describe('When the component starts', () => {
        it('should the heros variable be undefined', () => {
            expect(heroSearchComponent.heroes).toBeUndefined();
        });
        it('should the searchTerms variable be defined', ()=>{
            expect(heroSearchComponent['searchTerms']).toBeDefined();
        });
    });

    describe('When the ngOninit method starts', () => {
        it('should the heroes variable be defined', () => {
            fixture.detectChanges();
            expect(heroSearchComponent.heroes).toBeDefined();
        });
    });

    describe('When user witres at search input text', ()=>{
        it('should call function search with search term', () => {
            spyOn(heroSearchComponent, 'search')
            let term = 'And';
            fixture.detectChanges();
            let input = debugElement.query(By.css('#search-box'));
            input.nativeElement.value = term;
            input.triggerEventHandler('keyup', null); //emmit event from input for detect changes in ngmodel
            expect(heroSearchComponent.search).toHaveBeenCalled();
            expect(heroSearchComponent.search).toHaveBeenCalledTimes(1);
            expect(heroSearchComponent.search).toHaveBeenCalledWith(term)
        });

        it('should call function next of the searchTerms with search term', () => {
            let term = 'And';
            spyOn(heroSearchComponent['searchTerms'], 'next');
            fixture.detectChanges();            
            heroSearchComponent.search(term);
            expect(heroSearchComponent['searchTerms'].next).toHaveBeenCalled();
            expect(heroSearchComponent['searchTerms'].next).toHaveBeenCalledTimes(1);
            expect(heroSearchComponent['searchTerms'].next).toHaveBeenCalledWith(term);
        });
    });

});