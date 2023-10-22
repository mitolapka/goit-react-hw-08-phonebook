import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selectors';

export const useActivePage = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return 0;
  }

  switch (location.pathname) {
    case '/register':
      return 0;
    case '/login':
      return 1;
    default:
      return 1;
  }
};