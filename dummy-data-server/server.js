const mqtt = require("mqtt");
const client = mqtt.connect("mqtts://zaa3d633.ala.asia-southeast1.emqxsl.com", {
  port: 8883,
  username: "senne",
  password: "Broker123!",
  protocolVersion: 5,
});

client.on("connect", () => {
  console.log("Connected & listening to topic presence");

  client.subscribe("presence", err => {
    if (!err) {
      client.publish("presence", "Script server online");
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`${topic}:`, message.toString());
});

function randomPublish() {
  setInterval(() => {
    const num = Math.round(Math.random() * 120).toString();

    let status = {
      temperature: num,
      speed: Math.round(Math.random() * 200).toString(),
      load: Math.round(Math.random() * 100).toString(),
    };

    client.publish("example/car/temperature", num);
    client.publish("example/car/status", JSON.stringify(status));
    console.log("Random:", num);
  }, 2000);
}

function speedPublish() {
  let s = 0;
  let countup = false;
  setInterval(() => {
    if (countup) s += 5;
    if (!countup) s -= 5;

    if (s >= 200) countup = false;
    if (s <= 0) countup = true;

    client.publish("example/car/speed", s.toString());
    console.log("Speed:", s.toString());
  }, 1000);
}

function boxPublish() {
  let counter = 0;

  setInterval(() => {
    counter++;

    let box = {
      id: counter,
      weight: Math.round(Math.random() * 10000),
      approved: Math.random() > 0.5,
    };

    client.publish("example/conveyorbelt/box", counter.toString());
    client.publish("example/conveyorbelt/boxData", JSON.stringify(box));
    console.log("Box:", counter);
  }, 2000);
}

randomPublish();
speedPublish();
boxPublish();
