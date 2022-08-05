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
  getSubjectsAction,
  getSubjectsByPageAndSizeAction,
} from "../../../actions/subjectActions";
import {
  deleteApplicationByIdAction,
  getApplicationsByPageAndSizeAction,
} from "../../../actions/applicationActions";
import { dateHelper } from "../../../utils/dateHelper";
import ApplicationViewModal from "./ApplicationViewModal";

const Applications = () => {
  const history = useHistory();

  const [pageCount, setPageCount] = useState(0);
  const [applications, setApplications] = useState([]);
  const newApplications = useSelector(
    (state) => state.applicationReducer.applications
  );
  const total = useSelector((state) => state.applicationReducer.count);
  const isFetching = useSelector(
    (state) => state.applicationReducer.isFetching
  );
  const token = useSelector((state) => state.authReducer.jwt);
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

  function handleDelete(id) {
    let promise = dispatch(deleteApplicationByIdAction(id, token));
    promise.then(() => {
      let pageTake = page ? currentPage - 1 : currentPage;
      dispatch(getApplicationsByPageAndSizeAction(pageTake, size, token));
      setPageCount(Math.ceil(total / size));
      setApplications(newApplications);
    });
  }

  const dispatch = useDispatch();

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch(getApplicationsByPageAndSizeAction(number - 1, size, token));
    setApplications(newApplications);
  };

  useEffect(() => {
    let pageTake = page ? currentPage - 1 : currentPage;
    dispatch(getApplicationsByPageAndSizeAction(pageTake, size, token));
    setPageCount(Math.ceil(total / size));
    setApplications(newApplications);
  }, []);

  useEffect(() => {
    if (newApplications) {
      setApplications(newApplications);
    }
  }, [newApplications]);

  function handleView(a) {
    setApplication(a);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [application, setApplication] = useState(null);

  function handleModal() {
    setIsOpen((prev) => !prev);
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
          height="700px"
          justifyContent="space-between"
        >
          {isFetching || !applications ? (
            <SpinnerComponent />
          ) : applications && applications.length == 0 ? (
            <Text
              pos="absolute"
              left="50%"
              zIndex="2"
              fontSize="3xl"
              fontWeight="bold"
              top="50%"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              You have no applications..
            </Text>
          ) : (
            <Box overflowX="auto" width="100%">
              {isFetching || !applications ? null : (
                <Text fontSize="2xl" fontWeight="bold">
                  Applications
                </Text>
              )}
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Id</Th>
                    <Th textAlign="center">Post time</Th>
                    <Th textAlign="center">View</Th>
                    <Th textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {applications.map((a, index) => {
                    const { id, creationDate } = a;
                    let date = dateHelper.normalizedDateWithTime(creationDate);
                    return (
                      <Tr key={index}>
                        <Th textAlign="center">{id}</Th>
                        <Td textAlign="center">{date}</Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="blue"
                            onClick={() => handleView(a)}
                          >
                            View
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            onClick={() => handleDelete(id)}
                            colorScheme="pink"
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                  <ApplicationViewModal
                    application={application}
                    onClick={setIsOpen((prev) => !prev)}
                    value={isOpen}
                  />
                </Tbody>
              </Table>
            </Box>
          )}
          {(!isFetching || applications) && (
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

export default Applications;
