const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    request('https://api.covid19api.com/summary', { json: true }, (err, result, body) => {
      if (err) { return console.log(err); }
      res.render('home.ejs',{Body : body , Number: 0});
    });
});

app.post('/',(req,res)=>{
    request('https://api.covid19api.com/summary', { json: true }, (err, result, body) => {
      if (err) { return console.log(err); }
    //   console.log(body.Countries[194]);
      var Count=0;
      var C=0;
      const temp = req.body.FormCountry;

      for(var i=0;i<195;i++){
        if(_.lowerCase(temp) === _.lowerCase(body.Countries[i].Country)){
            Count=1;
            C=i;
            break;
        }
      }
      if(Count===0)
      {
        console.log("No Countries Found!")
        res.redirect('/');
      }
      else{
        res.render('home.ejs',{Body : body, Number : Count, Index : C});
      }
    });
})

app.listen(3000, ()=>{
    console.log("Listening to port 3000!")
});