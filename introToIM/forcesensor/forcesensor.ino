int forcePin = A0;
int flexPin1 = A1;
int flexPin2 = A2;
int flexPin3 = A3;
String forceStrength;
String index1;
String middle1;
String index2;
String data[4] = {"0","0","0","0",}; 
void setup() {
  pinMode(forcePin,INPUT);
  pinMode(flexPin1,INPUT);
  pinMode(flexPin2,INPUT);
  pinMode(flexPin3,INPUT);
  Serial.begin(9600);
  
  // put your setup code here, to run once:

}

void loop() {
  forceStrength = String(analogRead(forcePin));
  index1 = String(analogRead(flexPin1));
  middle1 = String(analogRead(flexPin2));
  index2 = String(analogRead(flexPin3));
  data[0] = forceStrength;
  data[1] = index1;
  data[2] = middle1;
  data[3] = index2;
  String myMessage = String(data[0,1,2,3,4]);
  myMessage = data[0]+"#"+data[1]+"#"+data[2]+"#"+data[3];
  Serial.println(myMessage);
  // put your main code here, to run repeatedly:

}
