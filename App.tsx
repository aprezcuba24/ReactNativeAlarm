import * as React from 'react';
import { DrawerLayoutAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { List } from './src/components/list';
import { lazyInject } from './src/dinjector';
import { TYPES as TypesRepositories, ItemRepository } from './src/repositories';
import { ItemInterface } from './src/interfaces';
import MainNavigator from './src/routers';
import {routers, initialRouteName} from './src/routers';
import { Icon, Toolbar } from './src/react-native-material-design/lib';
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const TopBar = this.topBar();
    return (
      <TopBar />
    )
  }

  private renderTopBarHeaderRight(navigation) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('NewSchedule')}
      >
        <Icon name={'control-point'}
          size={30}
          color="#fff"
          style={styles.leftIcon}
        />
      </TouchableOpacity>
    );
  }

  private topBar() {
    return StackNavigator(routers,
      {
        initialRouteName: initialRouteName,
        navigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: this.renderTopBarHeaderRight(navigation),
        }),
      }
    );
  }
}

const styles = StyleSheet.create({
  leftIcon: {
    margin: 16,
  },
});