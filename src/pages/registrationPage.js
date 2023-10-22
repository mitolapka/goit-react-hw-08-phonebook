import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Input, InputGroup, InputLeftElement, Button, Alert,Text} from '@chakra-ui/react';
import { EmailIcon, LockIcon, StarIcon } from '@chakra-ui/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectLoading } from 'redux/contacts/selectors';
import { register } from 'redux/auth/operations';
import { selectIsError } from 'redux/auth/selectors';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  email: yup
    .string()
    .email('Enter a valid email. For example user@gmail.com')
    .required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required(),
});

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectIsError);

  const createUser = values => {
    dispatch(register(values));
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: createUser,
  });

  return (
    <Box
      sx={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      maxW="600px"
      mx="auto"
      p="6"
      borderRadius="md"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      textAlign="center"
    >
      <form onSubmit={formik.handleSubmit}>
        <Text fontSize={25} marginBottom={8} color="#1E27E6">Sign up</Text>
        <Box mb="4">
          <InputGroup > 
            <InputLeftElement pointerEvents="none" marginTop={12} marginLeft={3}>
              <StarIcon color="gray.400" />
            </InputLeftElement>
            <Input
              name="name"
              type="text"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              placeholder="Name"
              h={35}
              w={330}
              paddingLeft={22}
              borderWidth={1}
              borderRadius={3}
            />
          </InputGroup>
          {formik.touched.name && formik.errors.name && (
            <Text color="red.500" fontSize="sm" mt="1">
              {formik.errors.name}
            </Text>
          )}
        </Box>

        <Box mb="4">
          <InputGroup> 
            <InputLeftElement pointerEvents="none" marginTop={21} marginLeft={3}>
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
              marginTop={8}
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
            <InputLeftElement pointerEvents="none" marginTop={21} marginLeft={2}>
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
              marginTop={8}
              paddingLeft={22}
              _focus={{borderColor: "#9194E6"}}
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
  Register
</Button>

      </form>

      {error === 'register' && (
        <Alert status="error" mt="4">
          Registration failed. Please try using a different email address.
        </Alert>
      )}
    </Box>
  );
};
