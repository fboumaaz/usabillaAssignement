import { TestBed } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http'

import { RatingService } from './rating.service';
import {Observable } from 'rxjs';
import { of } from 'rxjs';



// describe('RatingService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: RatingService = TestBed.get(RatingService);
//     expect(service).toBeTruthy();
//   });
// });

let httpClientSpy: { get: jasmine.Spy };
let ratingService: RatingService;
 
beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  ratingService = new RatingService(<any> httpClientSpy);
});
 
it('should return observable',() => {
  spyOn(ratingService,'getItems').and.callFake(()=>{
    return Observable;
  })
})

it('should return observable',() => {
  spyOn(ratingService,'getItems').and.callFake(()=>{
    return Observable;
  })
})

// it('should return expected items (HttpClient called once)', () => {
//   const expectedItems =
//     [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
 
//   httpClientSpy.get.and.returnValue(expectedItems);
 
//   ratingService.getItems().subscribe(
//     heroes => expect(heroes).toEqual(expectedItems, 'expected heroes'),
//     fail
//   );
//   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
// });
 
// it('should return an error when the server returns a 404', () => {
//   const errorResponse = new HttpErrorResponse({
//     error: 'test 404 error',
//     status: 404, statusText: 'Not Found'
//   });
 
//   httpClientSpy.get.and.returnValue(errorResponse);
 
//   ratingService.getItems().subscribe(
//     heroes => fail('expected an error, not heroes'),
//     error  => expect(error.message).toContain('test 404 error')
//   );
// });