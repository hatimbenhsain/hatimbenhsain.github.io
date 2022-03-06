#include <ArduinoBLE.h>

BLEService ledService("19B10010-E8F2-537E-4F6C-D104768A1214");
BLEByteCharacteristic ledCharacteristic("19B10011-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

bool eyesOn=false;
int lampPin1=3;
int lampPin2=5;

int lampIntensity=0;
int lightSpeed=1;

void setup() {

  pinMode(lampPin1, OUTPUT);
  pinMode(lampPin2, OUTPUT);

  Serial.begin(9600);

  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1);
  }

  BLE.setLocalName("ButtonLED");

  BLE.setAdvertisedService(ledService);

  ledService.addCharacteristic(ledCharacteristic);

  BLE.addService(ledService);

  ledCharacteristic.writeValue(0);

  BLE.advertise();
  Serial.println("Bluetooth device active, waiting for connections...");

}

void loop() {
  BLE.poll();

  if (ledCharacteristic.written()) {
    // update LED, either central has written to characteristic or button state has changed
    if (ledCharacteristic.value()) {
      Serial.println("LED on");
      digitalWrite(lampPin1, HIGH);
      digitalWrite(lampPin2, HIGH);
    } else {
      Serial.println("LED off");
      digitalWrite(lampPin1, LOW);
      digitalWrite(lampPin2, LOW);
    }
  }

}
