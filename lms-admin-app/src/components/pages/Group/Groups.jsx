import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { Container, Flex } from "@chakra-ui/layout";
import { dateHelper } from "../../../utils/dateHelper";
import { useLocation } from "react-router";
import { actionTypes } from "../../../actions/const";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  deleteGroupByIdAction,
  getGroupByIdAction,
  getGroupsAction,
} from "../../../actions/groupActions";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import CreateGroupModal from "./CreateGroupModal";
import { getSubjectsAction } from "../../../actions/subjectActions";
import { getStudentsAction } from "../../../actions/studentActions";
import { getTeachersAction } from "../../../actions/teacherActions";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";

const Groups = () => {
  const history = useHistory();
  const [pageCount, setPageCount] = useState(0);
  const [groups, setGroups] = useState([]);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const newGroups = useSelector((state) => state.groupReducer.groups);
  const total = useSelector((state) => state.groupReducer.count);
  let size = 7;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: total,
    initialState: {
      pageSize: size,
      isDisabled: false,
      currentPage: (page && parseInt(page)) ?? 0,
    },
  });
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const dispatch = useDispatch();

  function fetchMore() {
    let pageTake = page ? currentPage - 1 : currentPage;
    dispatch(getGroupsAction(pageTake, size));
    setPageCount(Math.ceil(total / size));
    setGroups(newGroups);
    dispatch(getSubjectsAction());
  }

  useEffect(() => {
    fetchMore();
  }, []);

  useEffect(() => {
    if (newGroups) {
      setGroups(newGroups);
    }
  }, [newGroups]);

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch(getGroupsAction(number - 1, size));
    setGroups(newGroups);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleDelete(id) {
    let promise = dispatch(deleteGroupByIdAction(id))
    promise.then(()=>fetchMore())
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
          justifyContent="space-between"
          display="flex"
          height="700px"
          direction="column"
          alignItems="center"
          pos="relative"
        >
          {isFetching || !groups ? (
            <SpinnerComponent />
          ) : groups && groups.length == 0 ? (
            <>
              <Text
                pos="absolute"
                left="50%"
                zIndex="2"
                fontSize="3xl"
                fontWeight="bold"
                top="50%"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                You have no groups..
              </Text>
              <Button
                alignSelf="end"
                colorScheme="whatsapp"
                onClick={() => handleModal()}
                margin="1rem"
              >
                Create group
              </Button>
              <CreateGroupModal
                fetchMore={() => fetchMore()}
                onClick={() => handleModal()}
                value={isOpen}
                subjects={subjects}
              />
            </>
          ) : (
            <Box height="100%" overflowX="auto" width="100%">
              {isFetching || !groups ? null : (
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="2xl" fontWeight="bold">
                    Groups
                  </Text>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => handleModal()}
                    margin="1rem"
                  >
                    Create group
                  </Button>
                </Flex>
              )}
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
                            color="white"
                            colorScheme="yellow"
                            onClick={() => handleEdit(id)}
                            fetchMore={() => fetchMore()}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="pink"
                            onClick={() => handleDelete(id)}
                          >
                            Delete
                          </Button>
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
                    fetchMore={() => fetchMore()}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
          {(groups||!isFetching) && (
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={isDisabled}
              onPageChange={handlePageClick}
            >
              <PaginationContainer
                align="center"
                justify="space-between"
                p={4}
                w="full"
              >
                <PaginationPrevious
                  lineHeight="none"
                  color="white"
                  borderRadius="6px"
                  _hover={{
                    bg: "blue.400",
                  }}
                  bg="blue.300"
                >
                  <Text>Previous</Text>
                </PaginationPrevious>
                <PaginationPageGroup
                  isInline
                  align="center"
                  separator={
                    <PaginationSeparator
                      lineHeight="none"
                      bg="blue.300"
                      fontSize="sm"
                      borderRadius="6px"
                      w={7}
                      jumpSize={11}
                    />
                  }
                >
                  {pages.map((page) => (
                    <PaginationPage
                      lineHeight="none"
                      w={7}
                      h={7}
                      borderRadius="6px"
                      color="white"
                      bg="gray.300"
                      key={`pagination_page_${page}`}
                      page={page}
                      fontSize="sm"
                      _hover={{
                        bg: "blue.400",
                      }}
                      _current={{
                        bg: "blue.300",
                        fontSize: "sm",
                        w: 7,
                      }}
                    />
                  ))}
                </PaginationPageGroup>
                <PaginationNext
                  lineHeight="none"
                  color="white"
                  _hover={{
                    bg: "blue.400",
                  }}
                  bg="blue.300"
                  borderRadius="6px"
                >
                  <Text>Next</Text>
                </PaginationNext>
              </PaginationContainer>
            </Pagination>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Groups;
