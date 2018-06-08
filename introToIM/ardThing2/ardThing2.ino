int lightPin=A0;

void setup(){
  pinMode(lightPin,INPUT);
  Serial.begin(9600);
}
void loop(){
  Serial.println(analogRead(lightPin));
}

