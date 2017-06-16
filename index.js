var express = require('express');
var app = express();
var url = require('url');
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname + '/public')));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/postage', function (req, response) {
	var queryData = url.parse(req.url, true).query;
	var weight = queryData.weight;
	var itemType = queryData.itemType;
     calcPostage (response, weight, itemType);
})

function calcPostage(response, weight, itemType){
    var result = 0;
    var error="";
    
    if (itemType == "stamped"){
        if (weight <= 1){
            result= 0.49;
            
        }else if (weight <= 2){
            result= 0.70;
            
        }else if (weight <= 3){
            result= 0.91;
            
        }else if (weight <= 3.5){
            result = 1.12;
            
        }else {
            result= "error";
            error= "Weight cannot exceed 3.5lbs";
            
        }
        
    } else if (itemType == "metered"){
        if (weight <= 1){
            result= 0.46;
            
        }else if (weight <= 2){
            result= 0.67;
            
        }else if (weight <= 3){
            result= 0.88;
            
        }else if (weight <= 3.5){
            result = 1.09;
            
        }else {
            result= "error";
            error= "Weight cannot exceed 3.5lbs";
        }
        
        
    }else if (itemType == "flats"){
        if (weight <= 1){
            result=0.98;
        }else if (weight <= 2){
            result= 1.19;
            
        }else if (weight <= 3){
            result = 1.40;
            
        }else if (weight <= 4){
            result= 1.61;
        
        }else if (weight <= 5){
            result= 1.82;
        
        }else if (weight <= 6){
            result= 2.03;
        
        }else if (weight <= 7){
            result = 2.24;
        
        }else if (weight <= 8){
            result = 2.45;
        
        }else if (weight <= 9){
            result= 2.66;
        
        }else if (weight <= 10){
            result = 2.87;
        
        }else if (weight <= 11){
            result= 3.08;
        
        }else if (weight <= 12){
            result = 3.29;
        
        }else if (weight <= 13){
            result = 3.50;
        }else {
            result= "error";
            error= "Weight cannot exceed 13lbs";
        }
        
        
    }else if (itemType == "parcels"){
        if (weight <= 1){
            result=2.67;
        }else if (weight <= 2){
            result= 2.67;
            
        }else if (weight <= 3){
            result = 2.67;
            
        }else if (weight <= 4){
            result= 2.67;
        
        }else if (weight <= 5){
            result= 2.85;
        
        }else if (weight <= 6){
            result= 3.03;
        
        }else if (weight <= 7){
            result = 3.21;
        
        }else if (weight <= 8){
            result = 3.39;
        
        }else if (weight <= 9){
            result= 3.57;
        
        }else if (weight <= 10){
            result = 3.75;
        
        }else if (weight <= 11){
            result= 3.93;
        
        }else if (weight <= 12){
            result = 4.11;
        
        }else if (weight <= 13){
            result = 4.29;
        }else {
            result= "error";
            error= "Weight cannot exceed 13lbs";        }
    	
    }
  var params = {weight: weight, itemType: itemType, result: result, error: error};
  response.render('pages/results', params);
}
