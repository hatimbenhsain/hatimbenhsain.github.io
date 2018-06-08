import processing.serial.*;

PVector origin;
color earth=color(0,150,0);
color sky=color(0,0,255);
color clouds=color(255,255,255);
int cloudThickness=10;
int earthD=1500;
int altitude=100;
float angle=0.0;


color col0=color(100,210,250);
color col1=color(30,80,145);
color col2=color(240,210,90);
color col3=color(160,66,14);
color col4=color(0,0,0);
color col5=color(70,70,100);
color col6=color(250,140,150);
color col7=color(205,240,215);
color[] mainColors={col0,col1,col2,col3,col4,col5,col6,col7};
color[] main1={col0,col1,col2,col3,col4};
color[] main2={col4,col5,col6,col7,col0};
color[] deep1={col0};
color[] deep2={col4};
int k=0;
float rDif=0;
float gDif=0;
float bDif=0;
int cloudMin=10;
int cloudMax=1500;
int cloud1Alt=int(random(0,cloudMax));
int cloud2Alt=int(random(0,cloudMax));
int cloud3Alt=int(random(0,cloudMax));
int cloud4Alt=int(random(0,cloudMax));
int cloud5Alt=int(random(0,cloudMax));
int cloud6Alt=int(random(0,cloudMax));
int cloud7Alt=int(random(0,cloudMax));
int cloud8Alt=int(random(0,cloudMax));
int cloud9Alt=int(random(0,cloudMax));
float cloud1Ang=random(0,2*PI);
float cloud2Ang=random(0,2*PI);
float cloud3Ang=random(0,2*PI);
float cloud4Ang=random(0,2*PI);
float cloud5Ang=random(0,2*PI);
float cloud6Ang=random(0,2*PI);
float cloud7Ang=random(0,2*PI);
float cloud8Ang=random(0,2*PI);
float cloud9Ang=random(0,2*PI);
float cloud1Length=random(0,PI);
float cloud2Length=random(0,PI);
float cloud3Length=random(0,PI);
float cloud4Length=random(0,PI);
float cloud5Length=random(0,PI);
float cloud6Length=random(0,PI);
float cloud7Length=random(0,PI);
float cloud8Length=random(0,PI);
float cloud9Length=random(0,PI);

int x=0;
int frames=0;
boolean day=false;
Serial port;
String portName;
int portNum=0;
int brightness;
int position;
int prevPos;
int finalX;
boolean going=false;
boolean going2=false;

