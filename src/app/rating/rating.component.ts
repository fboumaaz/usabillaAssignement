import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import _ from 'underscore';
import { Feedback } from '../models/feedback';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  items : Feedback [];
  filterdItems : Feedback [];
  ratingFilters : any [];
  allRates : any [];
  errorMsg : string;

  /**this is the constructor of the component
   * we give it as a parameter RatingService 
   * @param {RatingService} ratingService
   */
  constructor( private ratingService : RatingService){
    this.ratingFilters = [];
    this.allRates = [];
  };

  /**This function subscribe to ratingservice and call getItems function
 * it invoke the initRatingArr function and the generateDeviceField function
 */
  ngOnInit(){
    this.ratingService.getItems().subscribe(data => {
      this.items = data.json().items;

      /**init rating */
      this.allRates = this.initRatingArr(this.items);
      /**init device */
      this.items = this.generateDeviceFiled(this.items);
      this.filterdItems = this.items;
    },error =>{
      this.errorMsg = "An unexpected DATA error occured";
    });
  }

  /**this function initialize rating array
  * it returns rating Array
  * @param {Feedback []} arrItems //this is the array of feedbacks items
  * @returns {Array} //this is array of rates
    */
  initRatingArr(arrItems){
    const uniqRatings = _.uniq(_.pluck(arrItems , "rating")).sort();
    var rates = [];
      uniqRatings.forEach(r => {
        rates.push({
          rating : r,
          className: 'btn btn-default'
        })
      });
      return rates;
  }

  /**This function check the platform attribute and generate Device 
   * it checks  the platform of each element in the array and add new filed 'device' to it 
   * the result of device depends on the platform 
   * This function should return a new array with device field
   * @param {Feedback []} arrItems //this is array of feedbacks items
   * @returns {Array} // this is array of feedbacks items with device
   */
  generateDeviceFiled(arrItems){
    const mobile = ["iOS","Android"];
      const desktop = ["WinVista","Win7","Win8.1","Win8","MacOSX","WinXP"];
      _.map(arrItems, function(item){ 
        if(item.computed_browser){
          if(_.contains(mobile,item.computed_browser.Platform)){
            return item.device = "mobile";
          }else if(_.contains(desktop,item.computed_browser.Platform)){
            return item.device = "desktop";
          }
        }
       });
       return arrItems;
    }

  /**This function filter on items Array by comments
   * @param {string} query //this the filter that the user tap in search input
   * @returns {Feedback []} //this array of feedback items after filter
    */
  filterItemsByComment(query : string, ){
    var filterByComment = (query)?
    this.items.filter(item => item.comment.toLowerCase().includes(query.toLowerCase())):
    this.items;
    this.filterdItems = this.updateItems(filterByComment,this.ratingFilters)
  }

  /**This function update className in each element in the array 
   * it should returns updated array
   * @param {Array} arrRates //this is array of rates
   * @param {number} selectedFilter //this is the selected filetr by the user
   * @param {string} className //this is the new style of selectedFilter button
   * @returns {Array} //this is array of rates updated
    */
  updateRatesStyle( arrRates, selectedFilter, className ) {
      // console.log('arrRates, selectedFilter, className',arrRates, selectedFilter, className)
    return _.map(arrRates,(ele)=>{
        if (ele.rating == selectedFilter) {
          ele.className = className;
        }
      });
    }

  /** This function check if filter choosed by the user applied or not
   * if it is already applied the function deactive the fileter by
   *  removing it from the filter table and changing the style of the button
   * else the function will activate the button by adding the new filter to the filter array and changing the style of the button
   * @param {Array} ratingFiltersArray //this is array of rates filter
   * @param {object} selectedRateFilter // this is the selected rate  
   */

  updateRatingFilter(selectedRateFilter){
    if(_.contains(this.ratingFilters,selectedRateFilter.rating)){
      this.ratingFilters = _.without(this.ratingFilters,selectedRateFilter.rating);
      this.updateRatesStyle(this.allRates,selectedRateFilter.rating ,'btn btn-default');
    }
    else{
      this.ratingFilters.push(selectedRateFilter.rating);
      this.updateRatesStyle(this.allRates,selectedRateFilter.rating ,'btn btn-info');
    }
  }

  /**This function filter array of items by an Array of filterq
   *check for each element's rating if it contains the filters's Array
   * it returns filtered Array
   * @param {Feedback []} arrItems //this is array if feedbacks items
   * @param {Array} ratingFilters //this is rating filters
   * @returns {Array}
   */
  filterItemsByRates(arrItems,ratingFilters){
    return arrItems.filter(element => {
      //_.contains returns true or false
      return _.contains(ratingFilters, element.rating);
    })
  }
  /**
   * This function update the feedbacks items
   * if the length of rating filters array > 0 then function should filter the items by rating filters array
   * else it should return the items
   * @param {Feedback []} items //this is array if feedbacks items
   * @param {Array} ratingFilters // this is array of rating filters
   * @return {Array}
   */
  updateItems(items,ratingFilters){
    if(ratingFilters.length > 0) return this.filterItemsByRates(items,ratingFilters);
    else if(ratingFilters.length == 0) return items;
  }
  /**
   * This function filter items by rating
   * @param {Object} selectedRateFilter //this is the selected filter
   * @returns {Array}
   */
  filterRating(selectedRateFilter){
    this.updateRatingFilter(selectedRateFilter);
    return this.filterdItems = this.updateItems(this.items, this.ratingFilters);
  }
}
