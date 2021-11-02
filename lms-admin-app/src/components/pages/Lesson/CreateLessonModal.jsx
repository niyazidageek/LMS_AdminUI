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
import { createLessonAction } from "../../../actions/lessonActions";
import lessonSchema from "../../../validations/lessonSchema";

const CreateLessonModal = ({ onClick, value, groups }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const fileRef = useRef();
  function handleSubmit(values) {
    var formData = new FormData();
    let { files, name, startDate, endDate, groupId } = values;
    let data = {
      name,
      startDate,
      endDate,
      groupId,
    };
    formData.append("Values", JSON.stringify(data));

    var ins = files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("Files", files[x]);
    }

    dispatch(createLessonAction(formData, token));
    onClick();
  }

  return (
    console.log(fileRef.current),
    (
      <>
        <Modal isOpen={value} onClose={onClick}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a lesson</ModalHeader>
            <ModalCloseButton />

            <Formik
              initialValues={{
                name: "",
                startDate: "",
                endDate: "",
                groupId: "",
                files: [],
              }}
              validationSchema={lessonSchema}
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

                    <FormControl id="groupId">
                      <Field name="groupId">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.groupId && form.touched.groupId
                            }
                          >
                            <FormLabel htmlFor="groupId">Groups</FormLabel>
                            <Select
                              name="groupId"
                              closeMenuOnSelect={false}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option.value);
                              }}
                              options={groups.map((s) => ({
                                label: s.name,
                                value: s.id,
                              }))}
                            />
                            <FormErrorMessage>
                              {form.errors.groupId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </FormControl>

                    <FormControl id="startDate">
                      <Field name="startDate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.startDate && form.touched.startDate
                            }
                          >
                            <FormLabel htmlFor="startDate">
                              Start Date
                            </FormLabel>
                            <Input {...field} type="date" />
                            <FormErrorMessage>
                              {form.errors.startDate}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </FormControl>

                    <FormControl id="endDate">
                      <Field name="endDate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.endDate && form.touched.endDate
                            }
                          >
                            <FormLabel htmlFor="endDate">End Date</FormLabel>
                            <Input {...field} type="date" />
                            <FormErrorMessage>
                              {form.errors.endDate}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </FormControl>

                    <FormControl id="name">
                      <Field name="files">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <Input
                              multiple={true}
                              ref={fileRef}
                              type="file"
                              placeholder="Files"
                              display="none"
                              onChange={(e) => {
                                form.setFieldValue(field.name, e.target.files);
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
                                {fileRef.current !== undefined ? (
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
    )
  );
};

export default CreateLessonModal;
