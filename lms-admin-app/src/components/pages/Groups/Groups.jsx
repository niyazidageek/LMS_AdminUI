import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from '../../elements/SpinnerComponent';
import { Container, Flex } from '@chakra-ui/layout';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Box
} from "@chakra-ui/react"

const Groups = () => {

    const url = process.env.REACT_APP_GET_GROUPS_BY_COUNT_API;
    const history = useHistory();
    const [data] = useFetch(url);

    function handleView(id) {
        let path = `/admin/groups/details/${id}`;
        history.push(path);
    }


    return (
        <Box>
            <Flex
                display='flex'
                direction='column'
                alignItems='center'
                pos='relative'
            >
                <SpinnerComponent />
                {
                    (data == {} || data !== null) ?
                        <Box
                            overflowX='auto'
                            width='100%'
                        >
                            <Table
                                variant="simple"
                                colorScheme='blackAlpha'
                            >
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Name</Th>
                                        <Th>Number of participants</Th>
                                        <Th>Subject</Th>
                                        <Th>Start date</Th>
                                        <Th>End date</Th>
                                        <Th>Edit</Th>
                                        <Th>Delete</Th>
                                        <Th>View</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        data.map((gr, index) => {
                                            const { id, appUsersCount, name, startDate, endDate, subject } = gr;
                                            return (
                                                <Tr key={index}>
                                                    <Th>{id}</Th>
                                                    <Td>{name}</Td>
                                                    <Td>{appUsersCount}</Td>
                                                    <Td>{subject.name}</Td>
                                                    <Td>{startDate}</Td>
                                                    <Td>{endDate}</Td>
                                                    <Td>
                                                        <Button colorScheme='yellow'>
                                                            Edit
                                                        </Button>
                                                    </Td>
                                                    <Td>
                                                        <Button colorScheme='pink'>
                                                            Delete
                                                        </Button>
                                                    </Td>
                                                    <Td>
                                                        <Button
                                                            colorScheme='telegram'
                                                            onClick={() => handleView(id)}
                                                        >
                                                            View
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>
                        </Box> : null
                }
            </Flex>
        </Box>
    );
}

export default Groups;
