//Install express server
const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const API = 'https://www.balldontlie.io/api/v1/';

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/browser'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/v1/api/find-player',(req,res)=>{
  let params = req.query;
  let year = params.hasOwnProperty('year') ? params.year : 1970;
  let name = params.key;
  let findPlayer = query =>new Promise((resolve,reject)=>{
    let search_api = API+`players?search=${query.name}`;
    request(search_api, function (error, response, body) {
      if(error){
        reject({status:0,message:"Something went wrong while fetching record",debug:error});
      } else {
        try {
          data = JSON.parse(body).data;
          data=data.map(it=>{
            return {name:`${it.first_name} ${it.last_name}`,id:it.id};
          })
          resolve(data);
        }
        catch (e) {
          reject({status:0,message:"Something went wrong while fetching record",debug:error});
        }
      }
    });
  });
  findPlayer({name:name}).then(result=>res.json(result)).catch(err=>res.json(err));
});

app.get('/v1/api/player-stat',(req,res)=>{
  let params = req.query;
  let player_id=params.id;
  let year=params.hasOwnProperty('season') ? params.season : null;

  let playerDetail =input =>new Promise((resolve,reject)=>{
    if(input.season){
      return get_year_wise({id:input.player_id,season:input.season}).then(result=>resolve([result])).catch(err=>{
        return resolve([null]);
      });
    }
    else {
      let year_wise_promise = [];
      let count = 49;
      let i=0;
      while(i<=count){
        let season = 1970+i;
        year_wise_promise.push(get_year_wise({id:input.player_id,season:season}));
        i++;
      }
      Promise.all(year_wise_promise).then(result=>resolve(result.filter(Boolean))).catch(err=>reject(err));
    }
  });
  let get_year_wise =input=>new Promise((resolve,reject)=>{
    let stat_api = API+`season_averages?player_ids[]=${input.id}&season=${input.season}`;
    request(stat_api, function (error, response, body) {
      if(error){
        reject(error);
      } else {
        console.log(body);
        try {
          let data = JSON.parse(body).data;
          if(data.length>0){
            resolve(data[0]);
          } else {
            resolve(null);
          }
        }
        catch (e) {
          reject(error);
        }
      }
    });
  })
  playerDetail({player_id:player_id,season:year})
    .then(result=>{
      let stats={
      "PTS":0,
      "FG%":0.0,
      "AST":0,
      "REB":0,
      "TO":0,
      "3PT":0,
      "eFG%":0.0,
      "TO":0,
      "TS%":0,
      "PPP":0,
        "TOV%":0
    };

      if(result && result.length >0 && result[0]){
        result.forEach(it=>{
          let pts=it.pts;
          stats["PTS"]+=it.pts;

          let fg_per = it.fg_pct*100;
          stats["FG%"]+=fg_per;

          let ast=it.ast;
          stats["AST"]+=ast;

          let reb=it.reb;
          stats["REB"]+=reb;

          let to=it.turnover;
          stats["TO"]+=to;

          let fg_pct=it.fg_pct;
          stats["3PT"]+=fg_pct;

          let efg_perc = (it.fgm+0.5*it.fg3m)/it.fga;
          stats["eFG%"]+=efg_perc;

          let tov_perc = (100 * it.turnover) / (it.fga + (it.fta * 0.44) + it.turnover);
          stats["TOV%"]+=tov_perc;

          let ts_perc =it.pts/(2*(it.fga+(0.44*it.fta)));
          stats["TS%"]+=ts_perc;

          let ppp = it.pts/(2*(it.fga+0.44*it.fta)+it.turnover);
          stats["PPP"]+=ppp;
        })

        let len=result.length;
        Object.keys(stats).forEach(it=>stats[it]=((stats[it]/len)).toFixed(2));

      }
      return res.json(stats)}
      ).catch(err=>res.json(err));

})

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/browser/browser/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


