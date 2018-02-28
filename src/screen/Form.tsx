import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { lazyInject } from '../dinjector';
import { TYPES as TypesRepositories, ItemRepository } from '../repositories';
import t from 'tcomb-form-native';
import { Button } from '../react-native-material-design/lib';
import { WeekdaysFormFactory } from '../components/Weekdays';

export class Form extends React.Component {
    static navigationOptions = {
        title: 'New Schedule',
        headerRight: null,
    };

    @lazyInject(TypesRepositories.ItemRepository)
    private itemRepository: ItemRepository;

    constructor(props: any) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            value: params || {},
        };
    }

    onChange = (value: any) => {
        this.setState({ value });
    };

    onPress = () => {
        let form = this.refs.form;
        let value = form.getValue();
        if (!value) {
            console.log(form.validate());
            return;
        }
        if (value.id === null) {
            delete value.id;
        }
        this.itemRepository.save(value)
            .subscribe(() => this.props.navigation.goBack());
    };

    render() {
        const User = t.struct({
            id: t.maybe(t.Any),
            name: t.String,
            hour: t.String,
            repeat: t.Number,
            weekdays: t.maybe(t.Any),
        });
        const Form = t.form.Form;
        const options = {
            fields: {
                weekdays: {
                    factory: WeekdaysFormFactory,
                },
                id: {
                    hidden: true
                },
            }
        };
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Form
                    ref="form"
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <Button text="Save" raised={true} onPress={this.onPress} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 20
    },
});