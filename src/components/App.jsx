import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ContactsPage } from 'pages/contactsPage';
import '../index.css';
import { LoginPage } from 'pages/loginPage';
import { RegistrationPage } from 'pages/registrationPage';
import { refreshUser } from 'redux/auth/operations';
import { Navigations } from './navigations';
import { RestrictedRoute } from './restrictedRoute';
import { PrivateRoute } from './privateRoute';
import { ErrorPage } from 'pages/errorPage';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Container maxW="container.lg">
      <Box mb={8}>
        <Navigations />
      </Box>
      <Routes>
        <Route path="/" element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />} />
        <Route path="/contacts" element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />} />
        <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />} />
        <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Container>
  );
};

