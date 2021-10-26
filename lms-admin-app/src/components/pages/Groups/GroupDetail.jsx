import React, { useEffect } from 'react';
import { useParams } from 'react-router';
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
} from '@chakra-ui/react';
import { useFetch } from '../../../hooks/useFetch';
import { useHistory } from 'react-router';
import { Flex, Text } from '@chakra-ui/layout';
import SpinnerComponent from '../../elements/SpinnerComponent';

const GroupDetail = () => {
    let { id } = useParams();
    let history = useHistory();
    const url = process.env.REACT_APP_GET_GROUP_BY_ID_API + id;
    const [data] = useFetch(url);
    let startDate;
    let endDate;
    if (data !== null) {
        startDate = Date.parse(data.startDate);
        endDate = Date.parse(data.endDate);
        let startDateString = new Date(startDate)
        let endDateString = new Date(endDate)
        startDate = startDateString.toDateString();
        endDate = endDateString.toDateString();
    }

    console.log(data);

    return (
        <>
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
                                display='flex'
                                alignSelf='flex-start'
                                width='100%'
                                flexFlow='column'
                            >
                                <Box
                                    boxShadow='lg'
                                    borderRadius='xl'
                                    width='100%'
                                    height='100%'
                                    padding='12'
                                >
                                    <Text
                                        fontSize='3xl'
                                        fontWeight='bold'
                                        fontStyle='normal'
                                    >
                                        Group : {data.id}
                                    </Text>

                                    <Text
                                        paddingTop='5'
                                        fontSize='2xl'
                                        fontWeight='semibold'
                                        fontStyle='normal'
                                    >
                                        Subject : {data.subject.name}
                                    </Text>

                                   {
                                       data.teacher ? (
                                            <Text
                                            paddingTop='5'
                                            fontSize='2xl'
                                            fontWeight='semibold'
                                            fontStyle='normal'
                                            >
                                            Teacher : {data.teacher.name} {data.teacher.surname}
                                            </Text>
                                       ):(
                                            <Text
                                            paddingTop='5'
                                            fontSize='2xl'
                                            fontWeight='semibold'
                                            fontStyle='normal'
                                            >
                                            Teacher : no teacher
                                            </Text>
                                       )
                                   }

                                    <Text
                                        paddingTop='5'
                                        fontSize='2xl'
                                        fontWeight='semibold'
                                        fontStyle='normal'
                                    >
                                        Number of students : {data.appUsersCount}
                                    </Text>

                                    <Text
                                        paddingTop='5'
                                        fontSize='2xl'
                                        fontWeight='semibold'
                                        fontStyle='normal'
                                    >
                                        Start date : {startDate}
                                    </Text>

                                    <Text
                                        paddingTop='5'
                                        fontSize='2xl'
                                        fontWeight='semibold'
                                        fontStyle='normal'
                                    >
                                        End date : {endDate}
                                    </Text>
                                </Box>

                                <Box
                                    boxShadow='lg'
                                    borderRadius='xl'
                                    width='100%'
                                    height='100%'
                                    padding='12'
                                    overflowX='auto'
                                    width='100%'   
                                    display='flex'
                                    flexFlow='column'
                                    justifyContent='center'
                                >
                                    <Text
                                        fontSize='3xl'
                                        fontWeight='bold'
                                        fontStyle='normal'
                                        paddingBottom='10'
                                    >
                                        Students list
                                    </Text>
                                    <Table
                                            variant="simple"
                                            colorScheme='blackAlpha'
                                        >
                                            <Thead>
                                                <Tr>
                                                    <Th>Name</Th>
                                                    <Th>Surname</Th>
                                                    <Th>Username</Th>
                                                    <Th>Email</Th>
                                                    <Th>Roles</Th>
                                                    <Th>Details</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {
                                                    data.appUsers.map((user, index)=>{
                                                     const {id,email, name, surname, username,roles} = user;
                                                       return(
                                                        <Tr key='index'>
                                                            <Td>{name}</Td>
                                                            <Td>{surname}</Td>
                                                            <Td>{username}</Td>
                                                            <Td>{email}</Td>
                                                            <Td>
                                                                {
                                                                    roles.map(role=>{
                                                                        return(
                                                                            <span>
                                                                                {role}
                                                                            </span>
                                                                        )
                                                                    })
                                                                }
                                                            </Td>
                                                            <Td>
                                                                <Button
                                                                colorScheme='twitter'
                                                                >
                                                                    Details
                                                                </Button>
                                                            </Td>
                                                        </Tr>
                                                       )
                                                    })
                                                }
                                            </Tbody>
                                        </Table>
                                </Box>
                            </Box>
                            : null
                    }
                </Flex>
            </Box>
            {/* <Button
            onClick={()=>history.goBack()}
            colorScheme='twitter'
            variant='outline' 
            pos='absolute'
            top='3%'
            >
                Go back
            </Button> */}
        </>
    )
}











export default GroupDetail;
