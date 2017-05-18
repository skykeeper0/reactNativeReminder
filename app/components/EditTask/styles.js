import { StyleSheet } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'

const styles = StyleSheet.create({
  editTaskContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },

  editTaskText: {
    fontSize: 36,
    paddingTop: 65
  }
})

export default styles;