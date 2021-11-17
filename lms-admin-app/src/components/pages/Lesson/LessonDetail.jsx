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
import { useFetch } from "../../../hooks/useFetch";
import { useHistory } from "react-router";
import { Flex, Text } from "@chakra-ui/layout";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { getGroupById } from "../../../services/groupService";
import { useDispatch, useSelector } from "react-redux";
import { getLessonByIdAction } from "../../../actions/lessonActions";
import { fileHelper } from "../../../utils/fileHelper";

const LessonDetail = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const lesson = useSelector((state) => state.lessonReducer.lesson);

  useEffect(() => {
    dispatch(getLessonByIdAction(id));
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
          {isFetching || !lesson ? (
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
                  Lesson Id : {lesson.id}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Name : {lesson.name}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Group : {lesson.group.name}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Start time :{" "}
                  {dateHelper.normalizedDateWithTime(lesson.startDate)}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  End time : {dateHelper.normalizedDateWithTime(lesson.endDate)}
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
                  Materials:
                </Text>

                {lesson.lessonMaterials.length !== 0 &&
                lesson.lessonMaterials !== null ? (
                  <Box display="fle">
                    {lesson.lessonMaterials.map((lm, index) => {
                      return (
                        <>
                          <Stack margin="1rem 0" key={index} direction="row">
                            <Link
                              cursor="pointer"
                              href={fileHelper.convertToUrl(lm.fileName)}
                            >
                              {lm.fileName}
                            </Link>
                          </Stack>
                          {lesson.lessonMaterials.length > 1 ? (
                            <Divider />
                          ) : null}
                        </>
                      );
                    })}
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

export default LessonDetail;
