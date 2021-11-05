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
  Radio,
  RadioGroup
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
import { createLessonAction } from "../../../actions/lessonActions";
import lessonSchema from "../../../validations/lessonSchema";
import { createOptionAction } from "../../../actions/optionActions";

const CreateOptionModal = ({ onClick, value, questions }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const fileRef = useRef(undefined);
  function handleSubmit(values) {
    var formData = new FormData();
    let {  name, questionId, file, isCorrect } = values;
    var formData = new FormData();
    let data = {
      name,
      questionId,
      isCorrect: isCorrect=='1' ? true : false
    };

    formData.append("Values", JSON.stringify(data));

    file && formData.append("OptionFile", file);

    dispatch(createOptionAction(formData, token));
    console.log(data);
    onClick();
  }


  return (
    <>
      <Modal isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an option</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{
                name: '',
                questionId: null,
                isCorrect:null,
                file: null,
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

                  <FormControl id="questionId">
                    <Field name="questionId">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.questionId && form.touched.questionId
                          }
                        >
                          <FormLabel htmlFor="groupId">Questions</FormLabel>
                          <Select
                            name="groupId"
                            closeMenuOnSelect={false}
                            onChange={(option) => {
                              form.setFieldValue(field.name, option.value);
                            }}
                            options={questions.map((q) => ({
                              label: q.name,
                              value: q.id,
                            }))}
                          />
                          <FormErrorMessage>
                            {form.errors.questionId}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </FormControl>


                  <FormControl id="isCorrect">
                          <Field name="isCorrect">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.isCorrect && form.touched.isCorrect
                                }
                              >
                                <FormLabel htmlFor="point">Status</FormLabel>
                                <RadioGroup>
                                <Stack spacing={5} direction="row">
                                    <Radio {...field} colorScheme="green" value='1'>
                                    True
                                    </Radio>
                                    <Radio  {...field} colorScheme="red" value='0'>
                                    False
                                    </Radio>
                                </Stack>
                                </RadioGroup>
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
                            placeholder="Files"
                            display="none"
                            onChange={(e) => {
                              console.log('sas');
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
                                    {fileRef.current.files.length} files
                                  </span>
                                )
                              ) : (
                                <span>Upload files</span>
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

export default CreateOptionModal;
