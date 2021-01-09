var dog, happyDog, database, foodS, foodStock;
var changingGameState,readingGameState;
var  bedroom, garden, washroom;
function preload()
{
  happyDog = loadImage ("happydog.png");
  dogImg=loadImage("Dog.png");
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })

    function addFoods(){
      foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }
  }

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
}


function draw() { 
  background(46, 139, 87) 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0){
    ("lastFeed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if (currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  drawSprites();
  fill("yellow")
  text("Food remaining : "+foodS,120,220)

}
function readStock(data){
    foodS=data.val();
  }

  function writeStock(x){

    if(x<=0){
      x=0
    }else{
      x=x-1
    }
    database.ref('/').update({
      Food:x
    })
  }



