import * as React from 'react';
import { View, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { lazyInject } from '../dinjector';
import { TYPES as TypesRepositories, ItemRepository } from '../repositories';
import { ItemInterface } from '../interfaces';
import { List } from '../components/list';

export class Settings extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        );
    }
}