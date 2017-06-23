CREATE TABLE restaurants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
    
);
CREATE TABLE food(
    id SERIAL NOT NULL PRIMARY KEY,
    rest_id INT NOT NULL REFERENCES restaurants(id),
    dairy boolean,
    soy boolean,
    gluten boolean,
    rating INT
    
);