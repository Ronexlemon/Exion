import React from "react";
import { SecondaryFontText } from "./SecondaryFontText";
import { PrimaryFontText } from "./PrimaryFontText";
import { StyleSheet, View } from "react-native";
import reusableStyles from '@/constants/ReusableStyles';

type FormDescriptionProps = {
    title: string;
    description: string;
}
export function FormDescription({title, description}: FormDescriptionProps) {
    return(
        <View style={[styles.container, reusableStyles.screenPaddingContainer]}>
            <SecondaryFontText style={styles.title}>{title}</SecondaryFontText>
            <PrimaryFontText style={styles.description}>{description}</PrimaryFontText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        zIndex: 1
    },
    title: {
        fontSize: 28,
        marginBottom: 5,
    },
    description:{
        fontSize: 19,
        marginTop: 8,
        paddingRight: 8
    }
})