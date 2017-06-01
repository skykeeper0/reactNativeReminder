/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import TasksList from './app/components/TasksList';
import EditTask from './app/components/EditTask'

export default class Tasks extends Component {
  _renderScene(route, navigator) {
    if (route.index === 0) {
      return (
        <TasksList
          title={ route.title }
          navigator={ navigator }
        />
      )
    }

    if (route.index === 1) {
      return (
        <EditTask
          navigator={ navigator }
          details={ route.passProps.details }
        />
      )
    }
  }

  render() {
    const routes = [
      {title: 'Tasks', index: 0},
      {title: 'Edit Task', index: 1}
    ]
    return (
      <Navigator
        initialRoute={{index: 0}}
        renderScene={ (routes, navigator) => 
          this._renderScene(routes, navigator)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Tasks', () => Tasks);
