import { SimpleGrid } from "@chakra-ui/react";
import ProductCard, { Product } from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        // Make a GET request to the backend API endpoint
        const response = await axios.get("http://localhost:5000/api/products");
        const fetchedProducts: Product[] = response.data;
        console.log(fetchedProducts);

        // Update the component state with the retrieved products
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);
  console.log(products);
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px" margin="45px">
      {products.map((product) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
