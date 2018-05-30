#include <Servo.h>

Servo hand;
int servoPin=5;

int buttonPin=13;
int rPin=9;
int gPin=10;
int soundPin=11;
int times=0;
int freq=0;
int tiltPin=7;
int k=0;

int triggered=0;
int currentAngle=0;
int maxAngle=90;
int currentR=255;
int currentG=0;
int beep=600;
int beepDuration=500;

int advL=currentR/maxAngle;

int button=0;


void setup() {
  pinMode(buttonPin,INPUT_PULLUP);
  pinMode(rPin,OUTPUT);
  pinMode(gPin,OUTPUT);
  pinMode(soundPin,OUTPUT);
  pinMode(tiltPin,INPUT_PULLUP);
  analogWrite(gPin,0);
  analogWrite(rPin,255);
  Serial.begin(9600);
  hand.attach(servoPin);
  hand.write(20);
}
void loop() {
  button=digitalRead(buttonPin);
  Serial.println(button);
  if (digitalRead(tiltPin)==HIGH){
    Serial.println('ok');
    triggered=0;
    analogWrite(rPin,255);
    analogWrite(gPin,0);
    currentG=255;
    currentR=0;
    hand.write(20);
    currentAngle=20;
    beep=600;
    beepDuration=500;
    k=0;
    times=0;
    
  }
  else if ((button==LOW)&&(triggered==0)){
    if (currentAngle==20){
      tone(soundPin,beep,beepDuration);
      Serial.println('hum');
    }
    Serial.println(button);
    analogWrite(gPin,255);
    analogWrite(rPin,0);
    currentR=0;
    currentG=255;
    if (currentAngle==20){
       times+=1;
    }
    currentAngle=20;
    hand.write(30);
    currentAngle=30;
    if (times==3){
      hand.write(110);
      currentAngle=110;
    }
    triggered=0;
  }else if((button==HIGH)&&(triggered==0)){
    hand.write(20);
    analogWrite(gPin,0);
    currentAngle=20;
    analogWrite(rPin,255);
    if (times==3){
      triggered=1;
    }
  }
  else if((button==HIGH)&&(triggered==1)){
    analogWrite(gPin,0);
    analogWrite(rPin,255);
    goCrazy();
  }else if((button==LOW)&&(triggered==1)){
    triggered=0;
    analogWrite(gPin,255);
    analogWrite(rPin,0);
    currentR=0;
    currentG=255;
    hand.write(110);
    currentAngle=110;
    beep=600;
    beepDuration=500;
    k=0;
  }
}

void goCrazy(){
  if (k!=7){
  hand.write(110-k*10);
  currentAngle=110-k*10;
  tone(soundPin,beep,beepDuration);
  delay(1000*(8-k)/16);
  if (k!=7){
    beepDuration=500*(8-k)/8;
    beep=600+k*20;
    k+=1;
  }
  hand.write(20+k*10);
  delay(1000*(8-k-1)/16);
  }
  else{
  tone(soundPin,beep,beepDuration);
  hand.write(110);
  delay(100);
  hand.write(60);
  tone(soundPin,beep,beepDuration);
  delay(200);
  }
}
