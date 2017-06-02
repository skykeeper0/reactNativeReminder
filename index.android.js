/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  // Navigator
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
          route={ route }
          saveCurrentEditedTask={ route.passProps.saveCurrentEditedTask}
          changeTaskCompletionStatus={
            route.passProps.changeTaskCompletionStatus 
          }
          changeTaskDueDate={ route.passProps.changeTaskDueDate }
          changeTaskName={ route.passProps.changeTaskName }
          completed={ route.passProps.completed }
          due={ route.passProps.due }
          formattedDate={ route.passProps.formattedDate }
          text={ route.passProps.text }
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

AppRegistry.registerComponent('Tasks', () => Tasks);
