int pressurePin=A0;
int rPin=9;
int gPin=10;
int bPin=11;
int r=255;
int g=255;
int b=255;
int r1=0;
int g1=0;
int b1=0;
int pressure=0;
int rT=0;
int bT=0;
int gT=0;
int currentR=0;
int currentG=0;
int currentB=0;

void setup() {
  pinMode(pressurePin,INPUT);
  pinMode(rPin, OUTPUT);
  pinMode(bPin, OUTPUT);
  pinMode(gPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  pressure=analogRead(pressurePin);
  if(pressure>300){
  Serial.println(pressure);
  currentG=g1;
  currentB=b1;
  currentR=r1;
  r=rand()%255;
  b=rand()%255;
  g=rand()%255;

  analogWrite(bPin,b);
  analogWrite(rPin,r);
  analogWrite(gPin,g);
}
}