void setup(){
	size(600,800);
	origin= new PVector (width/2,height+height*3/4);
	k=0;
	for(int k=0;k<main1.length-1;k++){
		rDif=(red(main1[k])-red(main1[k+1]))/200;
		gDif=(green(main1[k])-green(main1[k+1]))/200;
		bDif=(blue(main1[k])-blue(main1[k+1]))/200;
		for (int i=0;i<200;i++){
			deep1=append(deep1,color(red(main1[k])-rDif*i,green(main1[k])-gDif*i,blue(main1[k])-bDif*i));
		}
	}
	for(int k=0;k<main2.length-1;k++){
		rDif=(red(main2[k])-red(main2[k+1]))/200;
		gDif=(green(main2[k])-green(main2[k+1]))/200;
		bDif=(blue(main2[k])-blue(main2[k+1]))/200;
		for (int i=0;i<200;i++){
			deep2=append(deep2,color(red(main2[k])-rDif*i,green(main2[k])-gDif*i,blue(main2[k])-bDif*i));
		}
	}	background(sky);
	fill(earth);
	noStroke();
	ellipse(origin.x,origin.y,earthD,earthD);
	noFill();
	stroke(clouds);
	cloudThickness=(cloudMax-cloudMin)/50;
	strokeWeight(cloudThickness);
	arc(origin.x,origin.y,earthD+altitude,earthD+altitude,7*PI/4,2*PI);
	ellipse(origin.x,origin.y,earthD+1400,earthD+1400);
	x=600;
	for (int k=10;k<=cloudMax;k+=cloudThickness){
		stroke(deep1[x]);
		ellipse(origin.x,origin.y,earthD+cloudMax-k,earthD+cloudMax-k);
		x+=1;
	}
	println(Serial.list());
	portName=Serial.list()[portNum];
	port=new Serial(this,portName,9600);
}
void draw(){
	if (going==false&&port.available()>0){
		if(port.readStringUntil('\n')!=null){
			try{
				brightness=int(port.readStringUntil('\n').trim());
				position=4-int(map(brightness,0,1024,0,4)+0.5);
				println(position);
				if (position!=prevPos && going==false){
					going=true;
					going2=true;
					frames=int(map(prevPos,0,4,0,deep1.length));
					x=frames;
				}
			}catch(NullPointerException e){

			}
		}
	}
	if (going==true){
		go(prevPos,position);
	}
	for (int k=10;k<=cloudMax;k+=cloudThickness){
			if(x+1>=deep1.length){
				x=0;

			}
			if (day==false){
				stroke(deep1[x]);
			}else{
				stroke(deep2[x]);
			}
			ellipse(origin.x,origin.y,earthD+cloudMax-k,earthD+cloudMax-k);
			x+=1;
	}
	stroke(255);
	arc(origin.x,origin.y,earthD+cloud1Alt,earthD+cloud1Alt,cloud1Ang+angle,cloud1Ang+angle+cloud1Length);
	arc(origin.x,origin.y,earthD+cloud2Alt,earthD+cloud2Alt,cloud2Ang+angle,cloud2Ang+angle+cloud2Length);
	arc(origin.x,origin.y,earthD+cloud3Alt,earthD+cloud3Alt,cloud3Ang+angle,cloud3Ang+angle+cloud3Length);
	arc(origin.x,origin.y,earthD+cloud4Alt,earthD+cloud4Alt,cloud4Ang+angle,cloud4Ang+angle+cloud4Length);
	arc(origin.x,origin.y,earthD+cloud5Alt,earthD+cloud5Alt,cloud5Ang+angle,cloud5Ang+angle+cloud5Length);
	arc(origin.x,origin.y,earthD+cloud6Alt,earthD+cloud6Alt,cloud6Ang+angle,cloud6Ang+angle+cloud6Length);
	arc(origin.x,origin.y,earthD+cloud7Alt,earthD+cloud7Alt,cloud7Ang+angle,cloud7Ang+angle+cloud7Length);
	arc(origin.x,origin.y,earthD+cloud8Alt,earthD+cloud8Alt,cloud8Ang+angle,cloud8Ang+angle+cloud8Length);
	arc(origin.x,origin.y,earthD+cloud9Alt,earthD+cloud9Alt,cloud9Ang+angle,cloud9Ang+angle+cloud9Length);
	x=frames;
}
void day(int prev,int now, boolean continuing){
	finalX=int(map(now,0,4,0,deep1.length-100));
	if(frames+5<finalX){
		frames+=5;
	}else if (continuing==false){
		going=false;
		prevPos=position;
		frames=finalX;
	}else if(continuing==true){
		prevPos=0;
		frames=0;
		x=0;
		if (day==false){
			day=true;
		}else{
		day=false;
		}
	}
	angle+=0.5;
}
// void day(int prev, int now){
// 	x=int(map(prev,0,4,0,deep1.length));
// 	finalX=int(map(now,0,4,0,deep1.length));
// 	frames=x;
// 	while(true){
// 		for (int k=10;k<=cloudMax;k+=cloudThickness){
// 			if(x+5>=deep1.length){
// 				x=0;
// 				if (day==false){
// 					day=true;
// 				}else{
// 					day=false;
// 				}
// 			}
// 			if (day==false){
// 				stroke(deep1[x]);
// 			}else{
// 				stroke(deep2[x]);
// 			}
// 			ellipse(origin.x,origin.y,earthD+cloudMax-k,earthD+cloudMax-k);
// 			x+=1;
// 		}
// 		println(x);
// 		frames+=1;
// 		x=frames;
// 		if(x>finalX){
// 			break;
// 		}
// 	}
// }
void go(int prev,int now){
	if (now>prev){
		day(prev,now,false);
	}
	else if(prev>now){
		day(prev,4,true);
	}
}