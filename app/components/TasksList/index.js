import React, { Component } from 'react'

import { ListView, Text } from 'react-native'

export default class TasksList extends Component {
  constructor() {
    super()

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(['row1','row2'])
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => <Text>{rowData}</Text>}
      />
    )
  }
}