import amqplib from 'amqplib';

export async function rabbitConnection() {
    const queue = "orderCreated";
    try {
        const connection = await amqplib.connect("amqp://localhost");
        // const connection = await amqplib.connect("amqp://rabbitmq");
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        return channel;
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
    }
}
