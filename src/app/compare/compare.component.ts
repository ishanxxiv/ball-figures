import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  public selectedFirst:any;
  public selectedSec:any;
  public isYear:boolean = false;
  public year:string ='';
  public first:string = 'first_0'
  public sec:string = 'sec_0'

  constructor(public dataserv:DataService, private router:Router) { }

  ngOnInit() {
    this.selectedFirst = this.dataserv.selected;
    this.selectedSec = this.dataserv.selected;
  }

  compareChart(){
    this.dataserv.compareData();
  }
  years():any{
    let years = [];
    let currentYear = new Date().getFullYear();
    for(let i = currentYear; i>=1971;i--){
      years.push(i);
    }
    return years;
  }

  switchYear(status:boolean){
      this.isYear = status;
  }

  selectedYear(event:any){
    this.year = event;
    this.first = 'first_' +  (this.isYear?this.year:'0');
    this.sec = 'sec_' + (this.isYear?this.year:'0');
  }

  back(){
    this.router.navigate(['home']);
  }

}
