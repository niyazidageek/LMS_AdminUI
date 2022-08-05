import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "chakra-react-select";
import { NavLink, Redirect } from "react-router-dom";
import groupSchema from "../../../validations/groupSchema";
import {
  FormErrorMessage,
  Flex,
  Box,
  Checkbox,
  Stack,
  Link,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { createGroupAction } from "../../../actions/groupActions";
import { searchAllStudentsAction } from "../../../actions/studentActions";
import { searchAllTeachersAction } from "../../../actions/teacherActions";

const ApplicationViewModal = ({ onClick, value, application }) => {
  
  return (
    <>
      <Modal isOpen={value} size='3xl' onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Application</ModalHeader>
          <ModalCloseButton />
            <Text>
                saddada
            </Text>

        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplicationViewModal;
