//require express module and begin an instance of it
var expres = require('express');
var app = express();

//require postgress 
var pg = require("pg");
const connectionString = "postgres://postgres:degree4me@localhost:5432/postgres";


app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//set up listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/getList', function(request, response){
    getList(request, response);
});

function getList(request, response){
    
};