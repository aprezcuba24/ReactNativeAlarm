import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

export const Weekdays = {
    SUNDAY: 'SUNDAY' as 'SUNDAY',
    MONDAY: 'MONDAY' as 'MONDAY',
    TUESDAY: 'TUESDAY' as 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY' as 'WEDNESDAY',
    THURSDAY: 'THURSDAY' as 'THURSDAY',
    FRIDAY: 'FRIDAY' as 'FRIDAY',
    SATURDAY: 'SATURDAY' as 'SATURDAY',
};
export type TWeekdays = keyof typeof Weekdays;

export class WeekdaysFormFactory extends t.form.Component {
    getTemplate() {
        return (locals: any) => {
            let onChange = (day: string) => {
                let value = locals.value || {};
                value[day] = !value[day];
                for (let key in Weekdays) {
                    value[Weekdays[key]] = value[Weekdays[key]] || false;
                }
                locals.onChange(value);
            };

            let stylesheet = locals.stylesheet;
            let formGroupStyle = stylesheet.formGroup.normal;
            let controlLabelStyle = stylesheet.controlLabel.normal;
            let helpBlockStyle = stylesheet.helpBlock.normal;
            let errorBlockStyle = stylesheet.errorBlock;

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
            let isChecked = (day: string) => {
                return locals.value && locals.value[day];
            };

            return (
                <View style={formGroupStyle}>
                    {label}
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => onChange(Weekdays.SUNDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.SUNDAY)? styles.itemChecked: {}]}>D</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChange(Weekdays.MONDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.MONDAY)? styles.itemChecked: {}]}>L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChange(Weekdays.TUESDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.TUESDAY)? styles.itemChecked: {}]}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChange(Weekdays.WEDNESDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.WEDNESDAY)? styles.itemChecked: {}]}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChange(Weekdays.THURSDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.THURSDAY)? styles.itemChecked: {}]}>J</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChange(Weekdays.FRIDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.FRIDAY)? styles.itemChecked: {}]}>V</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChange(Weekdays.SATURDAY)}>
                            <Text style={[styles.item, isChecked(Weekdays.SATURDAY)? styles.itemChecked: {}]}>S</Text>
                        </TouchableOpacity>
                    </View>
                    {help}
                    {error}
                </View>
            );
        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        paddingTop: 10,
        paddingLeft: 15,
        borderRadius: 40 / 2,
        borderWidth: 1,
        width: 40,
        height: 40,
    },
    itemChecked: {
        backgroundColor: '#f4511e',
        color: '#fff',
        borderColor: '#f4511e',
    }
});