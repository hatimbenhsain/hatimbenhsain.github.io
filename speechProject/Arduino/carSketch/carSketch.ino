#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include "arduino_secrets.h"

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID
char pass[] = SECRET_PASS;    // your network password

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "public.cloud.shiftr.io";
int        port     = 443;
const char topic[]  = "car_eyesOn";

bool eyesOn=false;
int lampPin1=3;
int lampPin2=5;

int lampIntensity=0;
int lightSpeed=1;

void setup() {

  pinMode(lampPin1, OUTPUT);
  pinMode(lampPin2, OUTPUT);

  //Initialize serial and wait for port to open:
  Serial.begin(9600);

  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  // set the message receive callback
  mqttClient.onMessage(onMqttMessage);

  Serial.print("Subscribing to topic: ");
  Serial.println(topic);
  Serial.println();

  // subscribe to a topic
  mqttClient.subscribe(topic);

  // topics can be unsubscribed using:
  // mqttClient.unsubscribe(topic);
}

void loop() {
  // call poll() regularly to allow the library to receive MQTT messages and
  // send MQTT keep alive which avoids being disconnected by the broker
  mqttClient.poll();

  analogWrite(lampPin1, lampIntensity);
  analogWrite(lampPin2, lampIntensity);

  if(eyesOn && lampIntensity<255){
    lampIntensity+=lightSpeed;
  }else if(!eyesOn && lampIntensity>0){
    lampIntensity-=lightSpeed;
  }

}

void onMqttMessage(int messageSize) {
  // we received a message, print out the topic and contents
  Serial.println("Received a message with topic '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");

  // use the Stream interface to print the contents
  char msg;
  while (mqttClient.available()) {
    msg=(char)mqttClient.read();
    if(msg=='0'){
      eyesOn=false;
      break;
    }else if(msg=='1'){
      eyesOn=true;
      break;
    }
  }

  Serial.println();
  Serial.println();
}
