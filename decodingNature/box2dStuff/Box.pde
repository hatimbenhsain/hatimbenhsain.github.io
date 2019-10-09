
class Box{
	Body body;
	float x,y;
	float w,h;

	Box(float x_, float y_){
		x=x_;
		y=y_;
		w=random(4,16);
		h=random(4,16);
		makeBody(new Vec2(x,y),w,h);
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
		fill(127);
		stroke(0);
		strokeWeight(2);
		rectMode(CENTER);
		rect(0,0,w,h);
		popMatrix();
	}

	void makeBody(Vec2 center, float w_, float h_){
		BodyDef bd=new BodyDef();
		bd.type=BodyType.DYNAMIC;
		bd.position.set(box2d.coordPixelsToWorld(x,y));

		body=box2d.createBody(bd);

		PolygonShape ps=new PolygonShape();
		float box2Dw=box2d.scalarPixelsToWorld(w/2);
		float box2Dh=box2d.scalarPixelsToWorld(h/2);
		ps.setAsBox(box2Dw,box2Dh);

		FixtureDef fd=new FixtureDef();
		fd.shape=ps;
		fd.density=1;
		fd.friction=0.3;
		fd.restitution=0.5;

		body.createFixture(fd);
		body.setLinearVelocity(new Vec2(random(-5,5),random(2,5)));
		body.setAngularVelocity(random(-5,5));
	}

}