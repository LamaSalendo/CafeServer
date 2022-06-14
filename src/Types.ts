interface Order {
  amount: number;
  categoryID: string;
  currency: string;
  id: string;
  image: string;
  name: string;
  price: number;
}
enum Error {
  userNotFound = "User not found",
}
export { Order, Error };
