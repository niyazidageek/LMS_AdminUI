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
import { getQuestionByIdAction, updateQuestionAction } from "../../../actions/questionActions";

const EditQuestion = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  //   const fileRef = useRef(null);

  const question = useSelector((state) => state.questionReducer.question);
  const quizzes = useSelector(state=>state.quizReducer.quizzes);

  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  const qandon = (filename) => {
    return require(`${process.env.REACT_APP_FILES_FOLDER}${filename}`).default;
  };

//   async function suka(filename) {
//     // require(`${process.env.REACT_APP_FILES_FOLDER}${filename}`).default()

//     try {
//       return await require(`${process.env.REACT_APP_FILES_FOLDER}${filename}`)
//         .default;
//     } catch (error) {
//       console.log(error);
//     }
//   }

  function handleSubmit(values) {
    let { name, quizId, fileNames, file, point } = values;
    console.log(fileNames)
    let fileName = (fileNames && fileNames[0]) ?? null;
    var formData = new FormData();
    let data = {
      name,
      quizId,
      fileName,
      point
    };

    formData.append("Values", JSON.stringify(data));

    file && formData.append("QuestionFile", file);
    console.log(values)

    dispatch(updateQuestionAction(formData, id, token));

  }

  useEffect(() => {
    dispatch(getQuestionByIdAction(id));
    dispatch(getQuizzesAction());
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
          {isFetching || !question || !quizzes ? (
            <SpinnerComponent />
          ) : (
            <Flex align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Edit question</Heading>
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
                      name: question.name,
                      quizId: question.quiz.id,
                      point:question.point,
                      fileNames: (question.fileName && [question.fileName]) ?? null,
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
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                  defaultValue={{
                                    label: question.quiz.name,
                                    value: question.quiz.id,
                                  }}
                                  options={quizzes.map((q) => ({
                                    label: q.name,
                                    value: q.id,
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
                                <Input {...field} type='number' placeholder="Point" />
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
                            question.fileName ? <FieldArray name="fileNames">
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
                                        <Link cursor='pointer' href={qandon(file)}>
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

export default EditQuestion;
