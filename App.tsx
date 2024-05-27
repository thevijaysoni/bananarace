import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Header from './src/components/Header';
import SearchModule from './src/components/SearchModule';
import SearchResult from './src/components/SearchResult';
import {store} from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <Header />
        <SearchModule />
        <SearchResult />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
