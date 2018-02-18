import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Expo, { SQLite } from 'expo';
import { List } from './src/components/list';

const db = SQLite.openDatabase('db.db');

export default class App extends React.Component<{}> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: null,
      items: []
    };
  }

  componentDidMount() {
    db.transaction((tx: any) => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
      );
    });
    this.update();
  }

  private onPressItem = (item: any) => {
    Alert.alert(
      'Delete',
      'Do you want delete the item: ' + item.value + '?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.deleteItem(item) },
      ],
    )
  };

  private deleteItem = (item: any) => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(`delete from items where id = ?;`, [item.id]);
      },
      null,
      this.update
    );
  };

  private add = () => {
    let text = this.state.text;
    this.setState({text: null});
    db.transaction(
      (tx: any) => {
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
      },
      null,
      this.update
    );
  }

  private update = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `select * from items;`, [],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="what do you need to do?"
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={this.add}
        />
        <List
          items={this.state.items}
          onPressItem={this.onPressItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 50,
  },
  input: {
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  }
});
