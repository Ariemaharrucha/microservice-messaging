import { Order } from "./model/order.schma";

const orderRepository = {
    getAllOrders: async () => {
        const orders = await Order.find();
        return orders;
    },

    createOrders: async (productName:string, price:number) => {
        const order = new Order({ productName, price });
        return order.save();
    }

}

export default orderRepository;