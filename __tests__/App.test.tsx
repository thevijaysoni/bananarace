import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';
import {saveSearchResultAction} from '../src/redux/actions/searchActions';

const mockData = {
  '00D1LA8puAa1GINkVpfgC1TmO0m1': {
    bananas: 200,
    lastDayPlayed: '2018-11-22',
    longestStreak: 1,
    name: 'Rica Ella Francisco',
    stars: 6,
    subscribed: false,
    uid: '00D1LA8puAa1GINkVpfgC1TmO0m1',
  },
  x8RNvUgv5pZqDVatEXb2aYgSflq1: {
    bananas: 0,
    lastDayPlayed: '2017-11-01',
    longestStreak: 0,
    name: 'Adh Fuoo',
    stars: 4,
    subscribed: false,
    uid: 'x8RNvUgv5pZqDVatEXb2aYgSflq1',
  },
};

const initialState = {
  searchText: '',
  searchResult: [],
};

const mockStore = configureStore();

describe('App Component', () => {
  it('searches for a user and updates state', () => {
    const storeWithUser = mockStore({
      ...initialState,
      searchText: 'Rica Ella Francisco',
    });

    const {getByTestId} = render(
      <Provider store={storeWithUser}>
        <App />
      </Provider>,
    );

    fireEvent.press(getByTestId('search_button'));

    const result = [
      {
        ...mockData['00D1LA8puAa1GINkVpfgC1TmO0m1'],
        rank: 1,
        userRank: 1,
        isSearchedUser: true,
      },
    ];

    storeWithUser.dispatch(saveSearchResultAction(result));

    const actions = storeWithUser.getActions();

    const expectedPayload = {
      type: 'SEARCH_USER_SUCCESS',
      payload: [
        {
          ...mockData['00D1LA8puAa1GINkVpfgC1TmO0m1'],
          rank: 1,
          isSearchedUser: true,
          userRank: 1,
        },
      ],
    };
    expect(actions).toEqual([expectedPayload]);
  });
});
