import React from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { useSelector } from 'react-redux';

const SpinnerComponent = React.memo(()=> {

    return (
        <>
        {
            <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            pos='absolute'
            />
        }
        
        </>
    );
}) 

export default SpinnerComponent;
