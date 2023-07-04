import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Button,
  Text,
  Heading,
  Container,
  Image,
  HStack,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

interface Token {
  userId: string;
  username: string;
  iat: number;
  exp: number;
}

interface Order {
  _id: string;
  userId: string;
  productId: string;
  productImageUrl: string;
  productName: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const token = localStorage.getItem("jwtToken");
  const decoded: Token | undefined = jwt_decode(token!);
  useEffect(() => {
    const getOrders = async () => {
      try {
        // Make a GET request to the backend API endpoint
        const response = await axios.get(
          `http://localhost:5000/api/users/${decoded!.userId}/orders`
        );
        const fetchedOrders = response.data;

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    };
    getOrders();
  }, []);

  return (
    <Container maxW={"7xl"} marginY="150px">
      <Stack paddingTop={{ base: "15px", sm: "30px", lg: "50px" }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "1xl", sm: "2xl", lg: "3xl" }}
        >
          Orders ({orders.length})
        </Heading>

        <Box mt={4}>
          {orders?.map((order) => (
            <Box
              marginY={"30px"}
              key={order._id}
              borderWidth="1px"
              borderRadius={"4px"}
              p={2}
              mt={2}
              backgroundColor={"grey"}
            >
              <HStack paddingX="20px" spacing="50px" align="center">
                <Image src={order.productImageUrl} boxSize="100px"></Image>
                <Text
                  padding={"5px"}
                  fontWeight={600}
                  fontSize={{ base: "12px", lg: "18px" }}
                >
                  {order.productName}
                </Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default Orders;
