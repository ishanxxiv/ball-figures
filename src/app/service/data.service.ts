import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public SEARCH_PLAYER = 'http://localhost:8080/v1/api/find-player?key=';
  public GET_PLAYER_STATS = 'http://localhost:8080/v1/api/player-stat?id=';

  selected:any = {data:[]};
  compare:any = {first:{name:'',data:undefined}, sec:{name:'',data:undefined}};
  chardDataHead:any = [];
  chardData:any = [{name:'',data:[]}, {name:'',data:[]}];

  constructor(private http:HttpClient) {
  }

  setSelectedData(selected:any){
    this.selected = [];
    this.selected = selected;
  }

  getSelectedData():any{
    return this.selected;
  }

  compareData(){
    if(this.compare['first'].data && this.compare['sec'].data){
      this.chardData[0].name = this.compare['first'].name;
      this.chardData[1].name = this.compare['sec'].name;
      Object.keys(this.compare['first'].data).forEach((key:string)=>{
        console.log(key);
        this.chardDataHead.push(key);
        this.chardData[0].data.push(this.compare['first'].data[key]);
        this.chardData[1].data.push(this.compare['sec'].data[key]);
      });
    }
    console.log(this.chardData);
  }

  searchKey(key:string):Observable<any>{
    const httpPostOptions =    {
      "secure": false,
      "changeOrigin": true,
    withCredentials: false
  };
    return this.http.get(this.SEARCH_PLAYER + key);
  }
  getPlayerStat(data:any){
    let url = data.id + (data.year && data.year!='0'?'&season=' + data.year:'');
    return this.http.get(this.GET_PLAYER_STATS + url);
  }

  setPlayerStat(para:any){
      let data = {id:para.id, year:(para.year == 0?'':para.year)};
      this.getPlayerStat(data).subscribe((res)=>{
        if(res){
          if(para.contId == 'first'){
            this.compare['first']['name'] = para.name;
            this.compare['first']['data'] = res;
          }
          if(para.contId == 'sec'){
            this.compare['sec']['name'] = para.name;
            this.compare['sec']['data'] = res;
          }
        }
      });
    console.log(this.compare);
  }


}
