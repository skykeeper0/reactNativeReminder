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
      text: '',
      currentEditedTaskObject: undefined,
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

  // Task list cell 
  _returnTasksListCell(rowData, rowId) {
    return (
      <TasksListCell
        completed={rowData.completed}
        text={rowData.text}
        id={rowId}
        onPress={() => this._completeTask(rowId)}
        onLongPress={() => this._editTask(rowData, rowId)}
      />
    )
  }



  _completeTask(rowId) {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[rowId],
      completed: !this.state.listOfTasks[rowId].completed
    };

    this._saveAndUpdateSelectedTask(singleUpdatedTask, rowId)
  }

  async _saveAndUpdateSelectedTask(newTaskObject, rowId) {
    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowId] = newTaskObject;

    await AsyncStorage.setItem('list', JSON.stringify(listOfTasks));

    this._updateList();
  }

  // update the current editted task and go back to TaskList
  _saveCurrentEditedTask(rowId) {
    this._saveAndUpdateSelectedTask(this.state.currentEditedTaskObject, rowId)
    this.props.navigator.pop();
  }


  // update the date and the formattedDate of the current edited task object
  _updateCurrentEditedTaskDueDate(date, formattedDate) {
    this._updateCurrentEditedTaskObject('due', date);
    this._updateCurrentEditedTaskObject('formattedDate',formattedDate)
  }

  // accept a key, value and create a clone of currentEditedTaskObject with the new value and set it in state
  _updateCurrentEditedTaskObject(key, value) {
    let newTaskObject = Object.assign({}, this.state.currentEditedTaskObject);

    newTaskObject[key] = value;

    this.setState({
      currentEditedTaskObject: newTaskObject
    })
  }

  _editTask(rowData, rowId) {
    this.setState({
      currentEditedTaskObject: rowData
    })
    this.props.navigator.push({
      onRightButtonPress: () => this._saveCurrentEditedTask(rowId),
      rightButtonTitle: 'Save',
      component: EditTask,
      title: 'Edit',
      passProps: {
        changeTaskCompletionStatus: status => 
        this._updateCurrentEditedTaskObject('completed', status),

        changeTaskDueDate: (date, formattedDate) => 
        this._updateCurrentEditedTaskDueDate(date, formattedDate),

        changeTaskName: name => this._updateCurrentEditedTaskObject('text', name),

        clearTaskDueDate: () => 
        this._updateCurrentEditedTaskDueDate(undefined, undefined),

        completed: rowData.completed,
        due: rowData.due,
        formattedDate: rowData.formattedDate,
        text: rowData.text
      }
    })
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