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
import { getOptionByIdAction } from "../../../actions/optionActions";

const OptionDetail = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const option = useSelector((state) => state.optionReducer.option);

  useEffect(() => {
    dispatch(getOptionByIdAction(id));
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
          {isFetching || !option ? (
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
                  Option Id : {option.id}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Name : {option.name}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Question : {option.question.name}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Status : {option.isCorrect ? "True" : "False"}
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

                {option.fileName ? (
                  <Box display="flex">
                    <>
                      <Stack margin="1rem 0" direction="row">
                        <Link
                          cursor="pointer"
                          href={fileHelper.convertToUrl(option.fileName)}
                        >
                          {option.fileName}
                        </Link>
                      </Stack>
                    </>
                  </Box>
                ) : (
                  <Text>No materials</Text>
                )}
              </Box>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default OptionDetail;
