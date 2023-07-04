import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  address: string;
}
interface Token {
  userId: string;
  iat: number;
  exp: number;
}

const EditAccount = () => {
  const token = localStorage.getItem("jwtToken");
  const decoded: Token | undefined = jwt_decode(token!);

  const [user, setUser] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    address: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Make a GET request to the backend API endpoint
        const response = await axios.get(
          `http://localhost:5000/api/users/${decoded!.userId}`
        );
        const fetchedUser: User = response.data;
        console.log(fetchedUser);

        // Update the component state with the retrieved products
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUserInfo();
  }, []);
  const handleEditAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (user.password !== confirmPassword) {
        console.log("user.password:", user.password);
        throw new Error("Passwords don't match");
      }
      const response = await axios.put(
        `http://localhost:5000/api/users/${decoded!.userId}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          password: user.password,
          address: user.address,
        }
      );
      setConfirmPassword("");
      console.log(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(error.response.data);
        }
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <>
                  <Box>
                    <FormControl id="first-name-edit">
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        value={user?.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="last-name-edit">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        value={user.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                      />
                    </FormControl>
                  </Box>
                </>
              </HStack>
              <FormControl id="username-edit">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={user.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="email-edit">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={user.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="password-edit">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={user.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="confirm-password-edit">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="address-edit">
                <FormLabel>Address</FormLabel>
                <Textarea
                  value={user.address}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link> */}
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleEditAccount}
                >
                  Edit Account
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default EditAccount;
