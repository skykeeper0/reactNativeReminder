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

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks)
    return (
      <View>
        <TextInput
          autoCorrect={false}
          onChangeText={text => this._changeTextValue(text)}
          onSubmitEditing={() => this._addTask()}
          returnKeyType={'done'}
          style={styles.textInput}
          value={this.state.text}
        />
        <ListView
          dataSource={dataSource}
          enableEmptySections={ true }
          renderRow={(rowData,sectionId,rowId) => this._returnRowData(rowData,rowId)}
        />
      </View>
    )
  }

  async _addTask() {
    const singleTask = {
      completed: false,
      text: this.state.text
    }
    const newList = [...this.state.listOfTasks, singleTask]
    await AsyncStorage.setItem('listOfTasks', JSON.stringify(newList));

    this._updateList();
  }

  _changeTextValue(text) {
    this.setState({
      text
    })
  }

  async _completeTask (rowId) {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[rowId],
      completed: !this.state.listOfTasks[rowId].completed
    };

    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowId] = singleUpdatedTask;

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    this._updateList();
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

  async _updateList() {
    let response = await AsyncStorage.getItem('listOfTasks')
    let listOfTasks = await JSON.parse(response) || [];

    this.setState({
      listOfTasks,
      text:''
    })
  }
}