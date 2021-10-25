import React from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { useSelector } from 'react-redux';

const SpinnerComponent = React.memo(()=> {

    const isFetching = useSelector(state => state.authReducer.isFetching);

    return (
        <>
        {
            isFetching ? 
            <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            /> : null
        }
        </>
    );
}) 

export default SpinnerComponent;
