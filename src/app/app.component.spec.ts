import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RatingService} from './services/rating.service'
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { RatingComponent } from './rating/rating.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular-6-datatable';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('App Component', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>; 
  let authService: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,BsNavbarComponent,RatingComponent,DashboardComponent],
      providers: [RatingService],
      imports:[ BrowserModule,
        HttpModule,
        DataTableModule,
        ChartsModule,
        NgbModule,
        RouterModule,
        RouterTestingModule]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent); 

    // get test component from the fixture
    component = fixture.componentInstance; 

    // UserService provided to the TestBed
    authService = TestBed.get(authService); 

  });
  
});
