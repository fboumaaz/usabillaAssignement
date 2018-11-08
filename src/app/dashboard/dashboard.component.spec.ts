import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { RatingService } from '../services/rating.service';
import {  from } from 'rxjs';
import {ResponseOptions, Response} from '@angular/http';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let ratingService : RatingService
  let data = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports:[ ChartsModule,HttpModule],
      providers: [RatingService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    ratingService = TestBed.get(RatingService);
    fixture.detectChanges();
    data =[{
      browser:'firefox',
      rating : 5,
      version : '1.3'
    },{
      browser:'chrome',
      rating : 1,
      version : '1.3'
    },{
      browser:'chrome',
      rating : 4,
      version : '1.3'
    },{
      browser:'IE',
      rating:  2,
      version : '1.3'
    }];
  });

  it('should create dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should call rating service in ngOnInit and set items returned from the server ', () => {
    spyOn(ratingService, 'getItems').and.callFake(()=>{
      var _array = new Response(new ResponseOptions({
        body: JSON.stringify({items:data}),
        status: 200,
      }));
      return from([_array]);
    });
    component.ngOnInit(); 
    expect(ratingService.getItems).toHaveBeenCalled();
    expect(component.items.length).toBe(4);
  });

  it('should init data for status chart',() => {    
    component.ngOnInit();
    component.initFeedbacksStatusChart();
    expect(component.statusChartData).toBeTruthy()
  });

  it('should init data for browser chart ',() => {    
    component.ngOnInit();
    component.initFeedbacksByBrowserChart();
    expect(component.browserChartData).toBeTruthy()
  });

  it('should init data for location chart',() => {    
    component.ngOnInit();
    component.initFeedbacksByBrowserChart();
    expect(component.barChartData[0].data).toBeDefined();
  });

  it('should return array of uniq field',()=>{
    var expectedBrowsers = component.getUniqFields(data,'browser');
    var browsers = ['firefox','chrome','IE'];
    expect(browsers.length).toEqual(3);
    expect(expectedBrowsers).toEqual(browsers);
  });

  it('should filter by string and return the count of found elements', () =>{
    var expectedBrowsersCount = component.filterArrByElement(data,'chrome',null);
    var browsersCount = 2;
    expect(expectedBrowsersCount).toEqual(browsersCount);
  });
});
