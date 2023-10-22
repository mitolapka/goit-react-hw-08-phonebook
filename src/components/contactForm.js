import * as yup from 'yup';
import { Box, Text } from '@chakra-ui/react';
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { selectLoading } from 'redux/contacts/selectors';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useSelector } from 'react-redux';

export const ContactForm = ({ children, initialValues, onSubmit }) => {
  const loading = useSelector(selectLoading);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
    number: yup
      .string()
      .matches(
        /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        'Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +'
      )
      .required(),
  });

  return (
    <Box
      style={{
        maxWidth: 500,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 24,
        padding: 4,
        marginRight: 150,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Field name="name">
            {({ field }) => (
              <Input
                {...field}
                placeholder="Name"
                type="text"
                variant="filled"
                size="sm"
                h={35}
                w={330}
                paddingLeft={22}
                marginBottom={9}
                borderWidth={1}
                borderRadius={3}
              />
            )}
          </Field>
          <ErrorMessage name="name" component={Text} color="red.500" />

          <Field name="number">
            {({ field }) => (
              <Input
                {...field}
                placeholder="Number"
                type="tel"
                variant="filled"
                size="sm"
                h={35}
                w={330}
                paddingLeft={22}
                borderWidth={1}
                borderRadius={3}
                marginBottom={9}
              />
            )}
          </Field>
          <ErrorMessage name="number" component={Text} color="red.500" />

          <Button
            type="submit"
            isLoading={loading}
            mt={2}
            boxShadow="lg"
            border="none"
            height="35px"
            width="100px"
            borderRadius="5"
            _hover={{ backgroundColor: "#9194E6", transition: "background-color 0.25s ease" }}
            marginLeft={120}
          >
            {children}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};
