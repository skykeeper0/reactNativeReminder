import React, { Component } from 'react'

import {
  TextInput,
  ListView,
  Text,
  View,
  AsyncStorage
} from 'react-native'

import TasksListCell from '../TasksListCell'
import EditTask from '../EditTask'
import styles from './styles'

export default class TasksList extends Component {
  constructor(props) {
    super(props) 

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
        onLongPress={() => this._editTask(rowData,rowId)}
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

  _editTask(rowData,rowId) {
    this.props.navigator.push({
      component: EditTask,
      title: rowData.text,
      passProps: { 
        completed: rowData.completed,
        due: '',
        formattedDate: '',
        text: rowData.text,
        changeText: (text) => this._changeTextAtRow(text,rowId),
      }
    })
  }

  async _changeTextAtRow(text,rowId) {
    const list = this.state.listOfTasks;
    list[rowId] = {
      text: text,
      completed: list[rowId].completed,
    }

    await AsyncStorage.setItem('list', JSON.stringify(list))

    this._updateList();
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks)
    return (
      <View style={styles.container}>
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
          automaticallyAdjustContentInsets={false}
          styles={styles.listView}
          renderRow={(rowData,sectionId,rowId) => this._returnTasksListCell(rowData,rowId)}
        />
      </View>
    )
  }
}