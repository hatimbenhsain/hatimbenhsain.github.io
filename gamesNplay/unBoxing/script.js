var playerSide;
var player;
var box1;
var myScale;
var xPos;
var yPos;
var thic;
var recU;
var recB;
var recL;
var recR;
var inrR;
var outR;
var hole;
var spr;
var holeSize;
var shrinkRate;
var blu;
var holeX;
var holeY;
var holeW;
var holeL;
var speed;
var moving;
var isActive;
var collision;
var directions;
var k;
var score;
var screen;
var orgShrinkRate;
var shrinkNum;
var theFont;
var txtSize;

class Box{
	constructor(x,y,side){
		this.x=x;
		this.y=y;
		this.side=side;
		this.isActive=true;
		var recU, recB, recL, recR;
		speed=orgShrinkRate*((shrinkRate+shrinkNum)/(orgShrinkRate+shrinkNum));
		this.speed=speed;
		this.moving=false;
		// this.recU=createSprite(x+xPos,y+yPos-boxWidth/2,boxWidth+thic,thic);
		// this.recU.shapeColor=color(255);
		// this.recU.velocity=createVector(0,speed);
		// this.recB=createSprite(x+xPos,y+yPos+boxWidth/2,boxWidth+thic,thic);
		// this.recB.shapeColor=color(255);
		// this.recB.velocity=createVector(0,-speed);
		// this.recL=createSprite(x+xPos-boxWidth/2,y+yPos,thic,boxWidth+thic);
		// this.recL.shapeColor=color(255);
		// this.recL.velocity=createVector(speed,0);
		// this.recR=createSprite(x+xPos+boxWidth/2,y+yPos,thic,boxWidth+thic);
		// this.recR.shapeColor=color(255);
		// this.recR.velocity=createVector(-speed,0);
		this.outR=createSprite(x+xPos,y+yPos,boxWidth,boxWidth);
		this.outR.shapeColor=color(255);
		this.inrR=createSprite(x+xPos,y+yPos,boxWidth-thic,boxWidth-thic);
		this.inrR.shapeColor=blu;
		this.getHole();
		this.holeX=holeX;
		this.holeY=holeY
		this.hole=createSprite(x+xPos+this.holeX,y+yPos+this.holeY,holeW,holeL);
		this.hole.shapeColor=blu;

	}
	update(){
		this.outR.scale=Math.pow(0.99,(shrinkRate+shrinkNum)/(orgShrinkRate+shrinkNum))*this.inrR.scale;
		this.inrR.scale=Math.pow(0.99,(shrinkRate+shrinkNum)/(orgShrinkRate+shrinkNum))*this.outR.scale;
		this.hole.scale=Math.pow(0.984,(shrinkRate+shrinkNum)/(orgShrinkRate+shrinkNum))*this.hole.scale;
		this.holeX=this.holeX*Math.pow(0.99,(shrinkRate+shrinkNum)/(orgShrinkRate+shrinkNum));
		this.holeY=this.holeY*Math.pow(0.99,(shrinkRate+shrinkNum)/(orgShrinkRate+shrinkNum));
		//print(this.y+this.holeY+yPos);
		if(this.moving==false){
			this.hole.position=createVector(this.x+xPos+this.holeX,this.y+yPos+this.holeY);
		}
		if (!this.inrR.overlap(screen)){
			this.isActive=false;
		}
	}
	getHole(){
		if (this.side=="l"||this.side=="r"){
			holeY=0;
			holeW=boxWidth/2;
			holeL=holeSize;
			if(this.side=="l"){
				holeX=-boxWidth/4;
			}else{
				holeX=boxWidth/4;
			}
		}else if(this.side=="u"||this.side=="b"){
			holeX=0;
			holeW=holeSize;
			holeL=boxWidth/2
			if(this.side=="u"){
				holeY=-boxWidth/4
			}else{
				holeY=boxWidth/4
			}
		}
	}
	go(dir){
		this.moving=true;
		//print(dir);
		if(dir=="l"){
			this.outR.setVelocity(this.speed,0);
			this.inrR.setVelocity(this.speed,0);
			this.hole.setVelocity(this.speed,0);
			//print("left");
		}else if(dir=="r"){
			this.outR.setVelocity(-this.speed,0);
			this.inrR.setVelocity(-this.speed,0);
			this.hole.setVelocity(-this.speed,0);
		}else if(dir=="u"){
			this.outR.setVelocity(0,this.speed);
			this.inrR.setVelocity(0,this.speed);
			this.hole.setVelocity(0,this.speed);
		}else if(dir=="b"){
			this.outR.setVelocity(0,-this.speed);
			this.inrR.setVelocity(0,-this.speed);
			this.hole.setVelocity(0,-this.speed);
		}

	}
}

