interface OrderRegister {
  productsIds: number[];
}

interface Order {
  id?: number;
  userId: number;
}

interface OrderReturned extends Order {
  id: number;
  productsIds: number[];
}

export { OrderRegister, Order, OrderReturned };
