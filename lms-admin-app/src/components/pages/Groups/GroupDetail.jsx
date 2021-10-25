import React from 'react';
import { useParams } from 'react-router';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';

const GroupDetail = () => {
    let { id } = useParams();
    let history = useHistory();
    return (
        <div>
            group detail {id}
            <Button
            onClick={()=>history.goBack()}
            colorScheme='twitter'
            variant='outline' 
            >
                Go back
            </Button>
        </div>
    );
}

export default GroupDetail;
