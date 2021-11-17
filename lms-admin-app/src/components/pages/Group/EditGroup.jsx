import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router";
import { Select } from "chakra-react-select";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import SpinnerComponent from "../../elements/SpinnerComponent";
import groupSchema from "../../../validations/groupSchema";
import { getSubjectsAction } from "../../../actions/subjectActions";
import {
  getGroupByIdAction,
  updateGroupAction,
} from "../../../actions/groupActions";
import { getStudentsAction } from "../../../actions/studentActions";
import { getTeachersAction } from "../../../actions/teacherActions";
import {roles} from "../../../utils/roles"

const EditGroup = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const group = useSelector((state) => state.groupReducer.group);
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const students = useSelector((state) => state.studentReducer.students);
  const teachers = useSelector((state) => state.teacherReducer.teachers);

  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  function handleSubmit(values) {
    let { name, subjectId, startDate, endDate, studentIds, teacherId } = values;
    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();
    let data = {
      name: name,
      subjectId,
      startDate: startDate,
      endDate: endDate,
      appUserIds: studentIds.concat(teacherId),
    };
    dispatch(updateGroupAction(data, id, token));
  }
  useEffect(() => {
    dispatch(getGroupByIdAction(id));
    dispatch(getSubjectsAction());
    dispatch(getStudentsAction());
    dispatch(getTeachersAction())
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
          {false || !group || !students || !teachers || !subjects ? (
            <SpinnerComponent />
          ) : (
            console.log(isFetching),
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
                      name: group.name,
                      subjectId: group.subject.id,
                      startDate: group.startDate.slice(0, 10),
                      endDate: group.endDate.slice(0, 10),
                      studentIds: group.appUsers.filter((st) => !st.roles.some(r=>r==roles.Teacher)).map(st=>st.id),
                      teacherId:group.appUsers.filter(au=>au.roles.some(r=>r==roles.Teacher)).map(au=>au.id) ?? "" 
                    }}
                    validationSchema={groupSchema}
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
                                    label: group.subject.name,
                                    value: group.subject.id,
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
                                <Input {...field} type="date" />
                                <FormErrorMessage>
                                  {form.errors.startDate}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
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
                                <Input {...field} type="date" />
                                <FormErrorMessage>
                                  {form.errors.endDate}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </FormControl>

                        <FormControl id="studentIds">
                          <Field name="studentIds">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.studentIds &&
                                  form.touched.studentIds
                                }
                              >
                                <FormLabel htmlFor="studentIds">
                                  Select students
                                </FormLabel>
                                <Select
                                  isMulti
                                  name="studentIds"
                                  onChange={(option) => {
                                    form.setFieldValue(
                                      field.name,
                                      option.map((opt) => opt.value)
                                    );
                                  }}
                                  defaultValue={group.appUsers.filter(a=>!a.roles.some(r=>r==roles.Teacher)).map((a) => ({
                                    label: `${a.name} ${a.surname}`,
                                    value: a.id,
                                  }))}
                                  options={students.map((a) => ({
                                    label: `${a.name} ${a.surname}`,
                                    value: a.id,
                                  }))}
                                  placeholder="Select students"
                                  closeMenuOnSelect={false}
                                />
                                <FormErrorMessage>
                                  {form.errors.studentIds}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </FormControl>

                        <FormControl id="teacherId">
                          <Field name="teacherId">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.teacherId &&
                                  form.touched.teacherId
                                }
                              >
                                <FormLabel htmlFor="teacherId">
                                  Select a teacher
                                </FormLabel>
                                <Select
                                isSearchable
                                  name="teacherId"
                                  onChange={(option) => {
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                  options={teachers.map((a) => ({
                                    label: `${a.name} ${a.surname}`,
                                    value: a.id,
                                  }))}
                                  defaultValue={{
                                  
                                    label: `${group.appUsers.filter(au=>au.roles.some(r=>r==roles.Teacher)).map(au=>au.name)} ${group.appUsers.filter(au=>au.roles.some(r=>r==roles.Teacher)).map(au=>au.surname)}`,
                                    value: group.appUsers.filter(au=>au.roles.some(r=>r==roles.Teacher)).map(au=>au.id),
                                  }
                                  }
                                  placeholder="Select teachers"
                                  closeMenuOnSelect={false}
                                />
                                <FormErrorMessage>
                                  {form.errors.teacherId}
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

export default EditGroup;
