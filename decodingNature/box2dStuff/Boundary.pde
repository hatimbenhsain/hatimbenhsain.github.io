
// class Boundary{
// 	Body body;
// 	float x,y;
// 	float w,h;

// 	Boundary(float x_, float y_){
// 		x=x_;
// 		y=y_;
// 		w=random(4,16);
// 		h=random(4,16);
// 		makeBody(new Vec2(x,y),w,h);

// 		BodyDef bd=new BodyDef();
// 		bd.type=BodyType.STATIC;
// 		bd.position.set(box2d.coordPixelsToWorld(x,y));
// 		body=box2d.createBody(bd);

// 		PolygonShape ps=new PolygonShape();
// 		float box2Dw=box2d.scalarPixelsToWorld(w/2);
// 		float box2Dh=box2d.scalarPixelsToWorld(h/2);
// 		ps.setAsBox(box2Dw,box2Dh);

// 		FixtureDef fd=new FixtureDef();
// 		fd.shape=ps;
// 		fd.density=1;
// 		fd.friction=0.3;
// 		fd.restitution=0.5;

// 		body.createFixture(fd);
// 	}

// 	void display(){
// 		fill(0);
// 		stroke(0);
// 		rectMode(CENTER);
// 		rect(x,y,w,h);
// 	}

// }