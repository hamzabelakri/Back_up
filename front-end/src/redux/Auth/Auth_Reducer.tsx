import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  OPERATOR_LOGIN,
  OPERATOR_LOGOUT,
  OPERATOR_PAUSE,
  OPERATOR_RESUME
} from './Types';

const getOperatorFromLocalStorage = () => {
  const storedOperator = localStorage.getItem('operator');
  return storedOperator ? JSON.parse(storedOperator) : null;
};

const initState = {
  admin: null,
  operator: getOperatorFromLocalStorage(),
  pause: null,
  resumed: null
};

const Auth_Reducer = (state = initState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, admin: action.payload };
    case ADMIN_LOGOUT:
      return { ...state, admin: null };
    case OPERATOR_LOGIN:
      localStorage.setItem('operator', JSON.stringify(action.payload));
      return { ...state, operator: action.payload };
    case OPERATOR_LOGOUT:
      localStorage.removeItem('operator');
      return { ...state, operator: null };
    case OPERATOR_PAUSE:
      return { ...state, pause: action.payload, operator: null };
    case OPERATOR_RESUME:
      return { ...state, resumed: action.payload, pause: null };
    default:
      return state;
  }
};

export default Auth_Reducer;
