import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import normalizedDate from "../../../utils/normalizedDate";
import nromalizedDateWithTime, { dateHelper } from "../../../utils/dateHelper";
import {
  Table,
  Thead,
  Stack,
  Divider,
  Tbody,
  Link,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { Flex, Text } from "@chakra-ui/layout";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByIdAction } from "../../../actions/questionActions";
import { fileHelper } from "../../../utils/fileHelper";

const QuestionDetail = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const question = useSelector((state) => state.questionReducer.question);

  useEffect(() => {
    dispatch(getQuestionByIdAction(id));
  }, []);

  return (
    <>
      <Box>
        <Flex
          display="flex"
          direction="column"
          alignItems="center"
          pos="relative"
        >
          {isFetching || !question ? (
            <SpinnerComponent />
          ) : (
            <Box
              display="flex"
              alignSelf="flex-start"
              width="100%"
              flexFlow="column"
            >
              <Box
                boxShadow="lg"
                borderRadius="xl"
                width="100%"
                height="100%"
                padding="12"
              >
                <Text fontSize="3xl" fontWeight="bold" fontStyle="normal">
                  Question Id : {question.id}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Name : {question.name}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Quiz : {question.quiz.name}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Quiz : {question.options.length}
                </Text>
              </Box>

              <Box
                boxShadow="lg"
                borderRadius="xl"
                width="100%"
                height="100%"
                padding="12"
                overflowX="auto"
                width="100%"
                display="flex"
                flexFlow="column"
                justifyContent="center"
              >
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  fontStyle="normal"
                  paddingBottom="10"
                >
                  Material:
                </Text>

                {question.fileName ? (
                  <Box display="flex">
                    <>
                      <Stack margin="1rem 0" direction="row">
                        <Link
                          cursor="pointer"
                          href={fileHelper.convertToUrl(question.fileName)}
                        >
                          {question.fileName}
                        </Link>
                      </Stack>
                    </>
                  </Box>
                ) : (
                  <Text>No materials</Text>
                )}

                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  fontStyle="normal"
                  paddingBottom="10"
                >
                  Option list:
                </Text>

                {question.options.length > 0 ? (
                  <Table variant="simple" colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {question.options.map((opt, index) => {
                        const { name, isCorrect } = opt;
                        return (
                          <Tr key={index}>
                            <Td>{name}</Td>
                            <Td>{isCorrect}</Td>
                            <Td>
                              <Button colorScheme="twitter">Details</Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                ) : (
                  <Text
                    fontStyle="normal"
                    paddingBottom="10"
                  >
                    There are no options
                  </Text>
                )}
              </Box>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default QuestionDetail;
