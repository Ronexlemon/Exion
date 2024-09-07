import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import reusableStyles from '@/constants/ReusableStyles'
import { PrimaryFontText } from './PrimaryFontText';
import { PrimaryFontMedium } from './PrimaryFontMedium';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TransactionTypeIcon from './TransactionTypeIcon';
import { Transactions } from '@/types/datatypes';

<StatusBar style={'dark'} />



type GroupedTransactions = {
    title: string;
    data: Transactions[];
};

const groupTransactionsByDate = (transactions: Transactions[]): GroupedTransactions[] => {
    const grouped: { [key: string]: Transactions[] } = {};

    transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.date);
        const today = new Date();

        let title;

        // Define the title for the group
        if (transactionDate.toDateString() === today.toDateString()) {
            title = `Today, ${transactionDate.toLocaleDateString()}`;
        } else {
            title = transactionDate.toLocaleDateString();
        }

        if (!grouped[title]) {
            grouped[title] = [];
        }

        grouped[title].push(transaction);
    });

    return Object.keys(grouped).map((key) => ({
        title: key,
        data: grouped[key],
    }));
};

export default function GroupedTransactions({ transactions  }: { transactions: Transactions[] }) {
    const sections = groupTransactionsByDate(transactions);
    let transactionType = ""
    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            style={[reusableStyles.paddingContainer, {backgroundColor: 'white'}]}
            renderItem={({ item }) => (
                <View style={[reusableStyles.rowJustifyBetween, styles.transactionItem, { alignItems: 'flex-start' }]}>
                    <View style={styles.flexRow}>
                        {item.type === "SENDMONEY" ?
                            <TransactionTypeIcon containerStyle={{ backgroundColor: '#FFE3E3' }} icon={<Feather name="arrow-up" size={13} color="#EA2604" />} />
                            : item.type === "FUNDING" ?
                                <TransactionTypeIcon containerStyle={{ backgroundColor: '#DDFFF1' }} icon={<Feather name="arrow-down" size={14} color="#1E8A5E" />} />
                                : item.type === "LIPANAMPESA" ?
                                    <TransactionTypeIcon containerStyle={{ backgroundColor: '#CDFFCA' }} icon={<Feather name="arrow-up-right" size={14} color="#52B44B" />} />
                                    : item.type === "paybill" ?
                                        <TransactionTypeIcon containerStyle={{ backgroundColor: '#F2F2F2' }} icon={<FontAwesome6 name="coins" size={12} color="#5DDD54" />} />
                                        : null

                        }


                        <View style={{ marginLeft: 10 }}>
                            <View style={styles.flexRow}>
                                <PrimaryFontText style={{ fontSize: 19 }}>{item.recipient}</PrimaryFontText>
                            </View>
                            <PrimaryFontText style={{ fontSize: 13, color: '#79828E', marginTop: 5 }}>
                                {item.type === "SENDMONEY" ? "Sent" 
                                : item.type === "FUNDING"? "Received" 
                                : item.type === "lipaNaMpesa" ? "Lipa na mpesa": "Paybill"}
                            </PrimaryFontText>
                        </View>
                    </View>
                    <View>
                        <PrimaryFontMedium style={{fontSize: 16.5, marginTop: 3}}>
                            { item.type === "FUNDING" ? "+" : "-"}Ksh {item.amount}
                        </PrimaryFontMedium>
                    </View>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                    <PrimaryFontText style={styles.sectionHeaderText}>{title}</PrimaryFontText>
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        padding: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
    },
    sectionHeaderText: {
        fontSize: 15,
        color: '#79828E'
    },
    transactionItem: {
        padding: 15,
        paddingLeft: 0,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

