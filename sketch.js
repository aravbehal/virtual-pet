//Create variables here
var dog;
var happydog;
var dog2;
var database;
var foodS;
var foodStock;

function preload()
{
	dog2=loadImage("sprites/dog.png");
  happydog=loadImage("sprites/happydog.png");
}

function setup() {

  database=firebase.database();

	createCanvas(500,500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dog2);
  dog.scale=0.3;
  
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("black")
  text("food remaining "+foodS,150,100)
  
}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
  
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref("/").update({
    food:x
  })
}



