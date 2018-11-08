import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { DataTableModule } from 'angular-6-datatable';
import { HttpModule, Response,ResponseOptions } from '@angular/http';
import { RatingService } from '../services/rating.service';
import { from } from 'rxjs';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let ratingService : RatingService;
  let data = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingComponent ],
      imports :[DataTableModule,HttpModule],
      providers: [RatingService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    ratingService = TestBed.get(RatingService);
    fixture.detectChanges();
    data =[{
      browser:'firefox',
      rating:2,
      version : '1.3',
      computed_browser : {
        Platform : 'iOS'
      }
    },{
      browser:'chrome',
      rating : 1,
      version : '1.3',
      computed_browser : {
        Platform : 'iOS'
      }
    },{
      browser:'chrome',
      rating : 2,
      version : '1.3',
      computed_browser : {
        Platform : 'Win7'
      }
    },{
      browser:'IE',
      rating:2,
      version : '1.3',
      computed_browser : {
        Platform : 'Win7'
      }
    }];
    
  });

  it('should create rating component', () => {
    expect(component).toBeTruthy();
  });

  it('should call rating service in ngOnInit and set items returned from the server', () => {
    spyOn(ratingService, 'getItems').and.callFake(()=>{
      var _array = new Response(new ResponseOptions({
        body: JSON.stringify({items: data}),
        status: 200
      }));
      return from([_array]);
    })
    component.ngOnInit(); 
    expect(ratingService.getItems).toHaveBeenCalled();
    expect(component.items.length).toBe(4);
  });

  it('should return an array of object foreach rate', () =>{
    var rates = component.initRatingArr(data);
    var expectedRates = [{
      rating:1,
      className: 'btn btn-default'
    },{
      rating:2,
      className: 'btn btn-default'
    }];
    expect(rates).toEqual(expectedRates);
  });

  it('should return array with field device ', () =>{
    var expectedArr = [{
      browser:'firefox',
      rating:2,
      version : '1.3',
      computed_browser : {
        Platform : 'iOS'
      },
      device : 'mobile'
    },{
      browser:'chrome',
      rating : 1,
      version : '1.3',
      computed_browser : {
        Platform : 'iOS'
      },
      device : 'mobile'
    },{
      browser:'chrome',
      rating : 2,
      version : '1.3',
      computed_browser : {
        Platform : 'Win7'
      },
      device : 'desktop'
    },{
      browser:'IE',
      rating:2,
      version : '1.3',
      computed_browser : {
        Platform : 'Win7'
      },
      device:'desktop'
    }]
    var res = component.generateDeviceFiled(data);
    expect(res).toEqual(expectedArr);
  });

  it('it should return array filterd by given ratingFilter',() =>{
    var ratingFilters =[1];
    var res = component.filterItemsByRates(data,ratingFilters)
    var expectedArr =[{ browser:'chrome',
                        rating : 1,
                        version : '1.3',
                        computed_browser : {
                          Platform : 'iOS'
                        }
                      }];
    expect(res).toEqual(expectedArr);
  });

  it('it should return array of items',()=>{
    var ratingFilters =[1];
    var res = component.updateItems(data,ratingFilters)
    var expectedArr =[{browser:'chrome',
                        rating : 1,
                        version : '1.3',
                        computed_browser : {
                          Platform : 'iOS'
                        }
                      }];
    expect(res).toEqual(expectedArr);
    ratingFilters = [];
    res = component.updateItems(data,ratingFilters);
    expect(res).toEqual(data);
  });
});
