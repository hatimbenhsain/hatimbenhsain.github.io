int distBlue=0;
float distCyan=0;
float distYellow=0;
float distPink=0;
float distRed=0;
float distGreen=0;
float[] distances={distBlue,distCyan,distYellow,distPink,distRed,distGreen};
int r1=0;
int r2=0;
int r3=0;
int r4=0;
int mouseIn=0;
int k=0;
int disX=0;
int disY=0;
int disRad=0;
String selectedColor="none";
String currentColor="none";
String[] colors={"blue","cyan","yellow","pink","red","green"};
PVector v1=new PVector(90,180);
PVector v2=new PVector(210,180);
PVector v3=new PVector(90,300);
PVector v4=new PVector(210,300);
PVector v5=new PVector(90,420);
PVector v6=new PVector(210,420);
PVector[] circles={v1,v2,v3,v4,v5,v6};

void setup(){
	size(1200,800);
	background(0,0,0);
	noStroke();
	fill(100,100,100);
	rect(0,0,300,800);
	fill(0,0,150);
	ellipse(90,200-20,80,80);
	fill(0,150,150);
	ellipse(210,200-20,80,80);
	fill(150,150,0);
	ellipse(90,320-20,80,80);
	fill(150,0,150);
	ellipse(210,320-20,80,80);
	fill(150,0,0);
	ellipse(90,440-20,80,80);
	fill(0,150,0);
	ellipse(210,440-20,80,80);
	noFill();
	stroke(200,200,200);
	strokeWeight(5);
	rect(80,540-20,110,80);
	arc(190,580-20,80,80,3*PI/2,5*PI/2);
	textSize(60);
	fill(200,200,200);
	text("clear",80,700-20);
}
void draw(){
	distBlue=int(dist(mouseX,mouseY,90,180));
	distCyan=int(dist(mouseX,mouseY,210,180));
	distYellow=int(dist(mouseX,mouseY,90,300));
	distPink=int(dist(mouseX,mouseY,210,300));
	distRed=int(dist(mouseX,mouseY,90,420));
	distGreen=int(dist(mouseX,mouseY,210,420));
	float[] distances={distBlue,distCyan,distYellow,distPink,distRed,distGreen};
		if (mouseX>300 && mousePressed){
		r1=int(random(150,255));
		r2=int(random(150,255));
		r3=int(random(0,150));
		r4=int(random(0,150));
		disX=int(random(-50,50));
		disY=int(random(-50,50));
		PVector mousePos=new PVector(mouseX,mouseY);
		PVector pmousePos=new PVector(pmouseX,pmouseY);
		int circleSize=int(mousePos.dist(pmousePos));
		if(currentColor=="none"){
			fill(0,0,0,90);
		}else if (currentColor=="blue"){
			fill(r3,r4,r1,95);
		} else if (currentColor=="cyan"){
			fill(r3,r1,r2,95);
		}  else if (currentColor=="yellow"){
			fill(r1,r2,r3,95);
		} else if (currentColor=="pink"){
			fill(r1,r3,r2,95);
		} else if (currentColor=="red"){
			fill(r1,r3,r4,95);
		}else if (currentColor=="green"){
			fill(r3,r1,r4,95);
		}else{
			fill(0,0,0,90);
		}
		noStroke();
		if (currentColor!="none"){
			ellipse(mouseX+disX,mouseY+disY,circleSize,circleSize);
		}else{
			ellipse(mouseX,mouseY,200,200);
		}
	}
	noStroke();
	fill(100,100,100);
	rect(0,0,300,800);
	fill(0,0,150);
	ellipse(90,200-20,80,80);
	fill(0,150,150);
	ellipse(210,200-20,80,80);
	fill(150,150,0);
	ellipse(90,320-20,80,80);
	fill(150,0,150);
	ellipse(210,320-20,80,80);
	fill(150,0,0);
	ellipse(90,440-20,80,80);
	fill(0,150,0);
	ellipse(210,440-20,80,80);
	noFill();
	stroke(200,200,200);
	strokeWeight(5);
	rect(80,540-20,110,80);
	arc(190,580-20,80,80,3*PI/2,5*PI/2);
	textSize(60);
	fill(200,200,200);
	text("clear",80,700-20);
	for (float d:distances){
		if (int(d)<40){
			selectedColor=colors[k];
			noFill();
			stroke(255,255,255);
			ellipse(circles[k].x,circles[k].y,90,90);
			if (mousePressed){
				currentColor=colors[k];
			}
		}
		if (currentColor==colors[k]){
			noFill();
			ellipse(circles[k].x,circles[k].y,90,90);
		}
		
		k+=1;
	}
	if (mouseX>80 && mouseY>520 && mouseX<190 && mouseY<600){
		stroke(255,255,255);
		noFill();
		rect(80,540-20,110,80);
		arc(190,580-20,80,80,3*PI/2,5*PI/2);
		if (mousePressed){
			currentColor="none";
		}
	} else if (mouseX>80 && mouseY>620 && mouseX<190 && mouseY<680){
		textSize(60);
		fill(255,255,255);
		text("clear",80,700-20);
		if (mousePressed){
			fill(0);
			noStroke();
			rect(300,0,1000,1000);
		}
	}
	if (currentColor=="none"){
		stroke(255,255,255);
		noFill();
		rect(80,540-20,110,80);
		arc(190,580-20,80,80,3*PI/2,5*PI/2);
	}
	k=0;
}