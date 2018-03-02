import * as React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native';
import { Icon } from '../../react-native-material-design/lib';

export class List extends React.Component {

    static propTypes = {
        onPressItem: PropTypes.func,
        onDeleteItem: PropTypes.func,
    };

    private keyExtractor = (item, index) => item.id;

    private renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.props.onPressItem(item)}
            >
                <View style={styles.left}>
                    <Text style={styles.hour}>{item.hour}:{item.minutes}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.onDeleteItem(item)}>
                    <Icon name={'delete'}
                          size={20}
                          color="#f4511e"
                          style={styles.deleteIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

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
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 10,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        alignSelf: 'flex-start',
    },
    hour: {
        fontSize: 20,
    },
    name: {
        fontSize: 10,
    },
    deleteIcon: {
        alignSelf: 'flex-end',
    },
});