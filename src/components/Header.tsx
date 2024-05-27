import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Header(): React.JSX.Element {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{'Banana Race 🍌'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;
