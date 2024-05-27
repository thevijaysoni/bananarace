import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {saveSearchResultAction} from '../redux/actions/searchActions';
import {RootState} from '../redux/store';
import {ICON_PATHS} from '../utilities/iconPaths';
import {RankedUser} from './SearchModule';

interface searchResultListRowProps {
  name: string;
  rank: string;
  numOfBanana: string;
  isHeader: boolean;
  isLast?: boolean;
  isSearchedUser?: boolean;
}

interface searchResultListHeaderProps {}

const SearchResultListHeader =
  ({}: searchResultListHeaderProps): React.JSX.Element => {
    const dispatch = useDispatch();
    const {searchResult} = useSelector(
      (state: RootState) => ({
        searchResult: state.searchReducer.searchResult,
      }),
      shallowEqual,
    );

    const handleSortByName = () => {
      const sortedByName = [...searchResult].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      dispatch(saveSearchResultAction(sortedByName));
    };

    const handleSortByRank = () => {
      const sortedByRank = [...searchResult].sort((a, b) => a.rank - b.rank);
      dispatch(saveSearchResultAction(sortedByRank));
    };

    return (
      <View style={styles.tableRow}>
        <TouchableOpacity
          style={styles.tableHeaderCell}
          activeOpacity={0.5}
          onPress={() => handleSortByName()}>
          <Text style={styles.tableHeaderText}>{'Name'}</Text>
          <Image source={ICON_PATHS.SORT} style={styles.sortIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tableHeaderCell,
            {borderLeftWidth: 1, borderRightWidth: 1},
          ]}
          activeOpacity={0.5}
          onPress={() => handleSortByRank()}>
          <Text style={styles.tableHeaderText}>{'Rank'}</Text>
          <Image source={ICON_PATHS.SORT} style={styles.sortIcon} />
        </TouchableOpacity>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>{'Bananas'}</Text>
        </View>
      </View>
    );
  };

const SearchResultListRow = ({
  name,
  rank,
  numOfBanana,
  isLast,
  isSearchedUser,
}: searchResultListRowProps): React.JSX.Element => {
  return (
    <View style={[styles.tableRow, isLast && {borderBottomWidth: 0}]}>
      <View style={styles.tableCell}>
        <Text
          style={[styles.tableRowText, isSearchedUser && {color: '#DC5F00'}]}>
          {name}
        </Text>
      </View>
      <View
        style={[styles.tableCell, {borderLeftWidth: 1, borderRightWidth: 1}]}>
        <Text style={styles.tableRowText}>{rank}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableRowText}>{numOfBanana}</Text>
      </View>
    </View>
  );
};

function SearchResult(): React.JSX.Element {
  const {searchResult} = useSelector(
    (state: RootState) => ({
      searchResult: state.searchReducer.searchResult,
    }),
    shallowEqual,
  );

  if (searchResult.length === 0) {
    return <></>;
  }

  return (
    <View style={styles.mainContainer}>
      <SearchResultListHeader key={'ServiceReviewListComponentHeader'} />
      <FlatList
        data={searchResult ? searchResult : []}
        renderItem={({item, index}: {item: RankedUser; index: number}) => {
          return (
            <SearchResultListRow
              key={'ServiceReviewListComponentRow' + index}
              name={item.name}
              rank={item.rank + ''}
              numOfBanana={item.bananas + ''}
              isHeader={false}
              isLast={searchResult.length - 1 === index}
              isSearchedUser={item.isSearchedUser}
            />
          );
        }}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  tableHeaderCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  tableRowText: {
    fontSize: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sortIcon: {
    height: 12,
    width: 12,
  },
});

export default SearchResult;
