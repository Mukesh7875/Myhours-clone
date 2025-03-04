import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Input, Spacer, Table, TableContainer, Tbody,  Th, Thead, Tr } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { ArrowUpIcon, ExternalLinkIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Td } from '../Pricepage/style';
import axios from "axios";
import Sidebar from '../Application/Sidebar/Sidebar';

const Teamuser = () => {

   
    const [data, setData] = useState([]);

   

    const token = localStorage.getItem("psc_app_token")
    console.log(token)

    const getData = () => {
        fetch("https://myhours-api.onrender.com/teammember", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res)
                console.log(res)
            })
            .catch((err) => console.log("err", err))
    }


    
    const handleDelete = (id) => {
       
        axios.delete(`https://myhours-api.onrender.com/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((res) => {
            getData();
            
          })
          .catch((err) => console.error(err));
      };


    useEffect(() => {
        getData()
    }, [])
    if (!localStorage.getItem("psc_app_token")) {
        return <h1>Please login again...</h1>
    }

      return (
        <>
            <Box display='flex'>
            <Box w='17%'height='45rem' >
            <Sidebar/>
        </Box>
                <Box w='80%'>
                    <Box
                        w='100%'
                        display='flex'
                        // bg='green'
                        p='5'
                    >
                        <Box>
                            <Heading
                                as='h2' size='xl' mb="20px"
                            >Team members</Heading>
                            <Box display='flex'>
                                <Input type='text' placeholder='Search Team member name' />
                                <Button ml="10px"> 📜 STATUS</Button>
                            </Box>
                        </Box>
                        <Spacer />
                        <Button><Link to="/addmember">➕ New Team Member</Link></Button>
                    </Box>

                    <Box>
                        <TableContainer mt="5">
                            <Table size="md">
                                <Thead borderBottom="2px solid lightGray" fontSize="lg">
                                    <Tr>
                                        <Th fontWeight="500" fontSize="15">NAME <ArrowUpIcon boxSize="5" mb="1" /></Th>
                                        <Th fontWeight="500" fontSize="15">ACTIVITY</Th>
                                        <Th fontWeight="500" fontSize="15">EMAIL</Th>
                                        <Th fontWeight="500" fontSize="15" isNumeric>LABOR RATE</Th>
                                        <Th fontWeight="500" fontSize="15" isNumeric>BILLABLE RATE</Th>
                                        <Th fontWeight="500" fontSize="15">ROLE</Th>
                                        <Th fontWeight="500" fontSize="15">STATUS <ArrowUpIcon boxSize="5" mb="1" /></Th>
                                        <Th fontWeight="500" fontSize="15">ACTION</Th>
                                        <Th fontWeight="500" fontSize="15">DELECT</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data && data.map((el, index) => (
                                        <Tr key={index}>
                                            <Td fontSize="14">{el.name}</Td>
                                            <Td fontSize="14" cursor="pointer" color="blue" _hover={{ color: "darkBlue" }}>View Activity <ExternalLinkIcon mb="1" /> </Td>
                                            <Td fontSize="14">{el.email}</Td>
                                            <Td fontSize="14" isNumeric>{`₹ ${el.laborRate}.00`}</Td>
                                            <Td fontSize="14" isNumeric>{`₹ ${el.billableRate}.00`}</Td>
                                            <Td fontSize="14">{el.role}</Td>
                                            <Td fontSize="14">Active</Td>
                                            <Td fontSize="14" cursor="pointer" _hover={{ fontWeight: 500 }}><Link to={`/edit/${el._id}`}>Edit </Link><EditIcon mb="1" /></Td>
                                            <Td fontSize="14" cursor="pointer" _hover={{ fontWeight: 500 }}
                                            
                                            > <DeleteIcon onClick={()=>handleDelete(el._id)}/> </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>

        </>)
}
export default Teamuser