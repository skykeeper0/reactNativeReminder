/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} from 'react-native';
import TasksList from './app/components/TasksList'

export default class Tasks extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TasksList,
          title: 'Tasks'
        }}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('Tasks', () => Tasks);
