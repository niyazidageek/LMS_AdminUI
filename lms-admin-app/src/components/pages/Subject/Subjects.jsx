import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { Container, Flex } from "@chakra-ui/layout";
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
  Box,
} from "@chakra-ui/react";


import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";

import { getSubjectsAction } from "../../../actions/subjectActions";
import CreateSubjectModal from "./CreateSubjectModal";

const Subjects = () => {
  const history = useHistory();

  const isFetching = useSelector((state) => state.authReducer.isFetching);

  const subjects = useSelector((state) => state.subjectReducer.subjects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjectsAction());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }


  function handleEdit(id) {
    let path = `/admin/subjects/edit/${id}`;
    history.push(path);
  }

  return (
    <>
      <AuthMessageAlert />
      <AuthErrorAlert />
      <Box>
        <Flex
          display="flex"
          direction="column"
          alignItems="center"
          pos="relative"
        >
          {isFetching || !subjects ? (
            <SpinnerComponent />
          ) : (
            <Box overflowX="auto" width="100%">
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign='center'>Id</Th>
                    <Th textAlign='center'>Name</Th>
                    <Th textAlign='center'>Edit</Th>
                    <Th textAlign='center'>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subjects.map((sb, index) => {
                    const { id, name } = sb;
                    return (
                      <Tr key={index}>
                        <Th textAlign='center'>{id}</Th>
                        <Td textAlign='center'>{name}</Td>
                        <Td textAlign='center'>
                          <Button
                            colorScheme="yellow"
                            onClick={() => handleEdit(id)}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td textAlign='center'>
                          <Button 
                          colorScheme="pink">
                              Delete
                              </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                  <CreateSubjectModal
                    onClick={() => handleModal()}
                    value={isOpen}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
        {isFetching || !subjects ? null : (
          <Button
            colorScheme="whatsapp"
            onClick={() => handleModal()}
            pos="fixed"
            right="0"
            bottom="0"
            margin="1rem"
          >
            Create subject
          </Button>
        )}
      </Box>
    </>
  );
};

export default Subjects;