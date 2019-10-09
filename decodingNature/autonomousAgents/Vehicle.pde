// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Vehicle {

  // All the usual stuff
  PVector position;
  PVector velocity;
  PVector acceleration;
  float r;
  float maxforce;    // Maximum steering force
  float maxspeed;    // Maximum speed

    // Constructor initialize all values
  Vehicle(float x, float y) {
    position = new PVector(x, y);
    r = 12;
    maxspeed = 3;
    maxforce = 0.2;
    acceleration = new PVector(0, 0);
    velocity = new PVector(0, 0);
  }

  void applyForce(PVector force) {
    // We could add mass here if we want A = F / M
    acceleration.add(force);
  }
  

  // Method to update position
  void update() {
    // Update velocity
    velocity.add(acceleration);
    // Limit speed
    velocity.limit(maxspeed);
    position.add(velocity);
    // Reset accelertion to 0 each cycle
    acceleration.mult(0);
  }

  void display() {
    fill(175);
    stroke(0);
    pushMatrix();
    translate(position.x, position.y);
    ellipse(0, 0, r, r);
    popMatrix();
  }

}