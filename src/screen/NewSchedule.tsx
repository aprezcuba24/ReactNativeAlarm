import * as React from 'react';
import { View, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { lazyInject } from '../dinjector';
import { TYPES as TypesRepositories, ItemRepository } from '../repositories';
import { ItemInterface } from '../interfaces';
import { List } from '../components/list';

export class NewSchedule extends React.Component {
    static navigationOptions = {
        title: 'New Schedule',
    };

    render() {
        return (
            <View>
                <Text>NewSchedule</Text>
            </View>
        );
    }
}