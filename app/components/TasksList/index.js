import React, { Component } from 'react';

import {
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';

import styles from './styles';

export default class TasksList extends Component {
  constructor (props) {
    super (props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listofTasks: [],
      text: ''
    }
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={ rowData => 
          <Text> {rowData} </Text>}
      />  
    )
  }
}