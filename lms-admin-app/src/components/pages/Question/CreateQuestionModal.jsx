import React, { useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "chakra-react-select";
import { NavLink, Redirect } from "react-router-dom";

import { Icon } from "@chakra-ui/icon";
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
import { FiFilePlus } from "react-icons/fi";
import { createQuestionAction } from "../../../actions/questionActions";

const CreateQuestionModal = ({ onClick, value, quizzes }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const fileRef = useRef(undefined);
  function handleSubmit(values) {
    var formData = new FormData();
    let { file, name, quizId, point,fileName } = values;
    let data = {
      name,
      quizId,
      fileName, 
      point
    };
    formData.append("Values", JSON.stringify(data));

    file && formData.append("QuestionFile", file);

    dispatch(createQuestionAction(formData, token));
    onClick();
  }

  return (
    <>
      <Modal isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a question</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{
              name: "",
              point:null,
              quizId: "",
              fileName: null,
              file: null
            }}
            // validationSchema={lessonSchema}
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

                  <FormControl id="quizId">
                    <Field name="quizId">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.quizId && form.touched.quizId
                          }
                        >
                          <FormLabel htmlFor="quizId">Quizzes</FormLabel>
                          <Select
                            name="quizId"
                            closeMenuOnSelect={false}
                            onChange={(option) => {
                              form.setFieldValue(field.name, option.value);
                            }}
                            options={quizzes.map((s) => ({
                              label: s.name,
                              value: s.id,
                            }))}
                          />
                          <FormErrorMessage>
                            {form.errors.quizId}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </FormControl>

                  <FormControl id="point">
                    <Field name="point">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.point && form.touched.point
                          }
                        >
                          <FormLabel htmlFor="point">Point</FormLabel>
                          <Input {...field} type="number" />
                          <FormErrorMessage>
                            {form.errors.point}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </FormControl>

                  <FormControl id="file">
                    <Field name="file">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <Input
                            ref={fileRef}
                            type="file"
                            placeholder="File"
                            display="none"
                            onChange={(e) => {
                              form.setFieldValue(field.name, e.target.files[0]);
                            }}
                          />

                          <Box display="flex" alignItems="center">
                            <Icon
                              cursor="pointer"
                              onClick={() => fileRef.current.click()}
                              border="orange"
                              boxSize={10}
                              as={FiFilePlus}
                            />
                            <Text
                              cursor="pointer"
                              onClick={() => fileRef.current.click()}
                              marginLeft="1"
                            >
                              {fileRef.current !== undefined && fileRef.current !== null  ? (
                                fileRef.current.files.length == 1 ? (
                                  fileRef.current.files[0].name
                                ) : (
                                  <span>
                                    {fileRef.current.files.length} file
                                  </span>
                                )
                              ) : (
                                <span>Upload file</span>
                              )}
                            </Text>
                          </Box>

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

export default CreateQuestionModal;