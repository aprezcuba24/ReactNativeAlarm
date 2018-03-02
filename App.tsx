import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {routers, initialRouteName} from './src/routers';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        onPress={() => navigation.navigate('Form')}
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