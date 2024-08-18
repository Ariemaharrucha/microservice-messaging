import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import orderRepository from './repository/orders.repository';
import { rabbitConnection } from './utils/rabbitmq';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', async (_,res)=>{
    const orders = await orderRepository.getAllOrders();
    return res.json({orders})
});

app.post('/', async (req, res) => {
  const {productName, price} = req.body;
  const order = await orderRepository.createOrders(productName, price);

  const queue = "orderCreated";
  const channel = await rabbitConnection();

  const data = {
    type: "newOrder",
    payload: {
      id: order._id,
      productName: order.productName,
      price: order.price
    }
  };

  channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

  console.log(`Sent order notification to queue ${queue}`);
  return res.json({order})
})

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(8010, () => console.log("Orders Services Listening on port 8010"));