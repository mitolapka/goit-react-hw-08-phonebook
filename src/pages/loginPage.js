import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {Box, Input, InputGroup, InputLeftElement, Button, Alert, Text} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { selectLoading } from 'redux/contacts/selectors';
import { logIn } from 'redux/auth/operations';
import { selectIsError } from 'redux/auth/selectors';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email. For example user@gmail.com')
    .required(),
  password: yup.string().required(),
});

export const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectIsError);

  const logInUser = values => {
    dispatch(logIn(values));
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: logInUser,
  });

  return (
    
    <Box
      boxShadow="base"
      maxW="600px"
      mx="auto"
      p="6"
      borderRadius="md"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      textAlign="center"
      sx={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
      <Text fontSize={25} marginBottom={8} color="#1E27E6">Log in</Text>
        <Box mb="4">
          <InputGroup>
            <InputLeftElement pointerEvents="none" marginTop={10} marginLeft={4}>
              <EmailIcon color="gray.400" />
            </InputLeftElement>
            <Input
              name="email"
              type="email"
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
              placeholder="E-mail"
              h={35}
              w={330}
              paddingLeft={22}
              borderWidth={1}
              borderRadius={3}
            />
          </InputGroup>
          {formik.touched.email && formik.errors.email && (
            <Text color="red.500" fontSize="sm" mt="1">
              {formik.errors.email}
            </Text>
          )}
        </Box>

        <Box mb="4">
          <InputGroup>
            <InputLeftElement pointerEvents="none" marginTop={11} marginLeft={4}>
              <LockIcon color="gray.400" />
            </InputLeftElement>
            <Input
              name="password"
              type="password"
              variant="filled"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
              placeholder="Password"
              h={35}
              w={330}
              paddingLeft={22}
              borderWidth={1}
              borderRadius={3}
            />
          </InputGroup>
          {formik.touched.password && formik.errors.password && (
            <Text color="red.500" fontSize="sm" mt="1">
              {formik.errors.password}
            </Text>
          )}
        </Box>

        <Button
          type="submit"
          isLoading={loading}
          mt="2"
          colorScheme="teal"
          variant="solid"
  boxShadow="lg" 
  border="none" 
  h={35}
  width={80}
  borderRadius={5}
  _hover={{backgroundColor: "#9194E6", transition: "background-color 0.25s ease"}}
        >
          Log in
        </Button>
      </form>

      {error === 'login' && (
        <Alert status="error" mt="4">
          Invalid email or password. Please check your credentials and try again.
        </Alert>
      )}
    </Box>
  );
};
