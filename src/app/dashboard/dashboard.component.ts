import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import _ from 'underscore';
import { Feedback } from '../models/feedback';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items : Feedback[];
  allRates : any [];
  errorMsg : string;

  constructor( private ratingService : RatingService){
    this.allRates = [];
    this.items = [];
  };

  /**initialize attributes of items by location chart */
  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:string[] = []; //this is the chart labels
  barChartType:string = 'bar'; //init chart type
  barChartLegend:boolean = false; // init show legend attribute
  barChartData:any[] = [{data: []}]; // init chart data

  /**initialize attributes of items by status chart */
  statusChartLabels:string[] = []; // init chart's labels
  statusChartData:number[] =[] ; // init chart's data
  statusChartType:string = 'pie'; // init chart's type

  /**initialize attributes of items by browser chart */
  browserChartLabels:string[] = []; //init chart's labels
  browserChartData:number[] =[] ; // init chart's data
  browserChartType:string = 'doughnut'; //init charts' type


  /** This function to initialize Feedbacks Status Chart
   */
  initFeedbacksStatusChart(){
    this.statusChartLabels = this.getUniqFields(this.items,'status');
    this.statusChartLabels.forEach(element => {
      this.statusChartData.push(this.filterArrByElement(this.items,element,null));
    });
  }

  //**initialize browsers chart */
  initFeedbacksByBrowserChart(){
    let browsers = [];
    this.items.forEach(item => {
      if(item.computed_browser)browsers.push(item.computed_browser.Browser);
    });
    this.browserChartLabels = _.uniq(browsers);
    this.browserChartLabels.forEach(browser => {
      this.browserChartData.push(this.filterArrByElement(this.items,browser,'computed_browser'));
    });
  }

   //** initialize Feedbacks By Location Chart */
   initFeedbacksByLocationChart(){
    this.barChartLabels = this.getUniqFields(this.items, 'computed_location');
    this.barChartLabels.forEach(element => {
      this.barChartData[0].data.push(this.items.filter(item => {
          return _.contains(item,element)}).length)
    });  
  }

  /**This function subscribe to ratingservice and call getItems function
   * it invokes the initFeedbacksStatusChart function, initFeedbacksByBrowserChart function
   * and the generateDeviceField function
   */
  ngOnInit() {
    this.ratingService.getItems().subscribe( data => {
      this.items = data.json().items;      
      this.initFeedbacksStatusChart();
      this.initFeedbacksByBrowserChart();
      this.initFeedbacksByLocationChart();
    },error =>{
      this.errorMsg = "An unexpected DATA error occured";
    });
  } 

  /** this function filter an array by property
   * Returns number
   * @param itemsArr 
   * @param property 
   * @param filter 
   * @returns {number}
   */
  filterArrByElement(itemsArr,property,filter){
    return itemsArr.filter(element => {
        if(filter)
        return _.contains(element[filter],property); //Returns true if the value is present in the list
        else return _.contains(element,property); //Returns true if the value is present in the list
    }).length;
  }

  /**This function allows you to extract a list of uniq property values  
   * @param {Array} arr //this is the array
   * @param {string} property //this is the property
   * @returns {Array}
   */
  getUniqFields(arr,property){
    return  _.uniq(_.pluck(arr,property));
  }
}
