interface OrderRegister {
  productsIds: number[];
}

interface Order {
  id?: number;
  userId: number;
  productsIds: number[];
}

interface OrderReturned extends Order {
  id: number;
}

export { OrderRegister, Order, OrderReturned };
