import { TestBed } from '@angular/core/testing';
import { RatingService } from './rating.service';
import { HttpModule, Http } from '@angular/http';
import {ResponseOptions, Response} from '@angular/http';
import {from} from 'rxjs';


describe('RatingService', () => {
  let ratingService: RatingService;
  let data = [];

  beforeEach(() => {TestBed.configureTestingModule({
    imports :[HttpModule]
  })
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

  it('should be created', () => {
    ratingService = TestBed.get(RatingService);
    expect(ratingService).toBeTruthy();
  });

  it('can instantiate service ', () => {
    ratingService = TestBed.get(RatingService);
    expect(ratingService instanceof RatingService).toBe(true);
  });

  it('can instantiate service with "new"', () => {
    const http = TestBed.get(Http);
    expect(http).not.toBeNull('http should be provided');
    let ratingService = new RatingService(http);
    expect(ratingService instanceof RatingService).toBe(true, 'new service should be instantiated');
  });

  it('should return observable', ()=>{
    spyOn(ratingService, 'getItems').and.callFake(()=>{
      var _array = new Response(new ResponseOptions({
        body: JSON.stringify({items:data}),
        status: 200,
      }));
      return from([_array]);
    });
    expect(ratingService.getItems).toBeDefined();
  });
});
