import { ComputedBrowser } from "./computed-browser";

export interface Feedback{
    comment : string;
    computed_browser: ComputedBrowser;
    computed_location:string
    rating : number;
    status:string;
    device : string; 
}