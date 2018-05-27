#include <Servo.h>

Servo myservo1;
Servo myservo2;  

int fsensor = A0;

int pos = 0;    

void setup() {
  Serial.begin(9600);
  myservo1.attach(3);  
  myservo2.attach(5);
  pinMode(fsensor, INPUT);
}

void loop() {

  int fsensor_state = analogRead(fsensor);
 Serial.println(fsensor_state);
  if (fsensor_state >100){
  for (pos = 0; pos <= 150; pos += 5) { 
    // in steps of 1 degree
    myservo1.write(pos);              
    delay(15);                       
  }
  for (pos = 150; pos >= 0; pos -= 5) { 
    myservo1.write(pos);
                
    delay(15);                       
  }
  }}
