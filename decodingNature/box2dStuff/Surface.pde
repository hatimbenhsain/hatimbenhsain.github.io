class Surface{
	ArrayList<Vec2> surface;
	float rotAngle;
	Vec2[] vertices;
	ChainShape chain;
	RevoluteJoint joint;
	Body body;
	Body center;

	Surface(float incAng){
		surface= new ArrayList<Vec2>();
		int x=-width;
		int y=0;
		float t=0;
		ChainShape centChain;

		surface.add(new Vec2(-width,height*8));

		for(int i=width*4/2;i>=-width;i-=10){
			t+=0.05;
			y=int(map(noise(t),0,1,0,height));
			surface.add(new Vec2(x,y));
			x+=10;
		}

		surface.add(new Vec2(width,height*8));
		chain=new ChainShape();
		vertices=new Vec2[surface.size()];

		for(int i=0;i<vertices.length;i++){
			vertices[i]=box2d.coordPixelsToWorld(surface.get(i));
		}

		chain.createChain(vertices,vertices.length);
		BodyDef bd=new BodyDef();
		bd.type=BodyType.KINEMATIC;
		bd.fixedRotation=false;
		body=box2d.world.createBody(bd);
		body.createFixture(chain,1);
		
		body.setUserData(this);
	}

	void display(){
		rotAngle+=0.01;
		fill(0);
		stroke(0);
		strokeWeight(1);
		beginShape();
		for(Vec2 v: surface){
			vertex(v.x-width/2,v.y-height/2);
		}
		vertex(width,height);
		vertex(0,height);
		endShape(CLOSE);
	}

	void rotate(boolean way,float rAngle){

		body.destroyFixture(body.getFixtureList());
		vertices=new Vec2[surface.size()];
		chain=new ChainShape();
		PVector centVec=new PVector(width/2,height/2);
		for(int i=0;i<vertices.length;i++){
			PVector tempVec=new PVector(surface.get(i).x,surface.get(i).y);
			PVector oprimea=PVector.sub(tempVec,centVec);
			PVector goal=tempVec.sub(oprimea).add(oprimea.rotate(rAngle));
			Vec2 newVec=new Vec2(tempVec.x,tempVec.y);

			vertices[i]=box2d.coordPixelsToWorld(newVec);
		}
		chain.createChain(vertices,vertices.length);
		body.createFixture(chain,1);
		body.setUserData(this);
	}
}

