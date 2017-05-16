import React, { Component } from 'react'

import { 
  ListView, 
  Text, 
  TextInput, 
  View,
  AsyncStorage,
} from 'react-native'

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

  componentDidMount() {
    this._updateList();
  }

  _changeTextInputValue(text) {
    this.setState({
      text
    })
  }

  async _addTask() {
    const newListOfTasks = [...this.state.listOfTasks, this.state.text]
    await AsyncStorage.setItem('listOfTasks',JSON.stringify(newListOfTasks))

    this._updateList();
  }

  async _updateList() {
    let response = await AsyncStorage.getItem('listOfTasks');
    let listOfTasks = await JSON.parse(response) || [];

    this.setState({
      listOfTasks
    })

    this._changeTextInputValue('')
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks)
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