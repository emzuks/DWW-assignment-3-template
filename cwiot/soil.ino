#include "config.h"
#include "Adafruit_seesaw.h"

AdafruitIO_Feed *capacitive = io.feed("capacitive");

// set up the 'digital' feed

Adafruit_seesaw ss;

void setup() {
    Serial.begin(115200);
    Serial.print("Connecting to Adafruit IO");
    io.connect();

    Serial.println("seesaw Soil Sensor example!");
  // Wait for connection
    while (io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
    }
  if (!ss.begin(0x36)) {
    Serial.println("ERROR! seesaw not found");
    while(1) delay(1);
  } else {
    Serial.print("seesaw started! version: ");
    Serial.println(ss.getVersion(), HEX);
  }
}

void loop() {
    io.run();
    uint16_t capread = ss.touchRead(0);
    Serial.print("Capacitive: "); 
    Serial.println(capread);
    capacitive->save(capread);
    delay(2000);
}
