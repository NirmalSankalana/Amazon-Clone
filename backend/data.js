import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
const data = {
  users: [
    {
      name: "R.A.N. Sankalana",
      email: "sankalana.nirmal@gmail.com",
      password: bcrypt.hashSync("azOLe@123", salt),
      isAdmin: true,
    },
    {
      name: "Menaka",
      email: "menakasampath97@gmail.com",
      password: bcrypt.hashSync("SuckMe@123", salt),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "2",
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 250,
      countInStock: 0,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      // _id: "3",
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 25,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      // _id: "4",
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
  ],
};
export default data;