function setup(){
	//theFont=loadFont('8bitoperator.ttf')
	textFont('8bitoperator');
	txtSize=20;
	score=0;
	textSize(txtSize);
	shrinkNum=20;
	directions=["l","r","u","b"];
	collision=false;
	blu=color(60,90,190);
	createCanvas(245,245);
	background(200);
	shrinkRate=3;
	orgShrinkRate=shrinkRate;
	myScale=8;
	playerSide=width/myScale;
	boxWidth=height*2;
	thic=boxWidth/4;
	holeSize=boxWidth/4;
	xPos=0;
	yPos=0;
	k=Math.floor(Math.random()*4);
	screen=createSprite(width/2,height/2,width,height);
	screen.shapeColor=blu;
	box1=new Box(width/2,height/2,directions[k]);
	player=createSprite(width/2,height/2,playerSide,playerSide);
	player.shapeColor=color(255);
}
function draw(){
	updateSprites();
	background(blu);
	drawSprites();
	fill(255);
		textFont('8bitoperator');

	text(score,200,200);
	if (collision==false){
		box1.update();
	}
	if (box1.isActive==false){
		k=Math.floor(Math.random()*4);
		box1=new Box(width/2,height/2,directions[k]);
		player=createSprite(width/2,height/2,playerSide,playerSide);
		player.shapeColor=color(255);
		score++;
		if(shrinkRate<41){
			shrinkRate++;
		}
		print(shrinkRate);
		print(getBaseLog(orgShrinkRate,shrinkRate));

	}
	//print(box1.x);
	checkOverlap();
}
function checkOverlap(){
	// if ((player.overlap(box1.outR) && ((player.position.x-player.width/2)<=(box1.inrR.position.x-box1.inrR.width/2)
	// 	||(player.position.x+player.width/2)>=(box1.inrR.position.x-box1.inrR.width/2) || 
	// 	(player.position.y-player.height/2)<=(box1.inrR.position.y+box1.inrR.height/2) ||
	// 	(player.position.y+player.height/2)>=(box1.inrR.position.x-box1.inrR.height/2)) 
	// 	&& ((player.x-player.width/2)<=(box1.hole.x-box1.hole.width/2)||
	// 	(player.x+player.width/2)>=(box1.hole.x+box1.hole.width/2) || (player.y-player.height/2)<=(box1.hole.y-box1.hole.height/2) ||
	// 	/player.y+player.height/2)>=(box1.hole.x+box1.hole.height/2))
	// 	){
	// 		print('collision');
	// 	}
	if((player.overlap(box1.outR))&&(box1.inrR.width*box1.inrR.scale*5/8-Math.sqrt(Math.pow(player.position.x-box1.inrR.position.x,2)+
		Math.pow(player.position.y-box1.inrR.position.y,2))-player.width<=0)&&
		((player.overlap(box1.hole)&&player.width>=box1.hole.scale*holeSize)||!player.overlap(box1.hole))){
		//print("collision");
		collision=true;
		box1.outR.setVelocity(0,0);
		box1.hole.setVelocity(0,0);
		box1.inrR.setVelocity(0,0);
	}
	//print(box1.inrR.width*box1.inrR.scale-Math.sqrt(Math.pow(player.position.x-box1.inrR.position.x,2)+
	//	Math.pow(player.position.y-box1.inrR.position.y,2))-player.width,';',(player.overlap(box1.outR)));
}
function keyPressed(){
	if (keyCode==LEFT_ARROW||keyCode=="a"){
		if(box1.isActive==true&&box1.moving==false){
			box1.go("l");
		}
	}else if(keyCode==RIGHT_ARROW||keyCode=="d"){
		if(box1.isActive==true&&box1.moving==false)
			box1.go("r");
	}else if(keyCode==UP_ARROW||keyCode=="w"){
		if(box1.isActive==true&&box1.moving==false)
			box1.go("u");
	}else if(keyCode==DOWN_ARROW||keyCode=="s"){
		if(box1.isActive==true&&box1.moving==false){
			box1.go("b");
		}
	}
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

//DONE increase difficulty 
//maybe add a box on top of the other box (box2)
//add score
//add losing animation + replay
//add music
//add animation (pulse)

