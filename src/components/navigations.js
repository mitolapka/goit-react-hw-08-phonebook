import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'; // No longer using `useState`
import { useActivePage } from 'components/activePage';
import { Button, Menu, MenuButton, Text, Flex } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { logOut } from 'redux/auth/operations';
import { selectIsLoggedIn, selectUsersEmail } from 'redux/auth/selectors';

export const Navigations = () => {
  const dispatch = useDispatch();
  const activePageIndex = useActivePage();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const usersEmail = useSelector(selectUsersEmail);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
  }, [activePageIndex]);

  const logOutUser = () => {
    dispatch(logOut());
  };

  const handleButtonMouseEnter = () => {
    setIsHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="#D3D6E6"
      color="#1E27E6"
      sx={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Text fontSize={25} fontWeight="bold" marginLeft={30} h={40} marginTop={15} marginBottom={10}>
        Contacts
      </Text>
      {isLoggedIn ? (
        <Flex alignItems="center">
          <Button
            aria-label="account of current user"
            variant="outline"
            onClick={handleMenu}
            rightIcon={<div style={{ color: 'white' }}><FiUser /></div>}
            backgroundColor="#9194E6"
            fontSize={18}
            color="#1E27E6"
            marginRight={20}
            paddingRight={15}
            paddingTop={12}
            paddingBottom={12}
            borderRadius={50}
            borderColor="#1E27E6"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            cursor="pointer"
            _hover={{transition: "background-color 0.25s ease"}}
          >
            <div style={{ display: 'flex', alignItems: 'center', transition: "background-color 0.5s ease" }}>
              {isHovered && (
                <div style={{ marginLeft: '10px', color: "#fff", transition: "background-color 0.5s ease"}}>
                  {usersEmail}
                </div>
              )}
            </div>
          </Button>
          <Menu isOpen={isMenuOpen} onClose={handleMenu}>
            <MenuButton onClick={logOutUser} as={Button} borderRadius={3} borderColor="#1E27E6" backgroundColor="#D3D6E6" color="#1E27E6" marginRight={13} _hover={{backgroundColor: "#9194E6", transition: "background-color 0.25s ease", color: "#fff"}} fontSize={16}>
              Log out
            </MenuButton>
          </Menu>
        </Flex>
      ) : (
        <Flex alignItems="center" marginRight={30}>
          <Link to="/register" style={{ marginRight: '20px', textDecoration: 'none' }}>
            <Text fontSize="1xl" color="#1E27E6">
              Register
            </Text>
          </Link>
          <Link to="/login" style={{textDecoration: 'none'}}>
            <Text fontSize="1xl" color="#1E27E6">
              Log in
            </Text>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
