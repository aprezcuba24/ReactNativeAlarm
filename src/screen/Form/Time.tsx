import * as React from 'react';
import t from 'tcomb-form-native';
import { Text, View, StyleSheet, TextInput } from 'react-native';

export class TimeFormFactory extends t.form.Component {
    getTemplate() {
        return (locals: any) => {
            let stylesheet = locals.stylesheet;
            let formGroupStyle = stylesheet.formGroup.normal;
            let controlLabelStyle = stylesheet.controlLabel.normal;
            let helpBlockStyle = stylesheet.helpBlock.normal;
            let errorBlockStyle = stylesheet.errorBlock;
            let textboxStyle = stylesheet.textbox.normal;
            if (locals.hasError) {
                textboxStyle = stylesheet.textbox.error;
            }
            if (locals.editable === false) {
                textboxStyle = stylesheet.textbox.notEditable;
            }

            let label = locals.label ? (
                <Text style={controlLabelStyle}>{locals.label}</Text>
            ) : null;
            let help = locals.help ? (
                <Text style={helpBlockStyle}>{locals.help}</Text>
            ) : null;
            let error =
                locals.hasError && locals.error ? (
                <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                    {locals.error}
                </Text>
            ) : null;
            let value = locals.value;
            let onChange = (input, type) => {
                value[type] = parseInt(input);
                locals.onChange(value);
            };

            return (
                <View style={[formGroupStyle, styles.container]}>
                    {label}
                    <TextInput
                        keyboardType='numeric'
                        value={value.hour? value.hour.toString(): value}
                        onChangeText={(input) => onChange(input, 'hour')}
                        style={[textboxStyle, styles.hour]}
                    />
                    <Text style={styles.hourTwoPoint}>:</Text>
                    <TextInput
                        keyboardType='numeric'
                        value={value.minutes? value.minutes.toString(): value}
                        onChangeText={(input) => onChange(input, 'minutes')}
                        style={[textboxStyle, styles.hour]}
                    />
                    {help}
                    {error}
                </View>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hour: {
        width: 70,
        height: 70,
        fontSize: 30,
    },
    hourTwoPoint: {
        padding: 10,
        fontSize: 30,
    }
});