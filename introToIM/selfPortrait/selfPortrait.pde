//eliminating the 6 makes the height and width smaller for some reason 

int cHeight=6*height*2/3;
int cWidth=cHeight*23/32;
Grid grid=new Grid(23,32);
color skin=color(255, 232, 193);
color black=color(0,0,0);
color hair=color(48, 30, 15);
color shirt=color(67,144,79);
color white=color(255,255,255);
color shoes=color(95,67,143);
int ran=0;
int col=0;

void setup(){
	size(600,600);
	noStroke();

}
void draw(){
	background(255,255,255);
		coloring(4,18,4,19,skin); //face
	coloring(7,8,11+3,13+3,black);	//eyes
	coloring(14,15,11+3,13+3,black);
	coloring(5,10,10+3,10+3,black);	//glasses
	coloring(5,10,14+3,14+3,black);
	coloring(4,4,11+3,13+3,black);
	coloring(11,11,11+3,13+3,black);
	coloring(12,17,10+3,10+3,black);	//glasses
	coloring(12,17,14+3,14+3,black);
	coloring(18,18,11+3,13+3,black);
	coloring(6,6,19,19,black);	//face contours
	coloring(16,16,19,19,black);
	coloring(7,15,20,20,black);
	coloring(3,5,18,18,black);	//ears
	coloring(2,2,15,17,black);
	coloring(17,19,18,18,black);
	coloring(20,20,15,17,black);
	coloring(2,4,4,14,hair);	//hair
	coloring(2,20,4,11,hair);
	coloring(18,20,4,14,hair);
	coloring(2,2,0,0,hair);
	coloring(7,7,0,0,hair);
	coloring(11,12,0,0,hair);
	coloring(15,15,0,0,hair);
	coloring(6,7,1,5,hair);
	coloring(10,13,1,5,hair);
	coloring(1,1,1,1,hair);
	coloring(15,15,1,5,hair);
	coloring(17,17,1,5,hair);
	coloring(19,19,1,5,hair);
	coloring(22,22,1,1,hair);
	coloring(2,3,2,2,hair);
	coloring(6,20,2,5,hair);
	coloring(1,4,3,3,hair);
	coloring(21,22,3,3,hair);
	coloring(1,1,4,4,hair);
	coloring(4,5,4,4,hair);
	coloring(0,1,5,5,hair);
	coloring(2,5,5,5,hair);
	noColoring(1,1,5,5);
	noColoring(1,2,6,7);
	coloring(22,22,6,7,hair);
	coloring(21,21,4,8,hair);
	coloring(1,1,8,15,hair);
	coloring(0,0,12,12,hair);
	coloring(21,21,10,10,hair);
	coloring(21,21,12,16,hair);
	coloring(22,22,13,13,hair);
	coloring(6,7,12,12,hair);
	coloring(9,10,11,11,hair);
	coloring(16,18,12,12,hair);
	coloring(10,12,17,17,hair);
	coloring(3,3,15,17,skin);	//ears
	coloring(19,19,15,17,skin);
	noColoring(4,5,19,19);
	noColoring(17,18,19,19);
	coloring(7,15,21,25,shirt); //shirt
	coloring(4,6,20,24,shirt);
	coloring(16,18,20,24,shirt);
	coloring(5,5,20,20,black); //contours
	coloring(17,17,20,20,black);
	coloring(4,4,21,22,black);
	coloring(3,3,23,24,black);
	coloring(18,18,21,22,black);
	coloring(19,19,23,24,black);
	coloring(2,2,24,26,black);
	coloring(20,20,24,26,black);
	coloring(2,4,26,26,black);
	coloring(18,20,26,26,black);
	coloring(4,5,25,25,black);
	coloring(17,18,25,25,black);
	coloring(6,6,22,27,black);
	coloring(16,16,22,27,black);
	coloring(6,16,26,28,black);
	coloring(6,10,29,29,black);
	coloring(12,16,29,29,black);
	coloring(5,5,30,30,black);
	coloring(9,9,30,30,black);
	coloring(13,13,30,30,black);
	coloring(17,17,30,30,black);
	coloring(5,8,31,31,black);
	coloring(14,17,31,31,black);
	coloring(11,11,21,25,white);
	coloring(7,8,30,30,shoes); //shoes
	coloring(14,15,30,30,shoes);
	noColoring(4,4,20,20); //erasing
	noColoring(18,18,20,20);
	coloring(3,3,25,25,skin); //hands
	coloring(19,19,25,25,skin);
	grid.update();
}

