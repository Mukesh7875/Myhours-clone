import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { PhoneIcon, QuestionOutlineIcon } from "@chakra-ui/icons";

import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddClient = () => {
  const navigate = useNavigate();
  const [Client, SetClient] = useState({});

  const handleChange = (e) => {
    SetClient({
      ...Client,
      [e.target.name]: e.target.value,
    });
  };
  const postData = (client) => {
    const token = localStorage.getItem("psc_app_token");
    console.log(token);
    return axios
      .post("https://myhours-api.onrender.com/client/create", client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        
        alert("Client added successfully");
      })
      .catch((err) => console.log("err",err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Client);
    postData(Client);
    navigate("/clients");
  };
  return (
    <Flex>
      <Box w="17%">
        <Sidebar />
      </Box>
      <Box w="40%" m="auto" textAlign={"start"} mt="3rem">
        <Heading fontWeight={"semibold"}>
          New client{" "}
          <QuestionOutlineIcon style={{ width: "16px", color: "#3b8fc2" }} />
        </Heading>
        <FormControl onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormLabel fontSize="12px" mt="1rem" color="gray.600">
            NAME
          </FormLabel>
          <Input
            onChange={handleChange}
            
            w="100%"
            variant="outline"
            name="name"
            placeholder='Name should be String'
          ></Input>
          <FormLabel fontSize="12px" mt="1rem" color="gray.600">
            CONTACT PERSON
          </FormLabel>
          <Input
            onChange={handleChange}
            w="100%"
            variant="outline"
            name="contact_person"
            placeholder='Contact should be String'
          ></Input>
          <FormLabel fontSize="12px" mt="1rem" color="gray.600">
            EMAIL
          </FormLabel>
          <Input
            type="email"
            onChange={handleChange}
            w="100%"
            variant="outline"
            name="email"
            placeholder='Email should be String'
          ></Input>
          <FormLabel fontSize="12px" mt="1rem" color="gray.600">
            PHONE
          </FormLabel>
          {/* <Input
            onChange={handleChange}
            w="100%"
            variant="outline"
            name="phone"
          ></Input> */}
          <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<PhoneIcon color='gray.300' />}
    />
    <Input type='tel' placeholder='Phone number' name="phone"   onChange={handleChange}/>
  </InputGroup>
          <FormLabel fontSize="12px" mt="1rem" color="gray.600">
            ADDRESS
          </FormLabel>
          <Textarea
            onChange={handleChange}
            size="lg"
            h="4rem"
            w="100%"
            name="address"
            placeholder='Adderss should be String'
          ></Textarea>
          <HStack spacing={1} justifyContent="space-betwee6">
            <Box w="46%">
              <FormLabel fontSize="12px" mt="1rem" color="gray.600">
                TAX NAME
              </FormLabel>
              <Input
                onChange={handleChange}
                w="100%"
                variant="outline"
                name="tax_name"
                placeholder='Tax Name should be String'
              ></Input>
            </Box>
            <Box w="46%">
              <FormLabel fontSize="12px" mt="1rem" color="gray.600">
                TAX PERCENTAGE
              </FormLabel>
              <Input
                type="number"
                onChange={handleChange}
                w="100%"
                variant="outline"
                name="tax_percentage"
                placeholder='Tax Percentage should be Number'
              ></Input>
            </Box>
          </HStack>
          <FormLabel fontSize="12px" mt="1rem" color="gray.600">
            TAX NUMBER
          </FormLabel>
          <Input
            onChange={handleChange}
            w="100%"
            variant="outline"
            name="tax_number"
            placeholder='Tax Number should be Number'
          ></Input>
          <Button
            fontSize={"lg"}
            fontWeight={400}
            href={"#"}
            _hover={{
              bg: "blue.800",
            }}
            bg={"blue.400"}
            color={"white"}
            align="center"
            mb={"3px"}
            mr={"1rem"}
            mt={"1rem"}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            fontSize={"lg"}
            fontWeight={400}
            href={"#"}
            _hover={{
              bg: "blue.100",
            }}
            bg={"blue.50"}
            color={"blue.800"}
            align="center"
            mb={"3px"}
            mt={"1rem"}
            onClick={() => navigate("/clients")}
          >
            Cancel
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default AddClient;
