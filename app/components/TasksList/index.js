import React, { Component } from 'react'

import {
  TextInput,
  ListView,
  Text,
  View,
  AsyncStorage
} from 'react-native'

import TasksListCell from '../TasksListCell'
import styles from './styles'

export default class TasksList extends Component {
  constructor() {
    super() 

    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      listOfTasks: [],
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
    const listOfTasks = [...this.state.listOfTasks, singleTask]

    await AsyncStorage.setItem('list', JSON.stringify(listOfTasks))

    // empty the cache for testing purpose
    // await AsyncStorage.setItem('list','')

    this._updateList()
  }

  async _updateList() {
    const response = await AsyncStorage.getItem('list')
    const listOfTasks = JSON.parse(response) || []

    this.setState({
      listOfTasks,
      text: ''
    })

  }

  _returnTasksListCell(rowData, rowId) {
    return (
      <TasksListCell
        completed={rowData.completed}
        text={rowData.text}
        id={rowId}
        onPress={() => this._completeTask(rowId)}
      />
    )
  }

  async _completeTask(rowId) {
    const list = this.state.listOfTasks;
    list[rowId] = {
      text: list[rowId].text,
      completed: !list[rowId].completed
    }

    await AsyncStorage.setItem('list', JSON.stringify(list))

    this._updateList();
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks)
    return (
      <View>
        <TextInput
          autoCorrect={false}
          onChangeText={(text) => this._changeTextValue(text)}
          onSubmitEditing={ () => this._addTask()}
          style={styles.textInput}
          value={this.state.text}
        />
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(rowData,sectionId,rowId) => this._returnTasksListCell(rowData,rowId)}
        />
      </View>
    )
  }
}