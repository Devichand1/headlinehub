import React from 'react';
import {SafeAreaView} from 'react-native';

import NavigationWrapper from './src/navigations/NavigationContainer';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <NavigationWrapper />
    </SafeAreaView>
  );
}

export default App;
