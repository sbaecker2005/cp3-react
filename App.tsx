import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { FormScreen } from './src/screens/FormScreen';
import { theme } from './src/theme';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="auto" />
      <FormScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.bg,
  },
});
