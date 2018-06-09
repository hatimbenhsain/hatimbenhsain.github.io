import processing.sound.*;

import sprites.*;
import sprites.maths.*;
import sprites.utils.*;

PImage bimg;
PImage mask;

int charge=10;
int difficulty=1;
float handSpeed=0;
float handRot=(PI/4)/frameRate;
float bulletSpeed=-10/frameRate;
float kirbySpeed=-10/frameRate;
float kirbyFrequency=log(10);
float randomNum=0;
float kirbyAngle=0;
float animationSpeed=120/frameRate;
int time=1;
int i;
int k;
boolean spacePressed=false;
boolean kirbyCollision=false;
int speedCoef=1;
boolean gameOver=false;
int highScore=0;
int score=0;
int x;
int pressS=0;

Sprite hand;
ArrayList<Sprite> kirbies=new ArrayList<Sprite>();
ArrayList<Sprite> bullets=new ArrayList<Sprite>();
ArrayList<Sprite> recharges=new ArrayList<Sprite>();
Sprite tempBul;

SoundFile gourmet;
SoundFile explosion;
SoundFile bullet;
SoundFile death;

File hsOldText;
File hsNewText;
PrintWriter newHS;

PFont font;


void setup(){
	size(400,400);
	bimg=loadImage("space.png");
	mask=loadImage("mask.png");
	hand=new Sprite(this,"hand.png",6,1,50);
	hand.setXY(width/2,height/2);
	hand.setDead(false);
	gourmet= new SoundFile(this,"gourmet.mp3");
	explosion=new SoundFile(this,"explosion.wav");
	bullet=new SoundFile(this,"bullet.wav");
	death=new SoundFile(this,"death.wav");
	font=createFont("8bitoperator.ttf",50);
	textFont(font);
	gourmet.loop();
	highScore=int(loadStrings("highScore.txt")[0]);
	hsOldText=new File("highScore.txt");
	hsOldText.delete();
	hsNewText=new File("highScore.txt");
	for (int x=0;x<charge;x++){
		charges(x);
	}
}
void mouseClicked(){
	hand.setFrameSequence(0,4,animationSpeed*0.2,1);
	if (charge>0){
		bullet.play();
		bullets.add(new Sprite(this,"bullet.png",3,1,52));
		bullets.get(i).setRot(handSpeed);
		bullets.get(i).setXY(width/2+cos(PI+handSpeed)*hand.getWidth(),height/2+sin(PI+handSpeed)*hand.getWidth());
		bullets.get(i).setSpeed(bulletSpeed);
		bullets.get(i).setFrameSequence(0,2,animationSpeed);
		bullets.get(i).setCollisionRadius(bullets.get(i).getCollisionRadius());
		i++;
		charge--;
		recharges.get(charge).setDead(true);
	}
}
void addKirbies(){
	randomNum=random(0,frameRate);
	if(randomNum<kirbyFrequency*0.2){
		kirbies.add(new Sprite(this,"kirby.png",1,11,51));
		kirbyAngle=random(0,2*PI);
		kirbies.get(k).setRot(kirbyAngle);
		kirbies.get(k).setXY((width*0.5*1.5*(1+cos(kirbyAngle)))-width*1.5*0.2,(width*0.5*1.5*(1+sin(kirbyAngle)))-width*1.5*0.2);
		kirbies.get(k).setFrameSequence(0,7,animationSpeed);
		kirbies.get(k).setSpeed(kirbySpeed);
		kirbies.get(k).setDead(false);
		kirbies.get(k).setCollisionRadius(kirbies.get(k).getCollisionRadius());
		for (int x=0;x<kirbies.size()-1;x++){
			if (kirbies.get(x).isDead()==false && kirbies.get(x).cc_collision(kirbies.get(k))){
				kirbyCollision=true;
			}
		}
		if (kirbyCollision==false){
			k++;
		}else{
			kirbyCollision=false;
			kirbies.remove(k);
		}
	}
}
void charges(int n){
	recharges.add(new Sprite(this,"bullet.png",3,1,52));
	recharges.get(n).setScale(0.8);
	recharges.get(n).setRot(HALF_PI);
	recharges.get(n).setXY(n*recharges.get(i).getWidth()+width*3/40,(width*3/40));
	recharges.get(n).setFrameSequence(0,2,animationSpeed);
}
void checkCollisions(){
	for (int x=0;x<kirbies.size();x++){
		for (int y=0;y<bullets.size();y++){
			if (kirbies.get(x).getFrame()<8 && kirbies.get(x).cc_collision(bullets.get(y))){
				explosion.play();
				kirbies.get(x).setFrameSequence(8,10,animationSpeed,1);
				kirbies.get(x).setSpeed(0);
				for (int o=0;o<speedCoef*2;o++){
					charge++;
					charges(charge-2);
				}
			}
		}
		if (kirbies.get(x).isDead()==false && kirbies.get(x).cc_collision(hand)){
			gourmet.stop();
			death.play();
			hand.setFrame(5);
			handSpeed-=handRot*speedCoef;
			hand.draw();
			gameOver=true;
			if (score>highScore){
				println(highScore);
				highScore=score;
			}
			newHS=createWriter("highScore.txt");
			newHS.println(highScore);
			newHS.flush();
			newHS.close();
		}
	}
}
void checkDeadKirbies(){
	for(int x=0;x<kirbies.size();x++){
		if (kirbies.get(x).getFrame()==8 && kirbies.get(x).isDead()==false){
			kirbies.get(x).setDead(true);
			score++;
			kirbyFrequency=log(10+score);
		}
	}
}
void keyPressed(){
	if (key=='s' || key=='S'){
		speedCoef=2;
	}
}
void keyReleased(){
	if (key=='s' || key=='S'){
		speedCoef=1;
	}
}
void draw(){
	if (gameOver==false){
		background(bimg);
		addKirbies();
		checkDeadKirbies();
		checkCollisions();
		handSpeed+=(handRot*speedCoef);
		hand.setRot(handSpeed);
		S4P.updateSprites(time);
		S4P.drawSprites();
		image(mask,0+width/2,0+height/2,width,height);
		for(int x=0;x<charge;x++){
			recharges.get(x).draw();
		}
		fill(255);
		stroke(255);
		if (score>=10){
			text(score,width*35/40,height*38/40);
		}else{
			text(score,width*35/40,height*38/40);
		}
		if (frameCount%32>15 && pressS<5*16){
			textSize(14);
			text("press S for speed",width*12/40,height*37/40);
			textSize(50);
			pressS++;
		}
		if (gameOver==true){
			fill(0,90);
			rect(0,0,width,height);
			fill(255);
			stroke(255);
			text("high score",width*2.5/40,height*15/40);
			if (highScore>=10){
				text(highScore,width*18/40,height*29/40);
			}else{
				text(highScore,width*18/40,height*29/40);
			}
			hand.draw();
		}
	}
}
