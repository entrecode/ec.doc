In Node.js projects you can use [ec.dm-cache](https://entrecode.github.io/ec.dm-cache/).

It is a tandem library to [ec.sdk](https://entrecode.github.io/ec.sdk/) to support powerful caching. 
You can use either in-memory or a redis cache to fetch Data Manager Entries really fast. The most powerful feature is automatic invalidation with [ec.amqp](https://github.com/entrecode/ec.amqp) to connect to the RabbitMQ Message Queue. This way, you get instant cache invalidations upon data changes.

