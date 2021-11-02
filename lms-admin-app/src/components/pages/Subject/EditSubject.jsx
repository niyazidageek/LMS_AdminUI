import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router";
import { Select } from "chakra-react-select";
import subjectSchema from "../../../validations/subjectSchema";
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
import axios from "axios";
import SpinnerComponent from "../../elements/SpinnerComponent";
import {
  getSubjectByIdAction,
  getSubjectsAction,
  updateSubjectAction,
} from "../../../actions/subjectActions";

const EditSubject = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const subject = useSelector((state) => state.subjectReducer.subject);

  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  function handleSubmit(values) {
    let { name } = values;

    let data = {
      name,
    };

    dispatch(updateSubjectAction(data, id, token));
  }

  useEffect(() => {
    dispatch(getSubjectByIdAction(id));
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
          {isFetching || !subject ? (
            <SpinnerComponent />
          ) : (
            <Flex align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Edit group</Heading>
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
                      name: subject.name,
                    }}
                    validationSchema={subjectSchema}
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

export default EditSubject;
