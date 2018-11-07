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
   
  });

  it('should create dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit ', () => {
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

  it('should init status data',() => {    
    component.ngOnInit();
    component.initFeedbacksStatusChart();
    expect(component.statusChartData).toBeTruthy()
  })
  it('should init browser data',() => {    
    component.ngOnInit();
    component.initFeedbacksByBrowserChart();
    expect(component.browserChartData).toBeTruthy()
  })
  it('should init location data',() => {    
    component.ngOnInit();
    component.initFeedbacksByBrowserChart();
    expect(component.barChartData[0].data).toBeDefined();
  });
  it('should return array of uniq field',()=>{
    const arr = [{
      browser:'chrom',
      data:'123',
      version : '1.3'
    },{
      browser:'firefox',
      data:'123',
      version : '1.3'
    },{
      browser:'chrom',
      data:'123',
      version : '1.3'
    }]
    var expectedBrowsers = component.getUniqFields(arr,'browser');
    var browsers = ['chrom','firefox'];
    expect(browsers.length).toEqual(2);
    expect(expectedBrowsers).toEqual(browsers);
  });
  it('should filter by element and return the count of found elements',()=>{
    const arr = [{
      browser:'chrom',
      data:'123',
      version : '1.3'
    },{
      browser:'firefox',
      data:'123',
      version : '1.3'
    },{
      browser:'chrom',
      data:'123',
      version : '1.3'
    }]
    var expectedBrowsersCount = component.filterArrByElement(arr,'chrom',null);
    var browsersCount = 2;
    expect(expectedBrowsersCount).toEqual(browsersCount);
  });
  
});
