import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export class List extends React.Component {

    private keyExtractor = (item, index) => item.id;

    private renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.props.onPressItem(item)}
            >
                <Text style={{ textAlign: 'center' }}>{item.value}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        let { items } = this.props;
        if (items === null || items.length === 0) {
            return null;
        }

        return (
            <FlatList
                data={items}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#aaffaa',
        borderColor: 'black',
        borderBottomWidth: 1,
    },
});