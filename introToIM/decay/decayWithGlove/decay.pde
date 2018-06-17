import processing.sound.*;

import java.util.HashSet;

import lord_of_galaxy.timing_utils.*;

import beads.*;
import org.jaudiolibs.beads.*;

import com.dhchoi.*;

import g4p_controls.*;

import sprites.*;
import sprites.maths.*;
import sprites.utils.*;

import ptmx.*;

import processing.serial.*;

Serial myPort;

String val = "";
int[] sensorReading = {0,0,0,0};

Sprite luigi;
Sprite stageSprite;
Sprite glove;
Sprite heart;
Sprite deadLuigi;

Domain luigiDomain;

float amp;

ArrayList<Platform> platforms=new ArrayList<Platform>();

int zLuigi;
int xLuigi;
int yLuigi;
int ground;
int leftLuigi;
int bottomLuigi;
int topLuigi;
int rightLuigi;
int spritesAdded;
int luigiAddedSprites;
int lives;
int maxLives;
int rectOpacity;
int stageX;
int decayRate;
int opacityDiff;
int page;
int count;

float opacityToAdd;


PImage bg;
PImage stage;



SoundFile athletic;
SoundFile win;
SoundFile gameOver;
SoundFile jump;
SoundFile start;


float xSpeed;
float yJump;
float yGravity;


String luigiAnimation;
String luigiOrientation;
String athleticPath;
String winPath;
String gameOverPath;
String jumpPath;
String blank;
String bgPath;
String stagePath;
String velXState;

String text11="a glove of intense aura appears\nahead of you. do you wish to pick\nit up? ";
String text12="(clap to pick the glove up)";
String text21="a magician! please help us! our \nprincess has been abducted, and \nour hero has been killed! \nyou are our only hope!";
String text22="(clap to accept, ignore to ignore)";
String text31="thank you!\nwith your magical glove, you can\ncontrol your hero to go save the \nprincess, and restore peace to the \nkingdom! just clap once to use \nits awesome power!";
String text32="(clap to clap)";
String text41="to make your hero go left, \nflex your fourth finger!";
String text51="amazing! now flex your middle\nfinger to go right!";
String text61="you're almost ready! now clap\nfor a jump\nto the heavens!";
String text71="perfect! \nnow you can go save the\nprincess!";
String text81="be careful, though. your power\nis formidable, but magic \nalways comes for a price....";
String text91="now go and save our princess!";

String[] primaryTexts={text11,text21,text31,text41,text51,text61,text71,text81,text91};
String[] secTexts={text12,text22};


boolean gameOn;
boolean jumpPressed;
boolean jumpRelease;
boolean leftPressed;
boolean leftRelease;
boolean resetPressed;
boolean resetRelease;
boolean rightPressed;
boolean rightRelease;
boolean restoreVelY;

PFont font;

float time;

class Platform{
	int x1, x2, y;
	double xL, yL;
	Platform(int x1,int x2, int y){
		this.x1=x1*5;
		this.x2=x2*5;
		this.y=y*5;
	}
	int ground(double xL,double yL){
		if(xL>=this.x1 && xL<=this.x2 && yL<=this.y){
			return y;
		}else{
			return 0;
		}
	}
}

