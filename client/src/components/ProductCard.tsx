import { Badge, Card, CardBody, Heading, Image, Link } from "@chakra-ui/react";
import { AspectRatioBox } from "@chakra-ui/core";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import { useNavigate } from "react-router-dom";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  imageUrl: string;
  brand: string;
  model: string;
  weight: string;
  os: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  reviews: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleProductClick = (productId: String) => {
    navigate(`/products/${productId}`);
  };
  return (
    <Link key={product._id} onClick={() => handleProductClick(product._id)}>
      <Card>
        <AspectRatioBox ratio={4 / 3}>
          <Image
            src={product.imageUrl || noImage}
            borderTopLeftRadius="4px"
            borderTopRightRadius="4px"
          ></Image>
        </AspectRatioBox>
        <CardBody>
          <Heading fontSize="2xl">{product.name}</Heading>
          <Badge fontSize="2xl" paddingX={3} marginY={3} borderRadius="4px">
            {product.price}
          </Badge>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
