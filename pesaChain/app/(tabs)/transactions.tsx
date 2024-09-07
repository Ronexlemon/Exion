import { StyleSheet, View, StatusBar as RNStatusBar, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GroupedTransactions from '@/components/Transactions';
import { PrimaryFontBold} from '@/components/PrimaryFontBold';
import SecondaryButton from '@/components/SecondaryButton';
import reusableStyle from '@/constants/ReusableStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import * as SecureStore from "expo-secure-store"
import { Transactions as Trans} from '@/types/datatypes';
import { TOKEN_KEY } from '../context/AuthContext';
import { getBalances, Transaction } from '../Apiconfig/api';

const transactions = [
    { id: '1', username: 'Mark Monde', transactionType: 'sendMoney', amount: 250, date: '2024-08-22T10:30:00Z' },
    { id: '2', username: 'Samantha Reynolds', transactionType: 'funding', amount: 175, date: '2024-08-21T12:00:00Z' },
    { id: '3', username: 'James Smart', transactionType: 'sendMoney', amount: 100, date: '2024-08-08T09:00:00Z' },
    { id: '4', username: 'Emeka Ciroma', transactionType: 'funding', amount: 210, date: '2024-08-22T08:00:00Z' },
    { id: '5', username: 'John Doe', transactionType: 'lipaNaMpesa', amount: 375, date: '2024-08-21T12:00:00Z' },
    { id: '6', username: 'William Ndoe', transactionType: 'sendMoney', amount: 100, date: '2024-08-08T09:00:00Z' },
    { id: '7', username: 'Esprecious Mukhongolo', transactionType: 'paybill', amount: 250, date: '2024-08-22T08:00:00Z' },
    { id: '8', username: 'Dan Kai', transactionType: 'lipaNaMpesa', amount: 75, date: '2024-08-23T12:00:00Z' },
    { id: '9', username: 'William Ndoe', transactionType: 'sendMoney', amount: 100, date: '2024-08-23T09:00:00Z' },
    { id: '10', username: 'Esprecious Mukhongolo', transactionType: 'paybill', amount: 420, date: '2024-08-23T08:00:00Z' },
];

const statusBarHeight = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) + 25 : 0;

export default function Transactions() {
    const [transaction,setTransactions] = useState<Trans[]>([])

    useEffect(()=>{
        const token = async () => {
          const token = await SecureStore.getItemAsync(TOKEN_KEY);
         
          if(token){
            const parsedToken = JSON.parse(token);
           
            const trans = await Transaction(parsedToken.token)
            setTransactions(trans.transactions)
    
           
           
    
    
    
          }
          
    
        }
        token()
    
      },[transaction])

    return (
        <View style={styles.container}>
            <StatusBar style={'dark'} />
            <View style={[reusableStyle.paddingContainer, reusableStyle.rowJustifyBetween, { paddingVertical: 20, backgroundColor: 'white' }]}>
                <PrimaryFontBold style={{ fontSize: 28 }}>Transactions</PrimaryFontBold>
                <SecondaryButton
                    route="/modal"
                    textOnButton="Filter"
                    icon={<Ionicons name="filter-outline" size={15} color="black" />}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0.8, borderColor: '#DFE4E5' }}
                    textStyle={{ fontSize: 16, color: "#074A4F" }}
                />
            </View>
            <GroupedTransactions transactions={transaction} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: statusBarHeight,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

