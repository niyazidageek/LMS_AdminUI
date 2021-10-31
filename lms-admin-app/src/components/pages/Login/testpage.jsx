// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Form, Field, FieldArray } from 'formik';
// import {authCreator} from '../../../redux/authCreator'
// import signInSchema from '../../../validations/signInSchema';
// import { NavLink, Redirect } from 'react-router-dom';
// import validateEmail from '../../../validations/validateEmail';
// import validatePassword from '../../../validations/validatePassword';
// import {
//     FormControl,
//     FormLabel,
//     FormErrorMessage,
//     Flex,
//     Box,
//     Input,
//     Checkbox,
//     Stack,
//     Link,
//     Button,
//     Heading,
//     Text,
// } from "@chakra-ui/react"
// import { AuthErrorAlert } from '../../alerts/AuthErrorAlert';
// import { AuthMessageAlert } from '../../alerts/AuthMessageAlert';
// import RequestResetPassword from '../RequestResetPassword/RequestResetPassword';
// import { getStudents } from '../../../services/studentService';


// const testpage = () => {

//     let reader = new FileReader();

//     function handleSubmit(values) {
//         const {file} = values;
//         // reader.readAsDataURL(file)
//         // console.log(file);
//         console.log(values);
//     }



//     return (
//         <> 
//         <AuthErrorAlert />
//         <AuthMessageAlert />
//         <Flex
//             minH={'100vh'}
//             align={'center'}
//             justify={'center'}
//             >
//             <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//                 <Stack align={'center'}>
//                     <Heading fontSize={'4xl'}>Sign in to your account</Heading>
//                     <Text fontSize={'lg'} color={'gray.600'}>
//                         to manage the system!
//                     </Text>
//                 </Stack>
//                 <Box
//                     boxSize={'md'}
//                     rounded={'lg'}
//                     boxShadow={'lg'}
//                     height={'max-content'}
//                     p={8}>
//                     <Formik
//                     initialValues={
//                         {
//                             email: '',
//                             password:'',
//                             rememberMe:false,
//                             friends:['mestan']
//                         }
//                     }
                    
//                     onSubmit={handleSubmit}
//                     >
//                     <Form>
//                     <Stack spacing={6}>
//                         <FormControl id="email">
//                         <Field name="email" >
//                             {({ field, form }) => (
//                                 <FormControl isInvalid={form.errors.email && form.touched.email}>
//                                     <FormLabel htmlFor="email">E-mail</FormLabel>
//                                     <Input type='email' {...field} placeholder="E-mail" />
//                                     <FormErrorMessage>{form.errors.email}</FormErrorMessage>
//                                 </FormControl>
//                             )
//                             }
//                         </Field>
//                         </FormControl>
//                         <FormControl id="password">
//                         <Field name="password" >
//                             {({ field, form }) => (
//                                 <FormControl isInvalid={form.errors.password && form.touched.password}>
//                                     <FormLabel htmlFor="password">Password</FormLabel>
//                                     <Input type='password' {...field} placeholder="Password" />
//                                     <FormErrorMessage>{form.errors.password}</FormErrorMessage>
//                                 </FormControl>
//                                 )
//                             }
//                         </Field>
//                         </FormControl>

//                         {/* test */}

//                         <FormControl id="file">
//                         <Field name="file" >
//                             {({ field, form }) => (
//                                 <FormControl isInvalid={form.errors.file && form.touched.file}>
//                                     <FormLabel htmlFor="file">File</FormLabel>
//                                     <Input type="file" placeholder="File" 
//                                     onChange={(event) => {
//                                     form.setFieldValue(field.name, event.currentTarget.files[0])}} 
//                                     />
//                                     <FormErrorMessage>{form.errors.file}</FormErrorMessage>
//                                 </FormControl>
//                             )
//                             }
//                         </Field>
//                         </FormControl>

//                         {/* test */} 

//                         {/* test */}

