//require express module and begin an instance of it
var express = require('express');
var app = express();

var router= express.Router();

//require postgress 
var pg = require('pg');
const conString = "postgres://postgres:degree4me@localhost:5432/postgres";


app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//set up listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//get all restaurants
router.get('/restaurant', function(request, response, next){
    var client = new pg.Client(process.env.DATABASE_URL);
    client.connect(function(err){
        if (err){
            console.log("error connecting to database:");
            console.log(err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM restaurants', function (err, result){
           
            if (err){
                return console.error('error running query', err);
            }
            response.send(result);
        });
    });
});

//create a new restaurant
router.post('/restaurant', function(require, request, next){
    pg.connect(conString, function(err, client, done){
        if(err){
            return console.error('error fetching client from pool', err);
        }
        concole.log("connected to database");
        client.query('INSERT INTO restaurants(name) VALUES($1) returning id', [request.body.name], function(err, result){
            done();
            if(err){
                return console.error('error running query', err);
            }
            response.send(result);
        });
    });
});


//get a specific restaurant
router.get('/restaurant/:id', function(request, response, next){
    pg.connect(conString, function(err, client, done){
       if(err){
           return console.error('error fetching client from pool', err);
       } 
       console.log("connected to database");
        client.query('SELECT * FROM restaurants WHERE id =$1', [request.params.id], function(err, result){
            done();
            if(err){
                return console.error('error running query', err);
            }
            response.send(result); 
        });
    });
});

//delete a specific restaurant
router.delete('/restaurant/:id', function(request, response){
    pg.connect(conString, function(err, client, done){
       if(err){
           return console.error('error fetching client from pool', err);
       } 
       console.log("connected to database");
        client.query('SELECT * FROM restaurants WHERE id =$1', [request.params.id], function(err, result){
            done();
            if(err){
                return console.error('error running query', err);
            }
            response.send(result); 
        });
    });    
    
});

//get all meals at a restaurant
router.get('/restaurant/:id/food', function(request, response){
    pg.connect(conString, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT f.name, f.id FROM food f INNER JOIN restaurants r ON f.rest_id = r.id WHERE r.id=$1', [request.params.id], function(err, result){
            done();
            if(err){
               return concole.error('error running query', err);
            }
            response.send(result);
        });
    });    
});

//create a meal at a restaraunt
router.post('/restaurant/:id/food', function(request, response){
    pg.connect(conString, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('INSERT INTO food(name, rest_id, dairy, soy, gluten, rating) VALUES($1, $2, $3, $4, $5, $6) returning id', [request.body.name, request.body.rest_id, request.body.dairy, request.body.soy, request.body.gluten, request.body.rating], function(err, result){
            done();
            if(err){
               return concole.error('error running query', err);
            }
            response.send(result);
        });
    });    
});

//get info on a specific meal
router.get('/restaurant/:id/food/:id', function(request, response){
    pg.connect(conString, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT f.name, f.id FROM food f INNER JOIN restaurants r on f.rest_id = r.id WHERE r.id=$1', [request.params.id], function(err, result){
            done();
            if(err){
               return concole.error('error running query', err);
            }
            response.send(result);
        });
    });    
});    


app.use('/', router);
module.export = router;








