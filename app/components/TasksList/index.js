import React, {Component} from 'react'

import {
  ListView,
  Text,
  TextInput,
  AsyncStorage,
  View,
} from 'react-native'

import styles from './styles'

export default class TasksList extends Component {
  constructor() {
    super()

    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      listOfTask: [],
      text: ''
    }
  }

  componentDidMount() {
    this._updateList()
  }

  _changeTextValue(text) {
    this.setState({
      text
    })
  }

  async _addTask() {
    const newList = [...this.state.listOfTask, this.state.text]

    await AsyncStorage.setItem('listOfTask', JSON.stringify(newList))

    this._updateList()
  }

  async _updateList() {
    const response = await AsyncStorage.getItem('listOfTask')
    const newList = JSON.parse(response) || []

    this.setState({
      listOfTask: newList,
      text:''
    })
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTask)
    return (
      <View>
        <TextInput
          autoCorrect={false}
          onChangeText={text => this._changeTextValue(text)}
          onSubmitEditing={() => this._addTask()}
          style={styles.textInput}
          value={this.state.text}
        />
        <ListView
          dataSource={dataSource}
          enableEmptySections={ true }
          renderRow={rowData => <Text>{rowData}</Text>}
        />
      </View>
    )
  }
}