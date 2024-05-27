import {RankedUser, UserType} from '../../components/SearchModule';
import {ACTION_TYPE} from '../actionTypes';

export function setSearchTextAction(payload: string) {
  return {
    type: ACTION_TYPE.SET_SEARCH_TEXT,
    payload: payload,
  };
}

export function saveSearchResultAction(payload: RankedUser[]) {
  return {
    type: ACTION_TYPE.SEARCH_USER_SUCCESS,
    payload: payload,
  };
}
