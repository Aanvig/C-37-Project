var dog, sadDog, happydog, database;
var foodS, foodStock;
var addFood, foodObj;
var feed, lastFed;
var bedroomImg, gardenImg, washroomImg;
var gameState = "Hungry";

function preload(){
  sadDog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  bedroomImg=loadImage("images/Bed Room.png")
  gardenImg=loadImage("images/Garden.png")
  washroomImg=loadImage("images/Wash Room.png")
}

function setup() {
  database=firebase.database()
  createCanvas(700,600)

  foodObj= new Food()

  foodStock=database.ref('Food')
  foodStock.on("value", readStock)

  readState=database.ref('gameState')
  readState.on("value", function(data){
    gameState=data.val()
  })

  dog = createSprite(425,500,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  addFood=createButton("Add Food")
  addFood.position(820,65)
  addFood.mousePressed(addFoods)

  feed=createButton("Feed the Dog");
  feed.position(720,65)
  feed.mousePressed(feedDog)

}

function draw() {
  background(46,139,87)
  foodObj.display()

  fedTime=database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed=data.val()
  })

  fill(255,255,255)
  textSize(15)

  if(lastFed>=12){
    text("Last Fed: " + lastFed%12 + "PM", 250,30)
  } else if(lastFed==0) {
    text("Last Fed: 12 AM", 250,30)
  } else{
    text("Last Fed: " + lastFed + "AM", 250,30)
  }


  if(gameState != "Hungry") {
    feed.hide()
    addFood.hide()
    dog.remove()
  } else {
    feed.show()
    addFood.show()
    dog.addImage(sadDog)
  }

  currentTime=hour()
  if(currentTime==(lastFed+1)) {
    update("Playing")
    foodObj.garden()
  } else if(currentTime==(lastFed+2)) {
    update("Sleeping")
    foodObj.bedroom()
  } else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
    update("Bathing")
    foodObj.washroom()
  } else {
    update("Hungry")
    foodObj.display()
  }


  drawSprites()
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog() {
  dog.addImage(happyDog)
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })

  }


function addFoods() {
  dog.addImage(sadDog)
  foodS++
  database.ref('/'). update( {
    Food: foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}

/*function bedroom(){
  background(bedroomImg)
}

function washroom(){
  background(washroomImg)
}

function garden(){
  background(gardenImg)
}*/