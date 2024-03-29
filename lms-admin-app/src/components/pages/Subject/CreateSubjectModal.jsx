import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "chakra-react-select";
import { NavLink, Redirect } from "react-router-dom";
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
import { createGroupAction } from "../../../actions/groupActions";
import { createSubjectAction } from "../../../actions/subjectActions";
import subjectSchema from "../../../validations/subjectSchema";

const CreateSubjectModal = ({ onClick, value }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector(state=>state.authReducer.jwt)
  const dispatch = useDispatch();

  function handleSubmit(values) {
    let { name } = values;
    let data = {
      name
    };
    dispatch(createSubjectAction(data, token))
    onClick()
  }

  return (
    <>
      <Modal isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a subject</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={subjectSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <ModalBody >
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

                  <Stack spacing={3}>
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

export default CreateSubjectModal;
