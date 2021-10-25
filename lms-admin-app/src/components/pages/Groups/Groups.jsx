import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from '../../elements/SpinnerComponent';
import { Container, Flex } from '@chakra-ui/layout';

const Groups = () => {

    const url = process.env.REACT_APP_GET_GROUPS_BY_COUNT_API;
    
    const data = useFetch(url);

    return (
        <>
            <Container> 
                <Flex 
                justifyContent='center'
                >
                <SpinnerComponent /> 
                
                </Flex>
            </Container>
        </>
    );
}

export default Groups;
