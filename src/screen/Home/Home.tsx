import * as React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { lazyInject } from '../../dinjector';
import { TYPES as TypesRepositories, ItemRepository } from '../../repositories';
import { ItemInterface } from '../../interfaces';
import { List } from './list';

export class Home extends React.Component {
    static navigationOptions = {
        title: 'List',
    };

    @lazyInject(TypesRepositories.ItemRepository)
    private itemRepository: ItemRepository;

    constructor(props: any) {
        super(props);
        this.state = {
            text: null,
            items: []
        };
        this.props.navigation.addListener('didFocus', () => this.update());
    }

    private onPressItem = (item: ItemInterface) => {
        this.props.navigation.navigate('Form', item);
    };

    private onDeleteItem = (item: any) => {
        Alert.alert(
            'Delete',
            'Do you want delete the item: ' + item.value + '?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.deleteItem(item) },
            ]
        )
    };

    private deleteItem = (item: ItemInterface) => {
        if (!item.id) {
            return;
        }
        this.itemRepository.remove(item.id).subscribe(() => this.update());
    };

    render() {
        return (
            <View style={styles.container}>
                <List
                    items={this.state.items}
                    onDeleteItem={this.onDeleteItem}
                    onPressItem={this.onPressItem}
                />
            </View>
        );
    }

    private update = () => {
        this.itemRepository.list().subscribe((items: ItemInterface[]) => this.setState({ items }));
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e4e6',
        justifyContent: 'center',
        padding: 10,
    },
});