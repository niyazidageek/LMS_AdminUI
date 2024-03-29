import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SpinnerComponent from "../../elements/SpinnerComponent";
import { Container, Flex } from "@chakra-ui/layout";
import { useLocation } from "react-router";
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
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
} from "@chakra-ui/react";

import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";

import {
  deleteSubjectByIdAction,
  getSubjectsAction,
  getSubjectsByPageAndSizeAction,
} from "../../../actions/subjectActions";
import CreateSubjectModal from "./CreateSubjectModal";

const Subjects = () => {
  const history = useHistory();

  const [pageCount, setPageCount] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const newSubjects = useSelector((state) => state.subjectReducer.subjects);
  const total = useSelector((state) => state.subjectReducer.count);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
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

  const dispatch = useDispatch();

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch(getSubjectsByPageAndSizeAction(number - 1, size));
    setSubjects(newSubjects);
  };

  useEffect(() => {
    let pageTake = page ? currentPage - 1 : currentPage;
    dispatch(getSubjectsByPageAndSizeAction(pageTake, size));
    setPageCount(Math.ceil(total / size));
    setSubjects(newSubjects);
  }, []);

  useEffect(() => {
    if (newSubjects) {
      setSubjects(newSubjects);
    }
  }, [newSubjects]);

  useEffect(() => {
    dispatch(getSubjectsAction());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleDelete(id){
   let promise= dispatch(deleteSubjectByIdAction(id));
   promise.then(()=>dispatch(getSubjectsAction()))

  }

  function handleEdit(id) {
    let path = `/admin/subjects/edit/${id}`;
    history.push(path);
  }

  return (
    console.log(total),
    <>
      <AuthMessageAlert />
      <AuthErrorAlert />
      <Box>
        <Flex
          display="flex"
          direction="column"
          alignItems="center"
          pos="relative"
          height="700px"
          justifyContent="space-between"
        >
          {isFetching || !subjects ? (
            <SpinnerComponent />
          ) : (
            <Box overflowX="auto" width="100%">
              {isFetching || !subjects ? null : (
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="2xl" fontWeight="bold">
                    Subjects
                  </Text>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => handleModal()}
                    margin="1rem"
                  >
                    Create subject
                  </Button>
                </Flex>
              )}
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Id</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Edit</Th>
                    <Th textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subjects.map((sb, index) => {
                    const { id, name } = sb;
                    return (
                      <Tr key={index}>
                        <Th textAlign="center">{id}</Th>
                        <Td textAlign="center">{name}</Td>
                        <Td textAlign="center">
                          <Button
                            color='white'
                            colorScheme="yellow"
                            onClick={() => handleEdit(id)}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button colorScheme="pink" onClick={()=>handleDelete(id)}>Delete</Button>
                        </Td>
                      </Tr>
                    );
                  })}
                  <CreateSubjectModal
                    onClick={() => handleModal()}
                    value={isOpen}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
          {!isFetching && (
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

export default Subjects;
