        function getRest(){
            var message ="<h2>Restaurants</h2>";
            var select="";
            var xhr = new XMLHttpRequest(); 
            var target= '/restaurant';
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status == 200){
                     var restaurants =  JSON.parse(xhr.responseText);
                     console.log(restaurants);
                    for (var i =0; i < restaurants.rows.length; i++){
                        var rest= restaurants.rows[i].name;
                        var id= restaurants.rows[i].id;
                        message += "<li><a onclick = getFood("+id+"); href= #>" + rest + "</a></li>";
                        select += "<option value ="+id+">"+rest+"</option>";

                    }

                  document.getElementById("return").innerHTML = message;
                document.getElementById("resname1").innerHTML = select;  
                document.getElementById("resname2").innerHTML = select; 
                document.getElementById("food").innerHTML = "";
                }
            }

            xhr.open('GET', target);
            xhr.send();
        };

    
        function getFood(restId){
            var resName= "";
            var list = "<h2>Meals</h2>";
            var xhr = new XMLHttpRequest();
            var target = '/restaurant/'+restId+'/food';
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status == 200){
                    var foods = JSON.parse(xhr.responseText);
                    if(foods.rows.length!==0){
                        for (var i =0; i <foods.rows.length; i++){
                            var food = foods.rows[i].name;
                            var id = foods.rows[i].id;
                            list += "<li><a onclick = getDetails("+id + "," + restId+"); href= #>" + food + "</a></li>";
                        }
                        resName =foods.rows[0].resname;
                        console.log(resName);
                    }else{
                        list= "<p>No meals have been added to this restaurant.</p><p>Return to the home page and add a meal or search another restaurant.</p>"
                    }
                }document.getElementById("return").innerHTML = list;
                document.getElementById("restaurant").innerHTML ="<a onclick = getFood("+restId+"); href= #>" + resName + "</a>";
                document.getElementById("food").innerHTML = "";
            }
            
            xhr.open('GET', target);
            xhr.send();
            
        };
         function getDetails(foodId, restId){
            var table = [];
            var foodName="";
            var xhr = new XMLHttpRequest();
            var target = '/restaurant/'+restId+'/food/'+foodId;
             console.log(target);
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status == 200){
                    var details = JSON.parse(xhr.responseText);
                    console.log(details);
                    var soy = details.rows[0].soy;
                    if (soy ==false){
                        soy = "None";
                    }else if (soy ==true){
                        soy = "Yes";
                    }else {
                        soy= "Error getting details";
                    }
                    var dairy = details.rows[0].dairy;
                    if (dairy ==false){
                        dairy = "None";
                    }else if (soy ==true){
                        dairy = "Yes";
                    }else {
                        dairy= "Error getting details";
                    }
                    var gluten = details.rows[0].gluten;
                    if (gluten ==false){
                        gluten = "None";
                    }else if (soy ==true){
                        gluten = "Yes";
                    }else {
                        gluten= "Error getting details";
                    }
                    var rating = details.rows[0].rating;
                        
                    table += "<p>Soy: " + soy +"</p><p>Dairy: "+ dairy+"</p><p>Gluten: "+gluten+"</p><p>Rating: "+rating+"</p>"; 
                    foodName= details.rows[0].name;
                }document.getElementById("return").innerHTML = table;
                document.getElementById("food").innerHTML = foodName ;
            }
            
            xhr.open('GET', target);
            xhr.send();
            
        } ;  
         function addRest(callback){
             console.log('n addRest function');
            var name= document.getElementById("restName").value;
             console.log(name);
             var params = "resname="+name;
            var xhr = new XMLHttpRequest();
            var target = '/restaurant';
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status == 200){
                    var added = JSON.parse(xhr.responseText);
                    console.log(added);
                    callback();
                    }
                //document.getElementById("return").innerHTML = "<p> Restaurant Added</p>";
                document.getElementById("restName").value="";
                }
            xhr.open('POST', target);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);
            
        };

        function addFood(){
            var name = document.getElementById("mealName").value;
            var dairy = document.getElementById("dairy").value;
            var soy = document.getElementById("soy").value;
            var gluten = document.getElementById("gluten").value;
            var rating = document.getElementById("rating").value;
            var rest_id = document.getElementById("resname2").value;
            //console.log(name, dairy, soy, gluten, rating, restId);
            var params = "name="+name+"&rest_id="+rest_id+"&dairy="+dairy+"&soy="+soy+"&gluten="+gluten+"&rating="+rating;
            var xhr = new XMLHttpRequest();
            var target = '/restaurant/:id/food';
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status == 200){
                    var added = JSON.parse(xhr.responseText);
                    console.log(added);
                    
                    }
                document.getElementById("return").innerHTML = "<p> Meal Added</p>";
                document.getElementById("mealName").value="";
                }
            xhr.open('POST', target);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);            
        };
        function deleteRest(callback){
            var rest_id = document.getElementById("resname1").value;
            var params= "rest_id="+rest_id;
            var xhr = new XMLHttpRequest();
            var target = '/restaurant/'+rest_id;
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status == 200){
                    var added = JSON.parse(xhr.responseText);
                    console.log(added);
                    callback();
                    }
                //document.getElementById("return").innerHTML = "<p> Restaurant Deleted</p>";
                }
            xhr.open('DELETE', target);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);            
            
        };