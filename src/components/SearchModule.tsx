import Fuse from 'fuse.js';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  saveSearchResultAction,
  setSearchTextAction,
} from '../redux/actions/searchActions';
import {AppDispatch, RootState} from '../redux/store';
import {ICON_PATHS} from '../utilities/iconPaths';

export interface UserType {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
  isSearchedUser: boolean;
}

export interface RankedUser extends UserType {
  rank: number;
  userRank?: number;
}

const mockData: {
  [key: string]: UserType;
} = require('../utilities/leaderboard.json');

const fuse = new Fuse(Object.values(mockData), {
  keys: ['name'],
  threshold: 0.3,
});

function SearchModule(): React.JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const [containerFlexValue, setcontainerFlexValue] = useState(
    new Animated.Value(1),
  );

  const {searchResult, searchText} = useSelector(
    (state: RootState) => ({
      searchResult: state.searchReducer.searchResult,
      searchText: state.searchReducer.searchText,
    }),
    shallowEqual,
  );

  const handleSearch = async () => {
    const results = fuse.search(searchText);

    if (results.length === 0) {
      Alert.alert(
        'This user name does not exist! Please specify an existing user name!',
      );
      return;
    }

    const user = results[0].item;

    const sortedUsers = Object.values(mockData).sort(
      (a, b) => b.bananas - a.bananas,
    );
    const top10 = sortedUsers.slice(0, 10);

    const userRank = sortedUsers.findIndex(u => u.uid === user.uid) + 1;

    if (userRank > 10) {
      top10[9] = user;
    }
    const sortedData = top10.map((u, index) => ({
      ...u,
      rank: index + 1,
      userRank: u.uid === user.uid ? userRank : index + 1,
      isSearchedUser: u.uid === user.uid,
    }));
    dispatch(saveSearchResultAction(sortedData));
  };

  const clearSearch = () => {
    dispatch(setSearchTextAction(''));
    dispatch(saveSearchResultAction([]));
  };

  useEffect(() => {
    if (searchResult) {
      Animated.timing(containerFlexValue, {
        toValue: searchResult.length > 0 ? 0.3 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [searchResult]);

  return (
    <Animated.View style={[styles.mainContainer, {flex: containerFlexValue}]}>
      <View style={styles.searchInputButtonContainer}>
        <View style={styles.searchInputContainer}>
          <Image source={ICON_PATHS.SEARCH} style={styles.searchIcon} />
          <TextInput
            placeholder="User name"
            style={styles.input}
            onChangeText={text => dispatch(setSearchTextAction(text))}
            value={searchText}
            editable={searchResult.length === 0}
          />
        </View>
        <TouchableOpacity
          testID="search_button"
          style={styles.searchButton}
          onPress={() => {
            if (searchResult.length > 0) {
              clearSearch();
            } else {
              handleSearch();
            }
          }}>
          <Image
            source={
              searchResult.length > 0 ? ICON_PATHS.CLOSE : ICON_PATHS.SEARCH
            }
            style={styles.searchButtonIcon}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 24,
    justifyContent: 'center',
  },
  searchInputButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 52,
    height: 52,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginRight: 12,
  },
  searchButton: {
    height: 52,
    width: 52,
    backgroundColor: 'black',
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonIcon: {
    tintColor: 'white',
    height: 18,
    width: 18,
  },
  clearButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  clearButtonText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SearchModule;
