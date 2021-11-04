import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { Container, Flex } from "@chakra-ui/layout";
import { dateHelper } from "../../../utils/dateHelper";
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
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import CreateGroupModal from "./CreateGroupModal";
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
                    <Th textAlign="center">Id</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Number of participants</Th>
                    <Th textAlign="center">Subject</Th>
                    <Th textAlign="center">Start date</Th>
                    <Th textAlign="center">End date</Th>
                    <Th textAlign="center">Edit</Th>
                    <Th textAlign="center">Delete</Th>
                    <Th textAlign="center">View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {groups.map((gr, index) => {
                    const { id, appUsersCount, name, subject } = gr;
                    let startDate = dateHelper.normalizedDate(gr.startDate);
                    let endDate = dateHelper.normalizedDate(gr.endDate);
                    return (
                      <Tr key={index}>
                        <Th textAlign="center">{id}</Th>
                        <Td textAlign="center">{name}</Td>
                        <Td textAlign="center">{appUsersCount}</Td>
                        <Td textAlign="center">{subject.name}</Td>
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
