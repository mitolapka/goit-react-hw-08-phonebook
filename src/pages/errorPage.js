import React from 'react';
import { Container, Text, Center } from '@chakra-ui/react';

export const ErrorPage = () => {
  return (
    <Container mt={3} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Oops! Page not found
      </Text>
      <Center mt={4}>
        <img
          src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=1060&t=st=1697475869~exp=1697476469~hmac=520cebc85a106787fa84a6cf1df3865e1c134345d245a2401bd7b13cadac8df9"
          alt="404 Page is not found"
          style={{
            display: 'inline-block',
          }}
        />
      </Center>
    </Container>
  );
};
