import { model, Schema } from "mongoose";

const OrdersSchema = new Schema({ 
    productName: String,
    price: Number,
});

export const Order = model('Orders', OrdersSchema)