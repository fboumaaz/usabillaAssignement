import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import _ from 'underscore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items : any[];
  allRates : any []

  constructor( private ratingService : RatingService){
    this.allRates = []
    this.items = []
  };

  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:string[] = [];
  barChartType:string = 'bar';
  barChartLegend:boolean = false;
  barChartData:any[] = [{data: []}];

  statusChartLabels:string[] = [];
  statusChartData:number[] =[] ;
  statusChartType:string = 'pie';

  browserChartLabels:string[] = [];
  browserChartData:number[] =[] ;
  browserChartType:string = 'doughnut';

  //** initialize Feedbacks Status Chart */
  initFeedbacksStatusChart(){
    this.statusChartLabels = this.getUniqFields(this.items,'status');
    this.statusChartLabels.forEach(element => {
      this.statusChartData.push(this.filterArrByElement(this.items,element,null));
    });
  }

  filterArrByElement(arr,field,filter){
    return arr.filter(element => {
        if(filter)
        return _.contains(element[filter],field)
        else return _.contains(element,field)
    }).length;
  }

  //**initialize browsers chart */
  initFeedbacksByBrowserChart(){
    var computedBrowser = _.pluck(this.items,'computed_browser')
      var uniqBrowsers = this.getUniqFields(computedBrowser,'Browser');
      //foreach
      this.browserChartLabels = uniqBrowsers;
      this.browserChartLabels.forEach(element => {
        this.browserChartData.push(this.filterArrByElement(this.items,element,'computed_browser'))
      });
  }

  getUniqFields(arr,field){
    return  _.uniq(_.pluck(arr,field));
  }
  //** initialize Feedbacks By Location Chart */
  initFeedbacksByLocationChart(){
    this.barChartLabels = this.getUniqFields(this.items, 'computed_location')
    this.barChartLabels.forEach(element => {
      this.barChartData[0].data.push(this.items.filter(item => {
          return _.contains(item,element)}).length)
    });  
  }

  ngOnInit() {
    this.ratingService.getItems().subscribe( data => {
      this.items = data.json().items;      
      this.initFeedbacksStatusChart();
      this.initFeedbacksByBrowserChart();
      this.initFeedbacksByLocationChart();
    },error =>{
      alert("An unexpected error occured");
    });
  }  
}
