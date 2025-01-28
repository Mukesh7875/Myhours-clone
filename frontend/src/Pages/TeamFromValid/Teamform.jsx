import React, { useState } from 'react'
import {
    AccordionPanel,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Accordion,
    InputGroup,
    InputLeftAddon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Textarea,
   
    Flex,
    Select,
} from '@chakra-ui/react';



import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import Sidebar from '../Application/Sidebar/Sidebar';

const Teamform = () => {
    const navigate = useNavigate();
    const [member, SetMember] = useState({});

    const handleChange = (e) => {

        SetMember({
            ...member,
            [e.target.name]: e.target.value,

        });

        console.log("ANS", e.target.value);
    };
    console.log("member", member);

    const postData = (member) => {
        const token = localStorage.getItem("psc_app_token");
        console.log(token);
        return axios
            .post("https://myhours-api.onrender.com/teammember/create", member, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((r) => {
                console.log(r.data);
                alert("Member added successfully");
            })
            .catch((err) => console.log("err", err));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(member);
        postData(member);
        navigate("/teams");
    };
    return (
        <Flex>
            <Box w="17%">
                <Sidebar />
            </Box>
            <Box w="40%" m="auto" textAlign={"start"} mt="3rem">
                <Heading fontWeight={"semibold"}>
                    Add Team member{" "}
                    <QuestionOutlineIcon style={{ width: "16px", color: "#3b8fc2" }} />
                </Heading>
                <FormControl onSubmit={handleSubmit} pb={20} style={{ width: "100%" }}>

                    <FormLabel fontSize="12px" mt="1rem" color="gray.600">
                        NAME
                    </FormLabel>
                    <Input
                        onChange={handleChange}
                        w="100%"
                        variant="outline"
                        name="name"
                    ></Input>

                    <FormLabel fontSize="12px" mt="1rem" color="gray.600">
                        EMAIL
                    </FormLabel>
                    <Input
                        onChange={handleChange}
                        type="email"
                        w="100%"
                        variant="outline"
                        name="email"
                    ></Input>

                    <FormLabel fontSize="12px" mt="1rem" color="gray.600">
                        NOTE
                    </FormLabel>
                    <Textarea
                        onChange={handleChange}
                        size="lg"
                        h="4rem"
                        w="100%"
                        name="note"
                    ></Textarea>

                    <FormLabel fontSize="12px" mt="1rem" color="gray.600">
                        ROLE
                    </FormLabel>
                    <Select name='role' onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="normal">Normal</option>
                    </Select>

                    <Accordion defaultIndex={[0]} allowMultiple mt="30">
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box
                                        flex="1"
                                        textAlign="left"
                                        fontWeight="500"
                                        color="gray.500"
                                        fontSize="xl"
                                    >
                                        Labour Rate
                                        <AccordionIcon />
                                    </Box>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Enter default hourly rate for the team member to calculate Labor
                                cost. This rate can be further specified on individual projects.

                                <InputGroup mt="5">
                                    <InputLeftAddon h="9" mt='0' children="INR" />
                                    <Input
                                        onChange={handleChange}
                                        w="100%"
                                        variant="outline"
                                        size="2xl"
                                        type="number"
                                        placeholder="   Enter laber rate here"
                                        name="laborRate"
                                    />
                                </InputGroup>
                            </AccordionPanel>


                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box
                                        flex="1"
                                        textAlign="left"
                                        fontWeight="500"
                                        color="gray.500"
                                        fontSize="xl"
                                    >
                                        Billable Rate
                                        <AccordionIcon />
                                    </Box>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Enter default billable rate for the team member to calculate
                                Billable cost. This rate can be further specified on individual
                                projects.

                                <InputGroup mt="5">
                                    <InputLeftAddon h="9" mt='0' children="INR" />
                                    <Input
                                        onChange={handleChange}
                                        w="100%"
                                        variant="outline"
                                        size="2xl"
                                        type="number"
                                        placeholder="Enter billing rate here"
                                        name="billableRate"
                                    />
                                </InputGroup>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>



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
        </Flex >
    )
}

export default Teamform