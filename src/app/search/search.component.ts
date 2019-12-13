import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

export interface State {
  name: string;
  data:any
}

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input('nameId')nameId:string;

  public stateCtrl = new FormControl();
  public filteredStates: Observable<State[]>;
  searchType:string = '';

  constructor(private router: Router, private dataService:DataService) {
  }

  ngOnInit() {
    this.stateCtrl.valueChanges.subscribe(keyword => {
      if (keyword.length > 3) {
        this.dataService.searchKey(keyword).subscribe((res)=>{
          this.filteredStates = of(res);
        });
      }
    });
  }

  gotoSearchpage(data:any) {
    let splitID = this.nameId;
    let splitD = splitID.split('_');
    console.log(this.nameId);
    if(splitD[0] != this.searchType){
      this.searchType = splitD[0]
      let year = splitD[1];
      let contId = splitD[0];
      let dataPar = {year:year, id:data.id, name:data.name , contId:contId}
      this.dataService.setPlayerStat(dataPar);
    }
  }

  changeToElip(str: string): string {
    if (str.length > 32) {
      str = str.slice(0, 32) + '...';
    }
    return str;
  }

}
