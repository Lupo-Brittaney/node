CREATE TABLE restaurants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
    
);
CREATE TABLE food(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    rest_id INT NOT NULL REFERENCES restaurants(id),
    dairy boolean,
    soy boolean,
    gluten boolean,
    rating INT
    
);





-----------------------------------------------------
INSERT INTO restaurants (name)
VALUES ('Qdoba');

INSERT INTO restaurants (name)
VALUES ('SmashBurger');

INSERT INTO food (name, rest_id, dairy, soy, gluten, rating)
VALUES ('Shrimp Bowl', '1', FALSE, FALSE, FALSE, '5');

INSERT INTO food (name, rest_id, dairy, soy, gluten, rating)
VALUES ('Plain Burger with Udi bun', '2', FALSE, FALSE, FALSE, '5');

INSERT INTO food (name, rest_id, dairy, soy, gluten, rating)
VALUES ('Shrimp Taco with corn tortilla', '1', FALSE, FALSE, FALSE, '5');