//                         <FormControl id="file">
//                         <Field name="file" >
//                             {({ field, form }) => (
//                                 <FormControl isInvalid={form.errors.file && form.touched.file}>
//                                     <FormLabel htmlFor="file">File</FormLabel>
//                                     <Input type="file" placeholder="File"
//                                     onChange={(event) => {
//                                     form.setFieldValue(field.name, event.currentTarget.files[0])}} 
//                                     />
//                                     <FormErrorMessage>{form.errors.file}</FormErrorMessage>
//                                 </FormControl>
//                             )
//                             }
//                         </Field>
//                         </FormControl>

//                         {/* test */}





//                         {/* testarray */}


//                         <FieldArray
//                             name="file"
//                         >
//                              {({field,form,arrayHelpers})=>(
//                                     <div>
//                                     {form.file && form.file.length > 0 ? (
//                                     form.file.map((friend, index) => (
//                                         <div key={index}>
//                                         <Field name={`file.${index}`} />
//                                         <button
//                                             type="button"
//                                             onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                                         >
//                                             -
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
//                                         >
//                                             +
//                                         </button>
//                                         </div>
//                                     ))
//                                     ) : (
//                                     <button type="button" onClick={() => arrayHelpers.push("")}>
//                                         {/* show this when user has removed all friends from the list
//                                         {/* Add a friend */}
//                                     </button>
//                                     )}
//                                     <div>
//                                     <button type="submit">Submit</button>
//                                     </div>
//                                 </div>
//                                 )
//                              }
//                         </FieldArray>  


//                         {/* testarray */}







//                         <Stack spacing={8}>
//                             <Stack
//                                 direction={{ base: 'column', sm: 'row' }}
//                                 align={'start'}
//                                 justify={'space-between'}>
                                    
//                             <Field  name="rememberMe">
//                                 {({ field }) => (
//                                     <Checkbox {...field}>
//                                         <Text fontSize="sm" textAlign="left">
//                                             Remember me
//                                         </Text>
//                                     </Checkbox>
                                    
//                                 )
//                                 }
//                             </Field>  
                                
//                                 <NavLink exact to="/requestresetpassword" >
//                                         <Link fontSize="sm" color={'blue.400'}>
//                                             Forgot password
//                                         </Link>
//                                 </NavLink>
//                             </Stack>
//                             <Button
//                                 type="submit"
//                                 bg={'blue.400'}
//                                 color={'white'}
//                                 _hover={{
//                                     bg: 'blue.500',
//                                 }}>
//                                 Sign in
//                             </Button>
//                         </Stack>
//                     </Stack>
//                     </Form>
//                     </Formik>
//                 </Box>
//             </Stack>
//         </Flex>
//         </>
//     );
// }

// export default testpage;














import React from "react";
import { render } from "react-dom";
import { Formik, Field, Form, FieldArray, validateYupSchema, FormLabel, FormErrorMessage } from "formik";
import { Button } from "@chakra-ui/button";

let reader = new FileReader();


const testpage = () => {
  
    function handleSubmit(values){
        console.log(values);
    }

   return(
       <>
        <Formik
        initialValues={
            {
            files:[
                {
                    file:''
                }
            ]
            }
        }
        onSubmit={handleSubmit}
        >
        <Form>
            <FieldArray
              name="files"
            >
                {({field, push, remove, form,})=>(
                    <div>
                    {form.values.files.length > 0 &&
                      form.values.files.map((file,index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <Field
                            name={`files.${index}.name`}
                            onChange={(event) => {
                                const file = event.target.files[0];
                                reader.readAsDataURL(file);
                                form.setFieldValue(`files.${index}.file`,file)
                            }}
                            type="file"
                            />
                            
                          </div>
  
                          <div key={index} className="col">
                            <button
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      className="secondary"
                      onClick={() => push({})}
                    >
                      Add Friend
                    </button>
                  </div>
                )
                }
            </FieldArray>
            <br />
           
          <Button type="submit">Submit</Button>
          </Form>

    </Formik>
       </>
            )

   };

export default testpage;