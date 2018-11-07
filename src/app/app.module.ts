import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule } from '@angular/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { RatingComponent } from './rating/rating.component';
import { RatingService } from './services/rating.service';
import {DataTableModule} from "angular-6-datatable";
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    RatingComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTableModule,
    ChartsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {   
        path: 'home',
        component: DashboardComponent,
      },
      {   
        path: 'feedbacks',
        component: RatingComponent,
      },
    ],
    { enableTracing: true } // <-- debugging purposes only)
    )
  ],
  providers: [RatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
