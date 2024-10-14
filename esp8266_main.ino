String receivedData;

void setup() {
  Serial.begin(115200);
  Serial.println("ESP8266 đã sẵn sàng nhận dữ liệu...");
}

void loop() {
  while (Serial.available()) {
    char c = Serial.read();
    receivedData += c;

    if (c == '\n') {
      processReceivedData(receivedData);
      receivedData = "";
    }
  }
}

void processReceivedData(String data) {
  if (data.startsWith("BPM:")) {
    int bpm = data.substring(4).toInt();
    Serial.print("Nhận được BPM: ");
    Serial.println(bpm);
  }
  else if (data.startsWith("Humidity:")) {
    float humidity = data.substring(9).toFloat();
    Serial.print("Nhận được Humidity: ");
    Serial.println(humidity);
  }
  else if (data.startsWith("TemperatureDHT:")) {
    float temperatureDHT = data.substring(15).toFloat();
    Serial.print("Nhận được Nhiệt độ DHT: ");
    Serial.println(temperatureDHT);
  }
  else if (data.startsWith("TemperatureLM35:")) {
    float temperatureLM35 = data.substring(16).toFloat();
    Serial.print("Nhận được Nhiệt độ LM35: ");
    Serial.println(temperatureLM35);
  }
}
