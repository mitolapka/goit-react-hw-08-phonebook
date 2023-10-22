import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Flex} from '@chakra-ui/react';
import { ContactForm } from 'components/contactForm';
import { Contacts } from 'components/contacts';
import { selectContacts, selectError, selectErrorNotify} from 'redux/contacts/selectors';
import { addContact} from 'redux/contacts/operations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactsPage = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectError);
  const errorNotify = useSelector(selectErrorNotify);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    if (isError) {
      toast.error(errorNotify);
    }
  }, [isError, errorNotify]);

  const isAlreadyExists = inputName => {
    return contacts.some(({ name }) => name === inputName);
  };

  const onAddContact = (values, actions) => {
    if (isAlreadyExists(values.name)) {
      window.alert(values.name + ' is already in contacts.');
    } else {
      dispatch(addContact(values));
      actions.resetForm();
    }
  };

  return (
    <Container pt={4}>
      <Text fontSize="27" fontWeight="bold" textAlign="center" color="#1E27E6" marginBottom={25}>
        Your phonebook
      </Text>
      <Flex> 
        <ContactForm
          initialValues={{
            name: '',
            number: '',
          }}
          onSubmit={onAddContact}
          style={{
            maxWidth: 500,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            padding: 4,
          }}
        >
          Add contact
        </ContactForm>
        <Contacts />
      </Flex>
      <ToastContainer />
   
    </Container>
  );
};
