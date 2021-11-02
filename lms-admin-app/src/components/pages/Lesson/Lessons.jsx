import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { Container, Flex } from "@chakra-ui/layout";
import normalizedDate from "../../../utils/normalizedDate";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
} from "@chakra-ui/react";

import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { getLessonsAction } from "../../../actions/lessonActions";
import CreateLessonModal from "./CreateLessonModal";
import { getGroupsAction } from "../../../actions/groupActions";

const Lessons = () => {
  const history = useHistory();

  const isFetching = useSelector((state) => state.authReducer.isFetching);

  const lessons = useSelector((state) => state.lessonReducer.lessons);

  const groups = useSelector((state) => state.groupReducer.groups);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLessonsAction());
    dispatch(getGroupsAction());
    console.log(lessons)
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleView(id) {
    let path = `/admin/lessons/details/${id}`;
    history.push(path);
  }

  function handleEdit(id) {
    let path = `/admin/lessons/edit/${id}`;
    history.push(path);
  }

  return (
    <>
      <AuthMessageAlert />
      <AuthErrorAlert />
      <Box>
        <Flex
          display="flex"
          direction="column"
          alignItems="center"
          pos="relative"
        >
          {isFetching || !lessons ? (
            <SpinnerComponent />
          ) : (
            <Box overflowX="auto" width="100%">
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Id</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Group</Th>
                    <Th textAlign="center">Start date</Th>
                    <Th textAlign="center">End date</Th>
                    <Th textAlign="center">Edit</Th>
                    <Th textAlign="center">Delete</Th>
                    <Th textAlign="center">View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {lessons.map((ls, index, subject) => {
                    const { id, group, name} = ls;
                    let startDate = normalizedDate(ls.startDate);
                    let endDate = normalizedDate(ls.endDate);
                    return (
                      <Tr key={index}>
                        <Th textAlign="center">{id}</Th>
                        <Td textAlign="center">{name}</Td>
                        <Td textAlign="center">{group.name}</Td>
                        <Td textAlign="center">{startDate}</Td>
                        <Td textAlign="center">{endDate}</Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="yellow"
                            onClick={() => handleEdit(id)}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button colorScheme="pink">Delete</Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="telegram"
                            onClick={() => handleView(id)}
                          >
                            View
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}

                  <CreateLessonModal
                    onClick={() => handleModal()}
                    value={isOpen}
                    groups={groups}
                    // subjects={subjects}
                    // students={students}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
        {isFetching || !lessons  ? null : (
          <Button
            colorScheme="whatsapp"
            onClick={() => handleModal()}
            pos="fixed"
            right="0"
            bottom="0"
            margin="1rem"
          >
            Create group
          </Button>
        )}
      </Box>
    </>
  );
};

export default Lessons;