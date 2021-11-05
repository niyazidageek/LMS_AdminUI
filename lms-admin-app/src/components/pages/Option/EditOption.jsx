import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FieldArray, Form, Field } from "formik";
import { useParams } from "react-router";
import { Select } from "chakra-react-select";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Box,
  Radio,
  RadioGroup,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Checkbox,
  Stack,
  Text,
  Icon,
  Button,
  Heading,
  Divider,
  CloseButton,
} from "@chakra-ui/react";
import { FiFilePlus } from "react-icons/fi";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { getQuizzesAction } from "../../../actions/quizActions";
import { getQuestionByIdAction, getQuestionsAction, updateQuestionAction } from "../../../actions/questionActions";
import { fileHelper } from "../../../utils/fileHelper";
import { getOptionByIdAction } from "../../../actions/optionActions";

const EditOption = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  //   const fileRef = useRef(null);

  const option = useSelector((state) => state.optionReducer.option);
  const questions = useSelector(state=>state.questionReducer.questions);

  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  function handleSubmit(values) {
    let { name, questionId, fileNames, file, isCorrect } = values;
    let fileName = (fileNames && fileNames[0]) ?? null;
    var formData = new FormData();
    let data = {
      name,
      questionId,
      fileName,
      isCorrect
    };

    formData.append("Values", JSON.stringify(data));

    file && formData.append("OptionFile", file);

    dispatch(updateQuestionAction(formData, id, token));

  }

  useEffect(() => {
    dispatch(getOptionByIdAction(id));
    dispatch(getQuestionsAction());
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
          {isFetching || !questions || !option ? (
            <SpinnerComponent />
          ) : (
            <Flex align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Edit option</Heading>
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
                      name: option.name,
                      quizId: option.question.id,
                      isCorrect:option.isCorrect,
                      fileNames: (option.fileName && [option.fileName]) ?? null,
                      file: null,
                    }}
                    // validationSchema={groupSchema}
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

                        <FormControl id="questionId">
                          <Field name="questionId">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.questionId && form.touched.questionId
                                }
                              >
                                <FormLabel htmlFor="questionId">Questions</FormLabel>
                                <Select
                                  name="questionId"
                                  closeMenuOnSelect={false}
                                  onChange={(option) => {
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                  defaultValue={{
                                    label: option.question.name,
                                    value: option.question.id,
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
                          <Field name="point">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.isCorrect && form.touched.isCorrect
                                }
                              >
                                <FormLabel htmlFor="point">Status</FormLabel>
                                <RadioGroup defaultValue="2">
                                <Stack spacing={5} direction="row">
                                    <Radio colorScheme="green" value="1">
                                    True
                                    </Radio>
                                    <Radio colorScheme="red" value="2">
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

                        <FormControl id="fileNames">
                          <FormLabel htmlFor="fileNames">Material</FormLabel>
                          {
                            option.fileName ? <FieldArray name="fileNames">
                            {({ remove, form }) => (
                              <Box
                                paddingRight="4"
                                paddingLeft="4"
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="md"
                              >
                                {form.values.fileNames &&
                                  form.values.fileNames.map((file, index) => (
                                    <>
                                      <Stack
                                        margin="1rem 0rem 1rem"
                                        key={index}
                                        direction="row"
                                      >
                                        <Link cursor='pointer' href={fileHelper.convertToUrl(file)}>
                                          {file}
                                        </Link>
                                        <CloseButton
                                          onClick={() => remove(index)}
                                          size="sm"
                                          color="red"
                                        />
                                      </Stack>
                                    </>
                                  ))}
                              </Box>
                            )}
                          </FieldArray> : <Text> No materials </Text>
                          }
                        </FormControl>

                        <FormControl id="file">
                          <Field name="file">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                <Input
                                  // ref={fileRef}
                                  type="file"
                                  // value={null}
                                  placeholder="File"
                                  // display="none"
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      e.target.files[0]
                                    );
                                  }}
                                />

                                {/* <Box display="flex" alignItems="center">
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
                              {fileRef.current !== undefined && fileRef.current !==null  ? (
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
                          </Box> */}

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

export default EditOption;