import { StyleSheet } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'

const styles = StyleSheet.create({
  editTaskContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },

  clearDateButtonContainer: {
    flex: 1
  },

  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    margin: 10,
    padding: 10
  },

  expandableCellContainer: {
    flex: 1,
    overflow: 'hidden'
  }
})

export default styles;