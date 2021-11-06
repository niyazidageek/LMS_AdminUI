import React, { useEffect, useState } from "react";
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

import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { getGroupsAction } from "../../../actions/groupActions";
import { getQuestionsAction } from "../../../actions/questionActions";
import { getQuizzesAction } from "../../../actions/quizActions";
import CreateQuestionModal from "./CreateQuestionModal";

const Questions = () => {
  const history = useHistory();

  const isFetching = useSelector((state) => state.authReducer.isFetching);

  const questions = useSelector((state) => state.questionReducer.questions);
  const quizzes = useSelector((state) => state.quizReducer.quizzes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsAction());
    dispatch(getQuizzesAction());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleView(id) {
    let path = `/admin/questions/details/${id}`;
    history.push(path);
  }

  function handleEdit(id) {
    let path = `/admin/questions/edit/${id}`;
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
          {isFetching || !questions || !quizzes ? (
            <SpinnerComponent />
          ) : (
            <Box overflowX="auto" width="100%">
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Id</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Quiz</Th>
                    <Th textAlign="center">Point</Th>
                    <Th textAlign="center">Number of options</Th>
                    <Th textAlign="center">Edit</Th>
                    <Th textAlign="center">Delete</Th>
                    <Th textAlign="center">View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {questions.map((qs, index) => {
                    const { id, quiz, name, point, options } = qs;
                    return (
                      <Tr key={index}>
                        <Th textAlign="center">{id}</Th>
                        <Td textAlign="center">{name}</Td>
                        <Td textAlign="center">{quiz.name}</Td>
                        <Td textAlign="center">{point}</Td>
                        <Td textAlign="center">{options.length}</Td>
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

                  <CreateQuestionModal
                    onClick={() => handleModal()}
                    value={isOpen}
                    quizzes={quizzes}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
        {isFetching || !questions || !quizzes ? null : (
          <Button
            colorScheme="whatsapp"
            onClick={() => handleModal()}
            pos="fixed"
            right="0"
            bottom="0"
            margin="1rem"
          >
            Create question
          </Button>
        )}
      </Box>
    </>
  );
};

export default Questions;
