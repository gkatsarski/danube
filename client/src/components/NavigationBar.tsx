import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {
  isAuthenticated: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate(`/`);
  };

  return (
    <Box marginX="40px">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            onClick={handleHomeClick}
          >
            Home
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isAuthenticated ? (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/login"}
              >
                Log in
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                href={"/register"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"25px"}
                variant={"link"}
                href={"/account"}
              >
                <AiOutlineUser />
              </Button>
              <Button
                as={"a"}
                fontSize={"25px"}
                variant={"link"}
                href={"/orders"}
              >
                <AiOutlineShoppingCart />
              </Button>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/"}
                onClick={() => {
                  localStorage.removeItem("jwtToken");
                  isAuthenticated = false;
                }}
              >
                Log out
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
