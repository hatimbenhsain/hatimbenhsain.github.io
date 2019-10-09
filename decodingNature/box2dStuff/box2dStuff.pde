import shiffman.box2d.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.joints.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.collision.shapes.Shape;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;
import org.jbox2d.dynamics.contacts.*;
import java.util.Collections;

ArrayList<Loco> locos;
Surface surface;

Box2DProcessing box2d;
float rotAngle;
float angInc;
float t;

void setup(){
	noiseSeed(int(random(0,500)));
	size(640,360);
	box2d=new Box2DProcessing(this);
	box2d.createWorld();
	box2d.setGravity(0,-10);
	locos=new ArrayList<Loco>();
	angInc=0.01;
	surface=new Surface(angInc);
	rotAngle=0;
	t=0;
	box2d.listenForCollisions();
}

void draw(){
	background(255);
	pushMatrix();
	translate(width/2,height/2);
	rotate(rotAngle);
	surface.display();
	popMatrix();
	box2d.step();
	if(mousePressed){
		Loco p=new Loco(mouseX,mouseY);
		locos.add(p);
	}

	for(Loco b:locos){
		b.display();
	}
	colorMode(RGB,255);
	

	for(int i=locos.size()-1;i>=0;i--){
		Loco b=locos.get(i);
		if(b.done()){
			locos.remove(i);
		}
	}
}

void keyPressed(){
	if(keyCode==LEFT || key=='a'){
		rotAngle+=angInc;
		surface.rotate(true,rotAngle);
	}else if(keyCode==RIGHT || key=='d'){
		rotAngle-=angInc;
		surface.rotate(false,rotAngle);
	}else if(keyCode==ENTER){
		setup();
	}else if(key==' '){
		t+=0.5;
		for(int i=locos.size()-1;i>=0;i--){
			noiseSeed(i);
			locos.get(i).shake(t);
			locos.get(i).displayMouthEnabled(true);
		}
		if(frameCount%10==0){
			for(int i=locos.size()-1;i>0;i--){
				if(locos.get(i).contacts.size()>0){
					for(int j=locos.size()-1;j>0;j--){
						if(locos.get(j)==locos.get(i).contacts.get(0)){
							locos.add(new Loco(locos.get(i),locos.get(j)));
							locos.remove(i);
							locos.remove(j);
							Collections.shuffle(locos);
							break;
						}
					}
					break;
				}
			}
		}
	
	}
}

void keyReleased(){
	if(key==' '){
		for(Loco b:locos){
			b.displayMouthEnabled(false);
		}
	}
}

void beginContact(Contact cp){
	Fixture f1=cp.getFixtureA();
	Fixture f2=cp.getFixtureB();
	Body b1=f1.getBody();
	Body b2=f2.getBody();
	Object o1=b1.getUserData();
	Object o2=b2.getUserData();
	if(o1.getClass()==Loco.class && o2.getClass()==Loco.class){
		Loco l1=(Loco) o1;
		Loco l2=(Loco) o2;
		for(int i=l1.getContacts().size()-1;i>=0;i--){
			if(l1.getContacts().get(i)==l2){
				break;
			}
		}
		l1.contacts.add(l2);
		l2.contacts.add(l1);
	}
}

void endContact(Contact cp){
	Fixture f1=cp.getFixtureA();
	Fixture f2=cp.getFixtureB();
	Body b1=f1.getBody();
	Body b2=f2.getBody();
	Object o1=b1.getUserData();
	Object o2=b2.getUserData();

	if(o1.getClass()==Loco.class && o2.getClass()==Loco.class){
		Loco l1=(Loco) o1;
		Loco l2=(Loco) o2;
		for(int i=l1.getContacts().size()-1;i>=0;i--){
			if(l1.getContacts().get(i)==l2){
				l1.contacts.remove(i);
				break;
			}
		}for(int i=l2.getContacts().size()-1;i>=0;i--){
			if(l2.getContacts().get(i)==l1){
				l2.contacts.remove(i);
				break;
			}
		}
	}
}