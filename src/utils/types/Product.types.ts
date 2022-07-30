interface Product {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

interface ProductReturned extends Product {
  id: number,
}

export { Product, ProductReturned };
