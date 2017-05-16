import React, { Component } from 'react'

import { ListView, Text, TextInput, View } from 'react-native'

import styles from './styles';

export default class TasksList extends Component {
  constructor() {
    super()

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listOfTasks: [],
      text:'',
    }
  }

  _changeTextInputValue(text) {
    this.setState({
      text
    })
  }

  _addTask() {
    const newListOfTasks = [...this.state.listOfTasks, this.state.text]
    console.log('State: tasks ',newListOfTasks,' text ', this.state.text)
    this.setState({
      listOfTasks: newListOfTasks,
      text: ''
    })
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks)
    console.log(dataSource)
    return (
      <View> 
        <TextInput
          autoCorrect={false}
          onChangeText={text => this._changeTextInputValue(text)}
          onSubmitEditing={() => this._addTask()}
          returnKeyType={'done'}
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