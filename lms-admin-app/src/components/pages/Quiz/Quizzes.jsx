import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { Container, Flex } from "@chakra-ui/layout";
import { dateHelper } from "../../../utils/dateHelper";
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
import {
  getGroupByIdAction,
  getGroupsAction,
} from "../../../actions/groupActions";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { getSubjectsAction } from "../../../actions/subjectActions";
import { getStudentsAction } from "../../../actions/studentActions";
import { getQuizzesAction } from "../../../actions/quizActions";
import CreateQuizModal from "./CreateQuizModal";

const Quizzes = () => {
  const history = useHistory();

  const isFetching = useSelector((state) => state.authReducer.isFetching);

  const quizzes = useSelector((state) => state.quizReducer.quizzes);
  const subjects = useSelector((state) => state.subjectReducer.subjects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizzesAction());
    dispatch(getSubjectsAction());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleView(id) {
    let path = `/admin/quizzes/details/${id}`;
    history.push(path);
  }

  function handleEdit(id) {
    let path = `/admin/quizzes/edit/${id}`;
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
          {isFetching || !quizzes || !subjects ? (
            <SpinnerComponent />
          ) : (
            <Box overflowX="auto" width="100%">
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Id</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Subject</Th>
                    <Th textAlign="center">Edit</Th>
                    <Th textAlign="center">Delete</Th>
                    <Th textAlign="center">View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {quizzes.map((qz, index) => {
                    const { id, name, subject } = qz;
                    return (
                      <Tr key={index}>
                        <Th textAlign="center">{id}</Th>
                        <Td textAlign="center">{name}</Td>
                        <Td textAlign="center">{subject.name}</Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="yellow"
                            onClick={() => handleEdit(id)}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button colorScheme="pink">Delete</Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="telegram"
                            onClick={() => handleView(id)}
                          >
                            View
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}

                  <CreateQuizModal
                    onClick={() => handleModal()}
                    value={isOpen}
                    subjects={subjects}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
        {isFetching || !quizzes || !subjects ? null : (
          <Button
            colorScheme="whatsapp"
            onClick={() => handleModal()}
            pos="fixed"
            right="0"
            bottom="0"
            margin="1rem"
          >
            Create quiz
          </Button>
        )}
      </Box>
    </>
  );
};

export default Quizzes;
