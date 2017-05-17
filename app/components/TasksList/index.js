import React, {Component} from 'react'

import {
  ListView,
  Text,
  TextInput,
  AsyncStorage,
  View,
} from 'react-native'
import TasksListCell from '../TasksListCell'
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
    const singleTask = {
      completed: false,
      text: this.state.text
    }
    const newList = [...this.state.listOfTask, singleTask]
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

  _returnRowData(rowData, rowId) {
    return (
      <TasksListCell 
        completed={rowData.completed}
        id={rowId}
        onPress={ rowId => this._completeTask(rowId)}
        text={rowData.text}
      />
    )
  }

  _completeTask(rowId) {

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
          renderRow={(rowData,rowId) => <Text>{this._returnRowData(rowData,rowId)}</Text>}
        />
      </View>
    )
  }
}