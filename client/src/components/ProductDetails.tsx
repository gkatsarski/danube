import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { Product } from "./ProductCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

interface Review {
  _id: string;
  username: string;
  productId: string;
  content: string;
}

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [reviews, setReviews] = useState<Review[]>();
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        // Make a GET request to the backend API endpoint
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        const fetchedProduct: Product = response.data;
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const getReviews = async () => {
      try {
        console.log("abc");
        const reviewResponse = await axios.get(
          `http://localhost:5000/api/products/${productId}/reviews`
        );
        const fetchedReviews: Review[] = reviewResponse.data;
        setReviews(fetchedReviews);
        console.log(fetchedReviews);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getReviews();
    getProduct();
  }, []);

  const handleAddNewReview = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/reviews`,
        {
          userId: "64a211b08cff85d71ef7894a",
          username: "georgi8081",
          productId: productId,
          content: newReview,
        }
      );
      console.log("Response data: ", response.data);
      setReviews([...reviews!, response.data]);
    } catch (error: any) {
      console.error(`Error: Could not add reivew: ${error}`);
    }
  };
  return (
    <Container maxW={"7xl"} marginY="150px">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={product?.imageUrl || noImage}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product?.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {product?.price} BGN
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              {/* <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text> */}
              <Text fontSize={"lg"}>{product?.description}</Text>
            </VStack>
            {/* <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box> */}
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Brand
                  </Text>
                  {"  "}
                  {product?.brand}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Model
                  </Text>{" "}
                  {product?.model}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Processor
                  </Text>{" "}
                  {product?.cpu}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Graphics Card
                  </Text>{" "}
                  {product?.gpu}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    RAM
                  </Text>{" "}
                  {product?.ram}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Storage
                  </Text>{" "}
                  {product?.storage}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Operating System
                  </Text>{" "}
                  {product?.os}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Weight
                  </Text>{" "}
                  {product?.weight} kg
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Stack paddingTop={{ base: "15px", sm: "30px", lg: "50px" }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "1xl", sm: "2xl", lg: "3xl" }}
        >
          Reviews ({reviews?.length})
        </Heading>
        <Box mt={4}>
          {reviews?.map((r) => (
            <Box
              marginY={"30px"}
              key={r._id}
              borderWidth="1px"
              borderRadius={"4px"}
              p={2}
              mt={2}
              backgroundColor={"grey"}
            >
              <Text padding={"5px"} fontWeight={600} fontSize={"xl"}>
                {r.username}:
              </Text>
              <Text padding={"5px"} fontSize={"2xl"}>
                {r.content}
              </Text>
            </Box>
          ))}
        </Box>
      </Stack>
      <Stack>
        <FormControl id="name">
          <FormLabel>Add review</FormLabel>
          <Textarea
            value={newReview}
            borderColor="gray.300"
            _hover={{
              borderRadius: "gray.300",
            }}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewReview(e.target.value)
            }
            placeholder="Enter review here"
          />
        </FormControl>
        <FormControl id="name" float="right">
          <Button
            variant="solid"
            bg="#0D74FF"
            color="white"
            _hover={{}}
            onClick={handleAddNewReview}
          >
            Add Review
          </Button>
        </FormControl>
      </Stack>
    </Container>
  );
}
export default ProductDetails;
