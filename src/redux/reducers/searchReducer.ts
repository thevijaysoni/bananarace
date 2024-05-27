import {RankedUser, UserType} from '../../components/SearchModule';
import {ACTION_TYPE} from '../actionTypes';

interface searchUserReducerStateType {
  searchText: string;
  searchResult: RankedUser[];
}

const initialState: searchUserReducerStateType = {
  searchText: '',
  searchResult: [],
};

export default function searchReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTION_TYPE.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action?.payload,
      };
    case ACTION_TYPE.SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchResult: action?.payload,
      };
    default:
      return state;
  }
}
