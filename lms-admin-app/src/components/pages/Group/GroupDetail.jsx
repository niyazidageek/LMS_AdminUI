import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
import { useFetch } from "../../../hooks/useFetch";
import { useHistory } from "react-router";
import { Flex, Text } from "@chakra-ui/layout";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { getGroupById } from "../../../services/groupService";
import { useDispatch, useSelector } from "react-redux";
import CreateGroupModal from "./CreateGroupModal";
import { getGroupByIdAction } from "../../../actions/groupActions";

const GroupDetail = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const group = useSelector((state) => state.groupReducer.group);

  useEffect(() => {
    dispatch(getGroupByIdAction(id));
  }, []);

  return (
    <>
      <Box>
        <Flex
          display="flex"
          direction="column"
          alignItems="center"
          pos="relative"
        >
          {isFetching || !group ? (
            <SpinnerComponent />
          ) : (
            <Box
              display="flex"
              alignSelf="flex-start"
              width="100%"
              flexFlow="column"
            >
              <Box
                boxShadow="lg"
                borderRadius="xl"
                width="100%"
                height="100%"
                padding="12"
              >
                <Text fontSize="3xl" fontWeight="bold" fontStyle="normal">
                  Group : {group.id}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Subject : {group.subject.name}
                </Text>

                {group.teacher ? (
                  <Text
                    paddingTop="5"
                    fontSize="2xl"
                    fontWeight="semibold"
                    fontStyle="normal"
                  >
                    Teacher : {group.teacher.name} {group.teacher.surname}
                  </Text>
                ) : (
                  <Text
                    paddingTop="5"
                    fontSize="2xl"
                    fontWeight="semibold"
                    fontStyle="normal"
                  >
                    Teacher : no teacher
                  </Text>
                )}

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Number of students : {group.appUsersCount}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  Start date : {dateHelper.normalizedDate(group.startDate)}
                </Text>

                <Text
                  paddingTop="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  fontStyle="normal"
                >
                  End date : {dateHelper.normalizedDate(group.endDate)}
                </Text>
              </Box>

              <Box
                boxShadow="lg"
                borderRadius="xl"
                width="100%"
                height="100%"
                padding="12"
                overflowX="auto"
                width="100%"
                display="flex"
                flexFlow="column"
                justifyContent="center"
              >
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  fontStyle="normal"
                  paddingBottom="10"
                >
                  Students list
                </Text>
                <Table variant="simple" colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Surname</Th>
                      <Th>Username</Th>
                      <Th>Email</Th>
                      <Th>Roles</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {group.appUsers.map((user, index) => {
                      const { id, email, name, surname, username, roles } =
                        user;
                      return (
                        <Tr key="index">
                          <Td>{name}</Td>
                          <Td>{surname}</Td>
                          <Td>{username}</Td>
                          <Td>{email}</Td>
                          <Td>
                            {roles.map((role) => {
                              return <span>{role}</span>;
                            })}
                          </Td>
                          <Td>
                            <Button colorScheme="twitter">Details</Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default GroupDetail;
