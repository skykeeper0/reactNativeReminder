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

  expandableCellContainer: {
    flex: 1,
    overflow: 'hidden'
  }
})

export default styles;