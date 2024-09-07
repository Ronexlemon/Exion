import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { PrimaryFontMedium } from "./PrimaryFontMedium";
import { PrimaryFontText } from "./PrimaryFontText";

interface InputFieldProps {
    label: string;
    placeholder: string;
    onInputChange: (text: string) => void;
    error: boolean;
    errorDescription?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, onInputChange, error, errorDescription }) => {
    const [value, setValue] = useState('');

    const handleChange = (text: string) => {
        setValue(text);
        onInputChange(text);
    };
    return (
        <View style={styles.container}>
            <PrimaryFontMedium style={styles.label}>{label}</PrimaryFontMedium>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={'#D2D2D2'}
                value={value}
                onChangeText={handleChange}
            />
            {error ? <PrimaryFontText style={{marginTop: 10, color: 'red', fontSize: 15}}>{errorDescription}</PrimaryFontText> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 20,
        marginBottom: 22,
        color: '#052330',
    },
    input: {
        height: 55,
        borderColor: '#D4D4D4',
        borderWidth: 0.8,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#F8F8F8',
        fontFamily: 'DMSansRegular',
        paddingLeft: 20,
        fontSize: 18,
        color: 'black'
    },
});

export default InputField;
