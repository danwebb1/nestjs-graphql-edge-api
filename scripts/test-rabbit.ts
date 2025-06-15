import amqp from 'amqplib';

(async () => {
  try {
    const conn = await amqp.connect('amqp://guest:guest@localhost:5672');
    console.log('✅ Connected to RabbitMQ!');
    await conn.close();
  } catch (err) {
    console.error('❌ Failed to connect:', err.message);
  }
})();