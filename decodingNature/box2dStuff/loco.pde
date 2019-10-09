
class Loco{
	Body body;
	float x,y;
	float w,h;
	int c;
	ArrayList<Loco> contacts;
	boolean mouthEnabled;

	Loco(float x_, float y_){
		x=x_;
		y=y_;
		mouthEnabled=false;
		w=random(4,16);
		h=random(4,16);
		contacts=new ArrayList<Loco>();
		makeBody(new Vec2(x,y),w,h);
		//color c=new color(random(0,100),70,80);
		//color darkC=new Color(hue(c),80,20);
		//randomSeed(frameCount);
		c=int(random(0,360));
		body.setUserData(this);
	}

	Loco(Loco l1,Loco l2){
		x=(l1.x+l2.x)/2;
		y=(l1.y+l2.y)/2;
		w=l1.w+l2.w;
		h=random(4,16);
		c=(l1.c+l2.c)/2;
		contacts=new ArrayList<Loco>();
		makeBody(new Vec2(x,y),w,h);
		l1.killBody();
		l2.killBody();
		body.setUserData(this);
	}

	void killBody(){
		box2d.destroyBody(body);
	}

	boolean done(){
		Vec2 pos=box2d.getBodyPixelCoord(body);
		if(pos.y>height+w*h){
			killBody();
			return true;
		}
		return false;
	}

	void display(){
		Vec2 pos=box2d.getBodyPixelCoord(body);
		float a=body.getAngle();
		pushMatrix();
		translate(pos.x,pos.y);
		rotate(-a);
		colorMode(HSB,360,100,100);
		fill(c,60,95);
		noStroke();
		ellipse(0,0,w*2,w*2);
		stroke(c,80,20);
		strokeWeight(2);
		fill(c,80,20);
		if(frameCount%30<20){
			ellipse(-3*w/8,-w/4,w/4,w/4);
			ellipse(3*w/8,-w/4,w/4,w/4);
		}else{
			line(-7*w/16,-w/4,-4*w/16,-w/4);
			line(7*w/16,-w/4,4*w/16,-w/4);
		}
		if(mouthEnabled){
			ellipse(0,3*w/8,3*w/8,w/4);
		}
		popMatrix();
	}

	void makeBody(Vec2 center, float w_, float h_){
		BodyDef bd=new BodyDef();
		bd.type=BodyType.DYNAMIC;
		bd.position.set(box2d.coordPixelsToWorld(x,y));

		body=box2d.createBody(bd);

		CircleShape cs=new CircleShape();
		cs.m_radius=box2d.scalarPixelsToWorld(w);

		FixtureDef fd=new FixtureDef();
		fd.shape=cs;
		fd.density=1;
		fd.friction=0.3;
		fd.restitution=0.5;

		body.createFixture(fd);
		body.setLinearVelocity(new Vec2(random(-5,5),random(2,5)));
		body.setAngularVelocity(random(-5,5));
	}

	void shake(float t){
		body.setLinearVelocity(new Vec2(map(noise(t),0,1,-5,5),map(noise(t),0,1,-5,5)));
		body.setAngularVelocity(map(noise(t),0,1,-1,1));
	}

	ArrayList<Loco> getContacts(){
		return contacts;
	}

	void displayMouthEnabled(boolean t){
		mouthEnabled=t;
	}

}