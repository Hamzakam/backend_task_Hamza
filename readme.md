# What is MQTT Protocol?

MQTT is a publish-subscribe machine-to-machine protocol designed for low bandwidth networks.
There are three entities:

1.  Broker: This is a server which acts as medium between publishers and subcribers in the MQTT protocol.
2.  Publishers: The publisher waits for information and when information is recieved, it sends it to the topic on a broker which provides it to the subscribed subscribers.
3.  Subscriber: The subscribers subscribes to topics on the broker and when information is recieved, broker gives this information to the subscriber.

# Scripts

There is only one script right now to run on dev:

- Running the server on dev:
  `npm run dev`

# Some info

I tested the provided broker, mongo instance and redis server and none of them worked.
I setup my own except for the broker which is from http://www.emqx.io/.
Config provided in the docs is in .env.example and my personal config is in .env.

# API

There is only one endpoint.
`/fetchAllTasks`
This will return a JSON array of format:
`[ { "task":"sometask" } ] `
