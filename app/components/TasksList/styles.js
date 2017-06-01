import { StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
  listView: {
    margin: 10,
    padding: 10
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    margin: 10,
    padding: 10
  },
  androidTextInput: {
    height: 40,
    margin: 10,
    padding: 10
  }
});

export default styles;