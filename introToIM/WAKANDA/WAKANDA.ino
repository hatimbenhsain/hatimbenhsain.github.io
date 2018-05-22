int ledPin=13;

void setup() {
  pinMode(ledPin,OUTPUT);
  digitalWrite(ledPin,HIGH);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(ledPin,HIGH);
  delay(100);
  digitalWrite(ledPin,LOW);
  delay(200);
  digitalWrite(ledPin,HIGH);
  delay(100);
  digitalWrite(ledPin,LOW);
  delay(200);
  digitalWrite(ledPin,HIGH);
  delay(200);
  digitalWrite(ledPin,LOW);
  delay(100);
  digitalWrite(ledPin,HIGH);
  delay(200);
}
