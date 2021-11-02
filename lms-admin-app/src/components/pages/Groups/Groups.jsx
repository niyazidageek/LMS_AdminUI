import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
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
import {
  getGroupByIdAction,
  getGroupsAction,
} from "../../../actions/groupActions";
import { getGroups } from "../../../services/groupService";
import { actionTypes } from "../../../actions/const";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import CreateGroupModal from "./CreateGroupModal";
import { getStudents } from "../../../services/studentService";
import { getSubjects } from "../../../services/subjectService";
import { getSubjectsAction } from "../../../actions/subjectActions";
import { getStudentsAction } from "../../../actions/studentActions";

const Groups = () => {
  const history = useHistory();

  const isFetching = useSelector((state) => state.authReducer.isFetching);

  const groups = useSelector((state) => state.groupReducer.groups);
  const students = useSelector((state) => state.studentReducer.students);
  const subjects = useSelector((state) => state.subjectReducer.subjects);

  console.log(groups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupsAction());
    dispatch(getSubjectsAction());
    dispatch(getStudentsAction());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleView(id) {
    let path = `/admin/groups/details/${id}`;
    history.push(path);
  }

  function handleEdit(id) {
    let path = `/admin/groups/edit/${id}`;
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
          {isFetching || !groups || !students || !subjects ? (
            <SpinnerComponent />
          ) : (
            <Box overflowX="auto" width="100%">
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Number of participants</Th>
                    <Th>Subject</Th>
                    <Th>Start date</Th>
                    <Th>End date</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {groups.map((gr, index) => {
                    const { id, appUsersCount, name, subject } = gr;
                    let startDate = normalizedDate(gr.startDate);
                    let endDate = normalizedDate(gr.endDate);
                    return (
                      <Tr key={index}>
                        <Th>{id}</Th>
                        <Td>{name}</Td>
                        <Td>{appUsersCount}</Td>
                        <Td>{subject.name}</Td>
                        <Td>{startDate}</Td>
                        <Td>{endDate}</Td>
                        <Td>
                          <Button
                            colorScheme="yellow"
                            onClick={() => handleEdit(id)}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td>
                          <Button colorScheme="pink">Delete</Button>
                        </Td>
                        <Td>
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

                  <CreateGroupModal
                    onClick={() => handleModal()}
                    value={isOpen}
                    subjects={subjects}
                    students={students}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
        {isFetching || !groups || !students || !subjects ? null : (
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

export default Groups;
