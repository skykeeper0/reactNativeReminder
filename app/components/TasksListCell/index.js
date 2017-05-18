import React, { Component } from 'react'

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

export default class TasksListCell extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const completed = this.props.completed? 'line-through' : 'none'
    const styles = StyleSheet.create({
      text: {
        textDecorationLine: completed,
        backgroundColor: '#ffebcd'
      }
    })
    return (
      <View>
        <TouchableHighlight
          onPress={()=> this.props.onPress()}
          underlayColor={"#00ffff"}
        >
          <Text style={styles.text}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}