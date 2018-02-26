import * as React from 'react';
import { View, Alert, TextInput, StyleSheet } from 'react-native';
import { lazyInject } from '../dinjector';
import { TYPES as TypesRepositories, ItemRepository } from '../repositories';
import { ItemInterface } from '../interfaces';
import { List } from '../components/list';

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

    private onPressItem = (item: any) => {
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

    private add = () => {
        let text = this.state.text;
        this.setState({ text: null });
        this.itemRepository.create({
            name: text,
        }).subscribe(() => this.update());
    }

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
        );
    }

    private update = () => {
        this.itemRepository.list().subscribe((items: ItemInterface[]) => this.setState({ items }));
    };
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