class Grid{
	int x;
	int y;
	int[] xs={};
	int[] ys={};
	int wx=0;
	int hy=0;
	int h=cHeight;
	int w=0;
	ArrayList<ArrayList<selfPortrait.Pixel>> blocks=new ArrayList<ArrayList<selfPortrait.Pixel>>();
	Grid(int x, int y){
		this.wx=x;
		this.hy=y;
		this.xs=xs;
		this.ys=ys;
		this.h=h;
		w=cWidth;
		this.w=w;
		this.blocks=blocks;
		for (int i=0;i<this.hy;i+=1){
			//eliminating the 6* makes the height and width smaller for some reason 

			this.ys=append(this.ys,((height*6-this.h)/2)+((i*this.h)/this.hy));
		}
		for (int i=0;i<this.wx;i+=1){
			this.xs=append(this.xs,((width*6-this.w)/2)+((i*this.w)/this.wx));
		}
		for (int a:this.xs){
			ArrayList<selfPortrait.Pixel> placeHolder=new ArrayList<selfPortrait.Pixel>();
			for (int b:this.ys){
				selfPortrait.Pixel pixel=new selfPortrait.Pixel(a,b,this.w,this.wx,this.h,this.hy);
				placeHolder.add(pixel);
			}
			blocks.add(placeHolder);
		}
	}
	void update(){
		for (ArrayList<selfPortrait.Pixel> k:this.blocks){
			for (selfPortrait.Pixel p:k){
				p.update();
			}

		}
	}
}
class Pixel{
	int x=0;
	int y=0;
	int w=0;
	int h=0;
	int gW;
	int gWx;
	int gH;
	int gHy;
	int no=0;
	color c=color(255,255,255);
	Pixel(int x,int y,int gW,int gWx,int gH,int gHy){
		this.x=x;
		this.y=y;
		this.w=gW/gWx;
		this.h=gH/gHy;
		this.c=c;
		this.no=no;
	}
	void coloring(color c){
		this.c=c;
	}
	void noColoring(){
		this.no=1;
	}
	void update(){
		if (this.no==0){
			fill(c);
		}else{
			noFill();
		}
		rect(this.x,this.y,this.w,this.h);
	}
}

void coloring(int x1,int x2, int y1, int y2,color c){
	for (ArrayList<selfPortrait.Pixel> k:grid.blocks){
		for (selfPortrait.Pixel p:k){
			if (col>=x1&&col<=x2&&ran<=y2&&ran>=y1){
				p.coloring(c);
			}
			ran+=1;
		}
		ran=0;
		col+=1;
	}
	col=0;
}
void noColoring(int x1,int x2, int y1, int y2){
	for (ArrayList<selfPortrait.Pixel> k:grid.blocks){
		for (selfPortrait.Pixel p:k){
			if (col>=x1&&col<=x2&&ran<=y2&&ran>=y1){
				p.noColoring();
			}
			ran+=1;
		}
		ran=0;
		col+=1;
	}
	col=0;
}
void mousePressed(){
	if (shirt==color(67,144,79)){
		shirt=color(49,57,174);
		shoes=color(238,255,91);
	}else if (shirt==color(49,57,174)){
		shirt=color(67,144,79);
		shoes=color(95,67,143);
	}
}