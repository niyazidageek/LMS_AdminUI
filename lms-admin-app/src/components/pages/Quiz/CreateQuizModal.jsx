import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "chakra-react-select";
import { NavLink, Redirect } from "react-router-dom";
import quizSchema from "../../../validations/quizSchema"
import {
  FormErrorMessage,
  Flex,
  Box,
  Checkbox,
  Stack,
  Link,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { createQuizAction } from "../../../actions/quizActions";

const CreateQuizModal = ({ onClick, value, subjects }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();

  function handleSubmit(values) {
    let { name, subjectId } = values;
    let data = {
      name: name,
      subjectId,
    };
    dispatch(createQuizAction(data, token));
    onClick();
  }

  return (
    <>
      <Modal isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a group</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{
              name: "",
              subjectId: "",
            }}
            validationSchema={quizSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <ModalBody pb={6}>
                <Stack spacing={6}>
                  <FormControl id="name">
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input type="name" {...field} placeholder="Name" />
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
                            form.errors.subjectId && form.touched.subjectId
                          }
                        >
                          <FormLabel htmlFor="subjectId">Subjects</FormLabel>
                          <Select
                            name="subjectId"
                            closeMenuOnSelect={false}
                            placeholder="Select subjects"
                            onChange={(option) => {
                              form.setFieldValue(field.name, option.value);
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
                  </Stack>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  isLoading={isFetching}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Create
                </Button>
                <Button onClick={onClick}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQuizModal;
