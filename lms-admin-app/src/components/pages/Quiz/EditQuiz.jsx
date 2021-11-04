import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router";
import { Select } from "chakra-react-select";
import quizSchema from "../../../validations/quizSchema"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { getSubjectsAction } from "../../../actions/subjectActions";
import {
  getQuizByIdAction,
  updateQuizAction,
} from "../../../actions/quizActions";

const EditQuiz = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector((state) => state.quizReducer.quiz);
  const subjects = useSelector((state) => state.subjectReducer.subjects);

  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  function handleSubmit(values) {
    let { name, subjectId } = values;
    let data = {
      name: name,
      subjectId,
    };

    dispatch(updateQuizAction(data, id, token));
  }

  useEffect(() => {
    dispatch(getQuizByIdAction(id));
    dispatch(getSubjectsAction());
  }, []);

  return (
    <>
      <AuthErrorAlert />
      <AuthMessageAlert />
      <Box>
        <Flex
          display="flex"
          direction="column"
          alignItems="center"
          pos="relative"
        >
          {isFetching || !quiz || !subjects ? (
            <SpinnerComponent />
          ) : (
            <Flex align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Edit quiz</Heading>
                </Stack>
                <Box
                  boxSize={"md"}
                  rounded={"lg"}
                  boxShadow={"lg"}
                  height={"max-content"}
                  p={8}
                >
                  <Formik
                    initialValues={{
                      name: quiz.name,
                      subjectId: quiz.subject.id,
                    }}
                    validationSchema={quizSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <Stack spacing={6}>
                        <FormControl id="name">
                          <Field name="name">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input {...field} placeholder="Name" />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </FormControl>
                        <FormControl id="subjectId">
                          <Field name="subjectId">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.subjectId &&
                                  form.touched.subjectId
                                }
                              >
                                <FormLabel htmlFor="subjectId">
                                  Subjects
                                </FormLabel>
                                <Select
                                  name="subjectId"
                                  closeMenuOnSelect={false}
                                  onChange={(option) => {
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                  defaultValue={{
                                    label: quiz.subject.name,
                                    value: quiz.subject.id,
                                  }}
                                  options={subjects.map((s) => ({
                                    label: s.name,
                                    value: s.id,
                                  }))}
                                />
                                <FormErrorMessage>
                                  {form.errors.subjectId}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </FormControl>

                        <Stack spacing={8}>
                          <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                          ></Stack>
                          <Button
                            isLoading={isFetching}
                            type="submit"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                          >
                            Save changes
                          </Button>
                        </Stack>
                      </Stack>
                    </Form>
                  </Formik>
                </Box>
              </Stack>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default EditQuiz;