void setup(){
	restoreVelY=false;
	jumpPressed=false;
	jumpRelease=false;
	rightPressed=false;
	rightRelease=false;
	leftRelease=false;
	leftPressed=false;
	resetRelease=false;
	resetPressed=false;
	val = "";
	int[] sensorReading = {0,0,0,10};
	myPort = new Serial(this, "COM4", 9600);
 	myPort.bufferUntil('\n');
	rectOpacity=0;
	scale(5);
	heart=new Sprite(this,"heart.png",2,1,50);
	deadLuigi=new Sprite(this,"luigiDead.png",1,1,50);
	page=0;
	glove=new Sprite(this,"glove.png",4,1,50);
	frameRate(60);
	time=0.1;

	glove.setXY(width/2,height*5/8);
	glove.setFrameSequence(0,2,time*2);
	glove.setScale(5);
	heart.setXY(width*7/16,height*3/8);
	heart.setFrameSequence(0,1,time*3);
	heart.setDead(true);
	heart.setScale(5);
	deadLuigi.setXY(width*1/2,height*5/8);
	deadLuigi.setDead(true);
	deadLuigi.setScale(5);
	start=new SoundFile(this,"start.mp3");
	font=createFont("8bitoperator.ttf",50);
	textFont(font);
	textAlign(CENTER);
	textSize(10*5);
	decayRate=1;
	platforms=new ArrayList<Platform>();
	platforms.add(new Platform(0,50,height-40));
	blank="blank.mp3";
	maxLives=6;
	amp=1;
	athleticPath="athletic.mp3";
	jumpPath="jump.wav";
	winPath="win.wav";
	gameOverPath="gameOver.wav";
	bgPath="bgHR.png";
	stagePath="stage.png";
	lives=6;
	size(1200,800);
	gameOn=false;
	start.loop();
	velXState="idle";
}
void serialEvent(Serial myPort){
  val = myPort.readStringUntil('\n'); 
  if (val != null) {
   
  }
}
void analyze(){
	jumpRelease=false;
	rightRelease=false;
	leftRelease=false;
	resetRelease=false;
	if(sensorReading[0]>80){
		jumpPressed=true;
	}
	if(sensorReading[1]>60){
		leftPressed=true;
	}
	if(sensorReading[2]>100){
		resetPressed=true;
	}
	if(sensorReading[3]>1){
		rightPressed=true;
	}
	if(sensorReading[0]<80&&jumpPressed==true){
		jumpRelease=true;
		jumpPressed=false;
	}
	if(sensorReading[1]<60&&leftPressed==true){
		leftRelease=true;
		leftPressed=false;
	}
	if(sensorReading[2]<100&&resetPressed==true){
		resetRelease=true;
		resetPressed=false;
	}
	if(sensorReading[3]<1&&rightPressed==true){
		rightRelease=true;
		rightPressed=false;
	}
	checkStuff();
}
void draw(){
	String[] data= new String[4];
	data = split(val,"#");
  	if (data.length == 4){
  		sensorReading[0] = int(data[0]);
  		sensorReading[1] = int(data[1]);
  		sensorReading[2] = int(data[2]);
  		sensorReading[3] = int(trim(data[3]));
  		analyze();
		background(255);
		time=1/frameRate;
		if (gameOn==false){
			turnPage();
		}
		if (gameOn==true){
			update();
		}
		count++;
  	}
  	//int[] nums=int(split(val,'#'));
  	//println("Val: " + val);

}
void turnPage(){
	if (page<9){	
		background(0);
		text(primaryTexts[page],width/2,height*1/8);
	}
	if (page<2 && count%32<16){
		text(secTexts[page],width/2,height*7/8);
	}
	if (page==0){
		glove.update(time);
		glove.draw();
	}else{
		glove.setDead(true);
	}
	if (page==9){
		gameOn=true;
		start.stop();
		gameInit();
	}
	if (page>=10&&page<17&&lives>=0){
		background(0);
		heart.update(time);
		heart.draw();
		deadLuigi.setRot(deadLuigi.getRot()+0.01);
		deadLuigi.update(time);
		deadLuigi.draw();
		fill(255);
		text("Oh no... Surely there must be\nsomething more you could do?",width*1/2,height*1/8);
		text("x"+str(lives),width*8.5/16,height*3/8);
		if (count%32<16){
			text("(clap to revive your hero)",width/2,height*7/8);
		}
	}else if(page==17||lives<0){
		background(0);
		heart.setFrame(1);
		heart.setXY(width*7/8,height*5/8);
		glove.setDead(false);
		glove.setXY(width*1/8,height*5/8);
		glove.setFrame(3);
		glove.update(time);
		heart.update(time);
		heart.draw();
		glove.draw();
		start.stop();
		fill(255);
		text("Oh, looks like we lost\nour magician too.\nConsumed by power, like\nall the others.\nThere's always the\nnext one.",width/2,height*1/8);
		if (count%64<32){
			text("(clap to reset,\nand put down the glove.)",width/2,height*7/8);
		}
	}
}
void gameInit(){
	stageX=0;
	stageBuilder();
	athletic=new SoundFile(this,athleticPath);
	win=new SoundFile(this,winPath);
	gameOver=new SoundFile(this,gameOverPath);
	jump=new SoundFile(this,jumpPath);
	stage=loadImage("stage.png");
	athletic.amp(amp);
	win.amp(amp);
	gameOver.amp(amp);
	win.amp(amp);
	bg=loadImage(bgPath);
	spritesAdded=9;
	luigiAddedSprites=spritesAdded;
	time=1/(frameRate*decayRate);
	zLuigi=50;
	xLuigi=0;
	ground=height-40*5;
	leftLuigi=0;
	rightLuigi=width/2;
	topLuigi=-height;
	xSpeed=100*5;
	yJump=-200*5;
	yGravity=20*5;
	luigi=new Sprite(this,"luigi.png",16,1,zLuigi);
	stageSprite=new Sprite(this,"stage.png",1,1,zLuigi-10);
	stageSprite.setScale(5);
	stageSprite.setDomain(0,0,5000*5,height,0);
	stageSprite.setDomain(-5000*5,0,5000*5,height,0);
	stageSprite.setX(5000*5/2);
	bottomLuigi=ground;
	yLuigi=height/2;
	luigiDomain=new Domain(leftLuigi,topLuigi,rightLuigi,bottomLuigi);
	luigi.setXY(xLuigi,yLuigi);
	luigi.setDomain(luigiDomain,0);
	luigi.setVelXY(0,0);
	luigi.setFrame(luigiAddedSprites+1);
	luigi.setScale(5);
	luigiAnimation="idle";
	luigiOrientation="right";
	athletic.loop();
	heart.setDead(false);
	heart.setXY(width*0.4/8,height*0.8/8);
	heart.setFrame(0);
}
void keyPressed(){
	if (gameOn==true&&luigiAnimation!="gameOver"){
		if (keyCode==LEFT){
			luigi.setVelX(xSpeed*(-1));
			luigiOrientation="left";
			luigiAddedSprites=0;
			if (luigiAnimation!="run" && luigi.getVelY()==0){
	    		luigi.setFrameSequence(2+luigiAddedSprites,3+luigiAddedSprites,time*2,90);
	    		luigiAnimation="run";
	    	}
	    	velXState="idle";
	    	
		}else if(keyCode==RIGHT){
			luigi.setVelX(xSpeed*(1));
			luigiOrientation="right";
			luigiAddedSprites=spritesAdded;
			if (luigiAnimation!="run" && luigi.getVelY()==0){
	    		luigi.setFrameSequence(2+luigiAddedSprites,3+luigiAddedSprites,time*2,90);
	    		luigiAnimation="run";
	    	}
	    	if (luigi.getX()+luigi.getWidth()>=rightLuigi){
	    		stageSprite.setVelX(-xSpeed);
	    	}
	    	velXState="idle";
	    }
	    if(keyCode==UP){
	    	if (luigi.getVelY()==0 && luigi.getY()+luigi.getHeight()/2==bottomLuigi){
	    		luigi.setVelY(yJump);
	    		luigi.setFrameSequence(4+luigiAddedSprites,5+luigiAddedSprites,time*10,1);
	    		luigiAnimation="jump";
	    		jump.play();
	    	}
	    }
	}else{
		if(keyCode==LEFT &&page==3){
			textSize(20*5);
			text("left",width/2,height*5/8);
			textSize(10);
		}
		if(keyCode==RIGHT &&page==4){
			textSize(20*5);
			text("right",width/2,height*5/8);
			textSize(10);
		}
		if(keyCode==UP &&page==5){
			textSize(20*5);
			text("jump",width/2,height*5/8);
			textSize(10*5);
		}
	}
}
void keyReleased(){
	if (gameOn==true){
		if (luigiAnimation!="idle" && luigi.getVelY()==0 && luigi.getY()+luigi.getHeight()/2==bottomLuigi && luigiAnimation!="gameOver"){
			luigiAnimation="idle";
			luigi.setFrame(1+luigiAddedSprites);

		}
		if((keyCode==LEFT || keyCode==RIGHT)&&luigiAnimation!="gameOver"){
			// luigi.setVelX(0);
			// stageSprite.setVelX(0);
			if(keyCode==LEFT){
				velXState="lessLeft";
			}else if(keyCode==RIGHT){
				velXState="lessRight";
			}
		}
	}
	if(key==ENTER && page<10){
		page+=1;
	}else if (key==ENTER && page>=10 && gameOn==false && page<17 &&lives>=0){
		gameOn=true;
		heart.setDead(true);
		deadLuigi.setDead(true);
		start.stop();
		gameInit();
	}else if(key==ENTER&&(page==17||lives<0)&&gameOn==false){
		luigi.setDead(true);
		deadLuigi.setDead(true);
		stageSprite.setDead(true);
		glove.setDead(true);
		heart.setDead(true);
		myPort.stop();
		delay(1000);
		opacityToAdd=0;
		setup();
	}
}
void checkStuff(){
		if (gameOn==true&&luigiAnimation!="gameOver"){
		if (leftPressed==true){
			luigi.setVelX(xSpeed*(-1));
			luigiOrientation="left";
			luigiAddedSprites=0;
			if (luigiAnimation!="run" && luigi.getVelY()==0){
	    		luigi.setFrameSequence(2+luigiAddedSprites,3+luigiAddedSprites,time*2,90);
	    		luigiAnimation="run";
	    	}
	    	velXState="idle";
	    	
		}else if(jumpPressed==true){
			luigi.setVelX(xSpeed*(1));
			luigiOrientation="right";
			luigiAddedSprites=spritesAdded;
			if (luigiAnimation!="run" && luigi.getVelY()==0){
	    		luigi.setFrameSequence(2+luigiAddedSprites,3+luigiAddedSprites,time*2,90);
	    		println(luigi.getFrame());
	    		luigiAnimation="run";
	    	}
	    	if (luigi.getX()+luigi.getWidth()>=rightLuigi){
	    		stageSprite.setVelX(-xSpeed);
	    	}
	    	velXState="idle";
	    	
	    }
	    if(resetPressed==true){
	    	if (luigi.getVelY()==0 && luigi.getY()+luigi.getHeight()/2==bottomLuigi){
	    		luigi.setVelY(yJump);
	    		luigi.setFrameSequence(4+luigiAddedSprites,5+luigiAddedSprites,time*10,1);
	    		luigiAnimation="jump";
	    		jump.play();
	    	}
	    }
	}else{
		if(leftPressed==true &&page==3){
			textSize(20*5);
			text("left",width/2,height*5/8);
			textSize(10);
		}
		if(rightPressed==true &&page==4){
			textSize(20*5);
			text("right",width/2,height*5/8);
			textSize(10);
		}
		if(jumpPressed==true &&page==5){
			textSize(20*5);
			text("jump",width/2,height*5/8);
			textSize(10*5);
		}
	}
	if (gameOn==true){
		if (luigiAnimation!="idle" && luigi.getVelY()==0 && luigi.getY()+luigi.getHeight()/2==bottomLuigi && luigiAnimation!="gameOver" && (jumpRelease==true||leftRelease==true)){
			luigiAnimation="idle";
			luigi.setFrame(1+luigiAddedSprites);
		}
		if((leftRelease==true || jumpRelease==true)&&luigiAnimation!="gameOver"){
			// luigi.setVelX(0);
			// stageSprite.setVelX(0);
			if(jumpRelease==true){
				velXState="lessLeft";
			}else if(leftRelease==true){
				velXState="lessRight";
			}
		}
	}
	if(resetRelease==true && page<10){
		page+=1;
	}else if (resetRelease==true && page>=10 && gameOn==false && page<17&&lives>=0){
		gameOn=true;
		heart.setDead(true);
		deadLuigi.setDead(true);
		start.stop();
		gameInit();
	}else if(resetRelease==true&&(page==17||lives<0)&&gameOn==false){
		luigi.setDead(true);
		deadLuigi.setDead(true);
		stageSprite.setDead(true);
		glove.setDead(true);
		heart.setDead(true);
		myPort.stop();
		opacityToAdd=0;
		setup();
	}
}
void gravity(){
	if (((luigi.getY()+luigi.getHeight()/2==bottomLuigi) && luigi.getVelY()>0)||(luigi.getY()+luigi.getHeight()/2<bottomLuigi && luigi.getY()+luigi.getVelY()/15+luigi.getHeight()/2>bottomLuigi)){
		luigi.setVelY(0);
		luigi.setY(bottomLuigi-luigi.getHeight()/2);
		if (luigi.getVelX()==0){
			luigiAnimation="idle";
			luigi.setFrame(1+luigiAddedSprites);
		}else{
			luigiAnimation="run";
			luigi.setFrameSequence(2+luigiAddedSprites,3+luigiAddedSprites,time*10,90);
		}
	}else if(luigi.getY()+luigi.getHeight()/2!=bottomLuigi){
		luigi.setVelY(luigi.getVelY()+yGravity);
		//println(luigi.getVelY());
		if (luigiAnimation=="idle"||luigiAnimation=="run"){
			luigiAnimation="jump";
			luigi.setFrame(6+luigiAddedSprites);
		}
	}
	if (luigi.getX()+luigi.getWidth()>=rightLuigi && luigi.getVelX()>0){
		stageSprite.setVelX(-xSpeed);
	}
}
void decay(){
	page++;
	lives--;
	heart.setDead(false);
	deadLuigi.setDead(false);
	gameOn=false;
	athletic.stop();
	athleticPath=("athletic"+str(maxLives-lives)+".mp3");
	jumpPath=("jump"+str(maxLives-lives)+".mp3");
	gameOverPath=("gameOver"+str(maxLives-lives)+".mp3");
	bgPath=("bgHR"+str(maxLives-lives)+".png");
	amp-=0.1;
	rectOpacity=int(pow(2.3,float(maxLives-lives)));
	if(lives<1){
		athleticPath=blank;
		opacityDiff=100-rectOpacity;
		opacityToAdd=1;
	}
	if(lives<2){
		decayRate+=1;
		amp=0.1;
		jumpPath=blank;
		gameOverPath=blank;
	}
	//decayRate+=1;
	stageSprite.setDead(true);
	luigi.setDead(true);
	start.loop();
	heart.setXY(width*7/16,height*3/8);
	heart.setFrameSequence(0,1,time*10*3);
//	gameInit();
}
void update(){
	if (velXState=="lessRight" && luigiAnimation!="gameOver"){
		if (stageSprite.getVelX()!=0){
			stageSprite.setVelX(stageSprite.getVelX()+xSpeed/6);
			if (stageSprite.getVelX()>0){
				stageSprite.setVelX(0);
				luigi.setVelX(0);
				velXState="idle";
				if (luigi.getY()==bottomLuigi-luigi.getHeight()/2)
{				luigi.setFrame(1+luigiAddedSprites);
				luigiAnimation="idle";}
				else{
					luigi.setFrame(5+luigiAddedSprites);
					luigiAnimation="jump";
				}
			}
		}else if (luigi.getVelX()>0){
			luigi.setVelX(luigi.getVelX()-xSpeed/6);
			if (luigi.getVelX()<0){
				luigi.setVelX(0);
				velXState="idle";
								if (luigi.getY()==bottomLuigi-luigi.getHeight()/2)
{				luigi.setFrame(1+luigiAddedSprites);
				luigiAnimation="idle";}
				else{
					luigi.setFrame(5+luigiAddedSprites);
					luigiAnimation="jump";
				}
								if (luigi.getY()==bottomLuigi-luigi.getHeight()/2)
{				luigi.setFrame(1+luigiAddedSprites);
				luigiAnimation="idle";}
				else{
					luigi.setFrame(5+luigiAddedSprites);
					luigiAnimation="jump";
				}
			}
		}
		// if (luigi.getVelX()>0){
		// 	luigi.setVelX(luigi.getVelX()-xSpeed/10);
		// }
		// if (stageSprite.getVelX()>0){
		// 	stageSprite.setVelX(stageSprite.getVelX()-xSpeed/10);
		// }
		// if (luigi.getVelX()<=0 &&stageSprite.getVelX()==0){
		// 	luigi.setVelX(0);
		// 	velXState="idle";
		// }else if(stageSprite.getVelX()<0){
		// 	luigi.setVelX(0);
		// 	stageSprite.setVelX(0);
		// 	velXState="idle";
		// }
	}else if(velXState=="lessLeft" && luigiAnimation!="gameOver"){
		luigi.setVelX(luigi.getVelX()+xSpeed/6);
		stageSprite.setVelX(0);
		if (luigi.getVelX()>=0){
			luigi.setVelX(0);
			velXState="idle";
		}
	}
	background(bg);
	gravity();
	if (luigiAnimation!="gameOver"){
		checkGround();
		if (luigi.getY()>=height){
			gameOver();
		}
	}
	if (luigi.getVelY()==-1000){
		restoreVelY=true;
	}
	S4P.updateSprites(time/decayRate);
	if (restoreVelY==true){
		luigi.setVelY(-1000);
		restoreVelY=false;
	}
	S4P.drawSprites();
	if (stageSprite.getVelX()!=0){
		rectOpacity+=opacityToAdd;
	}
	fill(255);
	text("x"+str(lives),width*1/8,height*1/8);
	fill(0,rectOpacity);
	rect(0,0,width,height);
	if (luigi.getY()>int(height*1.3)){
		decay();
	}
}
void gameOver(){
	luigiAnimation="gameOver";
	luigi.setFrameSequence(7,8,time*10,90);
	luigi.setVelY(yJump);
	luigi.setVelX(0);
	stageSprite.setVelX(0);
	bottomLuigi=int(height*1.5);
	luigiDomain=new Domain(leftLuigi,topLuigi,rightLuigi,bottomLuigi);
	luigi.setDomain(luigiDomain,0);
	if (lives!=1){
	athletic.stop();
	}
	gameOver.play();
}
void checkGround(){
	bottomLuigi=0;
	for (int n=0;n<platforms.size();n++){
		bottomLuigi=platforms.get(n).ground(luigi.getX()+((5000*5/2)-stageSprite.getX()),luigi.getY()+luigi.getHeight()/2);
		if (bottomLuigi!=0){
			break;
		}
	}
	if (bottomLuigi==0){
		bottomLuigi=int(height*1.5);
	}
	luigiDomain=new Domain(leftLuigi,topLuigi,rightLuigi,bottomLuigi);
	luigi.setDomain(luigiDomain,0);
}
void stageBuilder(){
	platforms.clear();
	platforms.add(new Platform(0,143,128));
	platforms.add(new Platform(163,322,128));
	platforms.add(new Platform(358,421,128));
	platforms.add(new Platform(462,525,128));
	platforms.add(new Platform(563,626,108));
	platforms.add(new Platform(666,729,92));
	platforms.add(new Platform(766,798,92));
	platforms.add(new Platform(839,871,92));
	platforms.add(new Platform(921,953,92));
	platforms.add(new Platform(1036,1068,92));
	platforms.add(new Platform(1156,1188,92));
	platforms.add(new Platform(1289,1304,92));
	platforms.add(new Platform(1437,1452,92));
}