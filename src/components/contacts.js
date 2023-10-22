import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { Filter } from 'components/filter';
import { selectFilteredContacts } from 'redux/contacts/selectors';
import { deleteContact, fetchAll } from 'redux/contacts/operations';

export const Contacts = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const btnColor = 'red.700';

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Box>
      <Filter />
      <List>
        {filteredContacts.map(({ name, number, id }) => (
          <ListItem key={id} display="flex" alignItems="center">
            <IconButton borderColor="transparent"
              variant="outline"
              colorScheme={btnColor}
              aria-label="delete"
              onClick={() => dispatch(deleteContact(id))}
              marginRight={7}
            >
              <DeleteIcon />
            </IconButton>
            <Text flex="1">{name}: {number}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
