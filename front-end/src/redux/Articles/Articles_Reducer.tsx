import {FETCH_ALL_ARTICLE_BUTTONS, LOST_TICKET} from './Types';
  
  const initState = {article_buttons: [], article: false};
  
  const Articles_Reducer = (state = initState, action) => {
    switch (action.type) {
      case FETCH_ALL_ARTICLE_BUTTONS:
        return { ...state, article_buttons: action.payload };
      case LOST_TICKET:
        return { ...state, article: true };
      default:
        return state;
    }
  };
  
  export default Articles_Reducer;
  