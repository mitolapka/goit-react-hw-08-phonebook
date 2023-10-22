import { useDispatch } from 'react-redux';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { setFilter } from 'redux/contacts/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <form>
      <InputGroup size="sm">
        <Input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => dispatch(setFilter(e.target.value))}
          pr="3rem"
          paddingLeft={22}
          h={25}
          borderRadius={3}
          borderColor="#1E27E6"  
          outline={"none"}
          _focus={{borderColor: "#1E27E6"}}
        />
        <InputLeftElement pointerEvents="none" marginTop={7} marginLeft={4}>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>
    </form>
  );
};
