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
import { getGroupsAction } from "../../../actions/groupActions";
import {
  getLessonByIdAction,
  updateLessonAction,
} from "../../../actions/lessonActions";
import { actionTypes } from "../../../actions/const";
import { fileHelper } from "../../../utils/fileHelper";

const EditLesson = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  //   const fileRef = useRef(null);

  const [filePaths, setFilePaths] = useState([]);
  const lesson = useSelector((state) => state.lessonReducer.lesson);
  const groups = useSelector((state) => state.groupReducer.groups);

  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);  

  function handleSubmit(values) {
    let { name, groupId, startDate, endDate, fileNames, files } = values;
    var formData = new FormData();
    let data = {
      name,
      groupId,
      startDate,
      endDate,
      lessonMaterials: fileNames,
    };

    formData.append("Values", JSON.stringify(data));
    var ins = files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("Files", files[x]);
    }

    dispatch(updateLessonAction(formData, id, token));
  }

  useEffect(() => {
    dispatch(getLessonByIdAction(id));
    dispatch(getGroupsAction());
    console.log("sukarender");
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
          {isFetching || !lesson || !groups ? (
            <SpinnerComponent />
          ) : (
            <Flex align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Edit lesson</Heading>
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
                      name: lesson.name,
                      groupId: lesson.group.id,
                      startDate: lesson.startDate,
                      endDate: lesson.endDate,
                      fileNames:
                        lesson.lessonMaterials.length > 0
                          ? lesson.lessonMaterials
                          : [],
                      files: [],
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
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                  defaultValue={{
                                    label: lesson.group.name,
                                    value: lesson.group.id,
                                  }}
                                  options={groups.map((g) => ({
                                    label: g.name,
                                    value: g.id,
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
                                  form.errors.startDate &&
                                  form.touched.startDate
                                }
                              >
                                <FormLabel htmlFor="startDate">
                                  Start Date
                                </FormLabel>
                                <Input {...field} type="datetime-local" />
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
                                <FormLabel htmlFor="endDate">
                                  End Date
                                </FormLabel>
                                <Input {...field} type="datetime-local" />
                                <FormErrorMessage>
                                  {form.errors.endDate}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </FormControl>

                        <FormControl id="fileNames">
                          <FormLabel htmlFor="fileNames">Materials</FormLabel>
                          <FieldArray name="fileNames">
                            {({ remove, form }) => (
                              <Box
                                paddingRight="4"
                                paddingLeft="4"
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="md"
                              >
                                {form.values.fileNames.length > 0 &&
                                  form.values.fileNames.map((file, index) => (
                                    <>
                                      <Stack
                                        margin="1rem 0rem 1rem"
                                        key={index}
                                        direction="row"
                                      >
                                        <Link cursor='pointer' href={fileHelper.convertToUrl(file.fileName)}>
                                          {file.fileName}
                                        </Link>
                                        <CloseButton
                                          onClick={() => remove(index)}
                                          size="sm"
                                          color="red"
                                        />
                                      </Stack>
                                      {form.values.fileNames.length > 1 ? (
                                        <Divider />
                                      ) : null}
                                    </>
                                  ))}
                              </Box>
                            )}
                          </FieldArray>
                        </FormControl>

                        <FormControl id="files">
                          <Field name="files">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                <Input
                                  multiple={true}
                                  // ref={fileRef}
                                  type="file"
                                  // value={null}
                                  placeholder="Files"
                                  // display="none"
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      e.target.files
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

export default EditLesson;
