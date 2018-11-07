import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { DataTableModule } from 'angular-6-datatable';
import { HttpModule, Response,ResponseOptions } from '@angular/http';
import { RatingService } from '../services/rating.service';
import { from } from 'rxjs'
import { ChartsModule } from 'ng2-charts';
describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let ratingService : RatingService;
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
    
  });

  it('should create rating component', () => {
    expect(component).toBeTruthy();
  });

  it('should call rating service in ngOnInit ', () => {
    spyOn(ratingService, 'getItems').and.callFake(()=>{
      var _array = new Response(new ResponseOptions({
        body: JSON.stringify({items: [10, 20, 30]}),
        status: 200,
      }));
      return from([_array]);
    })
    component.ngOnInit(); 
    expect(ratingService.getItems).toHaveBeenCalled();
    expect(component.items.length).toBe(3);
  });

  it('should return an array of object foreach rate', () =>{
    var arr = [{
      rating: 1,
      browser : 'chrome',
      version : '1.2'
      },{rating: 1,
      browser : 'IE',
      version : '1.2'
    },{rating: 2,
      browser : 'safari',
      version : '1.2'
    }];
    var rates = component.initRatingArr(arr);
    var expectedRates = [{
      rating:1,
      className: 'btn btn-default'
    },{
      rating:2,
      className: 'btn btn-default'
    }]
    expect(rates).toEqual(expectedRates)
  });

  it('should return array with field device ', () =>{
    var arr = [{
      rating: 1,
      browser : 'chrome',
      computed_browser : {
        Platform : 'iOS'
      }
      },{rating: 2,
      browser : 'safari',
      computed_browser : {
        Platform : 'Win7'
      }
    }];
    var expectedArr = [{
      rating: 1,
      browser : 'chrome',
      computed_browser : {
        Platform : 'iOS'
      },
      device : 'mobile'
      },{rating: 2,
      browser : 'safari',
      computed_browser : {
        Platform : 'Win7'
      },
      device : 'desktop'
    }]
    var res = component.generateDeviceFiled(arr);
    expect(res).toEqual(expectedArr);
  })
  // it('it should return array with updated className value',() =>{
  //   // updateRatesStyle
  //   var arr =[{
  //     rating : 1,
  //     className : 'class1'
  //   },{
  //     rating : 2,
  //     className : 'class1'
  //   }];
  //   var res = component.updateRatesStyle(arr,1,'class2');
  //   var expectedArr = [{
  //     rating : 1,
  //     className : 'class2'
  //   },{
  //     rating : 2,
  //     className : 'class1'
  //   }];
  //   expect(res).toEqual(expectedArr)
  // })

  it('it should return array filterd by given ratingFilter',() =>{
    // FilterItemsByRates(arrItems,ratingFilters)
    var arr =[{
          browser : 'chrome',
          rating : 1,
        },{
          browser : 'safari',
          rating : 2,
        },{
          browser : 'IE',
          rating : 1,
        }];
    var ratingFilters =[1];
    var res = component.filterItemsByRates(arr,ratingFilters)
    var expectedArr =[{ browser : 'chrome',
                        rating : 1,
                      },{
                        browser : 'IE',
                        rating : 1
                      }];
    expect(res).toEqual(expectedArr)
  })
});
