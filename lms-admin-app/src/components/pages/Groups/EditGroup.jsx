import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {authCreator} from '../../../redux/authCreator'
import { useParams } from 'react-router';
import { Select } from 'chakra-react-select'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Flex,
    Box,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
} from "@chakra-ui/react"
import { AuthErrorAlert } from '../../alerts/AuthErrorAlert';
import { AuthMessageAlert } from '../../alerts/AuthMessageAlert';
import axios from 'axios';
import SpinnerComponent from '../../elements/SpinnerComponent';
import editGroupSchema from '../../../validations/editGroupSchema';


const EditGroup = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.jwt)
    const isFetching = useSelector(state=>state.authReducer.isFetching)
    const [dataDb, setDataDb] = useState(null);
    function handleSubmit(values) {
        let {name,subjectId,startDate,endDate,studentIds} = values;
        startDate = new Date(startDate).toISOString();
        endDate = new Date(endDate).toISOString();
        dispatch(authCreator.setIsFetching());
        axios({
            method: 'put',
            url: process.env.REACT_APP_EDIT_GROUP_API+id,
            headers:{"Authorization":`Bearer ${token}`},
            data: {
                name:name,
                subject:{
                    id:subjectId
                },
                startDate:startDate,
                endDate:endDate,
                appUsers:studentIds
            }
        })
        .then(response=>{
            dispatch(authCreator.setAuthMessage(response.data.message))
            dispatch(authCreator.disableIsFetching())
        })
        .catch(error=>{
            if(error.message == "Network Error" || error.message == "Request failed with status code 401"){
                dispatch(authCreator.setAuthError(error.message))
            }
            else{
                dispatch(authCreator.setAuthError(error.message))
            }
            dispatch(authCreator.disableIsFetching())
        })
    }

    useEffect(()=>{
        dispatch(authCreator.setIsFetching());
        axios.all([
            axios.get(process.env.REACT_APP_GET_SUBJECTS_API),
            axios.get(process.env.REACT_APP_GET_GROUP_BY_ID_API+id),
            axios.get(process.env.REACT_APP_GET_STUDENTS_API)
        ])
        .then(axios.spread((subj,gr,st)=>{
            setDataDb({
                subjects:subj.data,
                group:gr.data,
                allStudents:st.data
            })
            dispatch(authCreator.disableIsFetching());
        }))
        .catch(err=>{
            console.log(err);
            dispatch(authCreator.disableIsFetching());
        })
    },[])



    return (
        <> 
        <AuthErrorAlert />
        <AuthMessageAlert />
        <Box>
            <Flex
                display='flex'
                direction='column'
                alignItems='center'
                pos='relative'
            >   
                <SpinnerComponent />
        {
            dataDb ? (
            <Flex
            align={'center'}
            justify={'center'}
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Edit group</Heading>
                </Stack>
                <Box
                    boxSize={'md'}
                    rounded={'lg'}
                    boxShadow={'lg'}
                    height={'max-content'}
                    p={8}>
                    <Formik
                    initialValues={
                        {
                            name:dataDb.group.name,
                            subjectId:dataDb.group.subject.id,
                            startDate: dataDb.group.startDate.slice(0, 10),
                            endDate: dataDb.group.endDate.slice(0, 10),
                            studentIds:dataDb.group.appUsers.map(st=>({id:st.id}))
                        }
                    }
                    validationSchema={editGroupSchema}
                    onSubmit={handleSubmit}
                    >
                    <Form>
                    <Stack spacing={6}>
                        <FormControl id="name">
                        <Field name="name">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input {...field} placeholder="Name"/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )
                            }
                        </Field>
                        </FormControl>
                        <FormControl id="subjectId">
                                <Field  name="subjectId">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.subjectId && form.touched.subjectId}>
                                            <FormLabel htmlFor="subjectId">Subjects</FormLabel>
                                            <Select
                                            name="subjectId"
                                            closeMenuOnSelect={false}
                                            onChange={option=>{
                                                form.setFieldValue(field.name, option.value);
                                            }}
                                            defaultValue={{ label: dataDb.group.subject.name, value: dataDb.group.subject.id }}
                                            options={dataDb.subjects.map(s=>({label:s.name, value:s.id}))}
                                            />
                                            <FormErrorMessage>{form.errors.subjectId}</FormErrorMessage>
                                        </FormControl>
                                        )
                                    }
                                </Field>
                        </FormControl>
                        <FormControl id="startDate">
                        <Field name="startDate">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.startDate && form.touched.startDate}>
                                    <FormLabel htmlFor="startDate">Start Date</FormLabel>
                                        <Input {...field} type='date'/>
                                    <FormErrorMessage>{form.errors.startDate}</FormErrorMessage>
                                </FormControl>   
                                )
                            }
                        </Field>
                        <Field name="endDate">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.endDate && form.touched.endDate}>
                                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                                        <Input {...field} type='date'/>
                                    <FormErrorMessage>{form.errors.endDate}</FormErrorMessage>
                                </FormControl>   
                                )
                            }
                        </Field>
                        </FormControl>

                        <FormControl id="studentIds">
                            <Field  name="studentIds">
                                {({field, form}) => (
                                    <FormControl isInvalid={form.errors.studentIds && form.touched.studentIds}>
                                        <FormLabel htmlFor="studentIds">Select students</FormLabel>
                                        <Select
                                        isMulti
                                        name="studentIds"
                                        onChange={option=>{
                                            form.setFieldValue(field.name, option.map(opt=>({id:opt.value})));
                                        }}
                                        defaultValue={dataDb.group.appUsers.map(a=>({label:`${a.name} ${a.surname}`, value:a.id}))}
                                        options={dataDb.allStudents.map(a=>({label:`${a.name} ${a.surname}`, value:a.id}))}
                                        placeholder="Select students"
                                        closeMenuOnSelect={false}
                                        />
                                        <FormErrorMessage>{form.errors.studentIds}</FormErrorMessage>
                                    </FormControl>
                                    )
                                }
                            </Field>
                        </FormControl>


                        <Stack spacing={8}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                            </Stack>
                            <Button
                                isLoading={isFetching}
                                type="submit"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Save changes
                            </Button>
                        </Stack>
                    </Stack>
                    </Form>
                    </Formik>
                </Box>
            </Stack>
        </Flex>
            ) : (
                null
            )
        }    
            </Flex>
        </Box>
        </>
    );
}

export default EditGroup;