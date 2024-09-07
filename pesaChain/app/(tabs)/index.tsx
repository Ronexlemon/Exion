import React, { useRef, useMemo } from 'react';
import { StyleSheet, View, ImageBackground, Image, Platform, StatusBar as RNStatusBar, Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import reusableStyle from '@/constants/ReusableStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import userIcon from '@/assets/images/user.png'
import morning from '@/assets/icons/morning.png'
import noon from '@/assets/icons/noon.png'
import moon from '@/assets/icons/moon.png'
import { PrimaryFontText } from '@/components/PrimaryFontText';
import { PrimaryFontBold } from '@/components/PrimaryFontBold';
import { PrimaryFontMedium } from '@/components/PrimaryFontMedium';
import SecondaryButton from '@/components/SecondaryButton';
import GroupedTransactions from '@/components/Transactions';
import { Href } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import TokenList from '@/components/TokenList';
const dashboardBackground = require('@/assets/images/dashboardBackground.png');
import { UserData,Transactions } from '@/types/datatypes';
import { TOKEN_KEY } from '../context/AuthContext';
import * as SecureStore from "expo-secure-store"
import { getBalances,Transaction } from '../Apiconfig/api';
type CurrencyData = {
  usd: string;
  kes: string;
  token: number;
};

export type BalanceData = {
  [key: string]: CurrencyData;
};

export interface  ResponseBalance{
  balance:BalanceData

}
type TotalAmounts = {
  usd: number;
  kes: number;
};



const statusBarHeight = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) + 35 : 0;

const transactions = [
  { id: '1', username: 'Mark Monde', transactionType: 'sendMoney', amount: 520, date: '2024-08-23T10:30:00Z' },
  { id: '2', username: 'Samantha Reynolds', transactionType: 'funding', amount: 175, date: '2024-08-21T12:00:00Z' },
  { id: '3', username: 'James Smart', transactionType: 'sendMoney', amount: 100, date: '2024-08-08T09:00:00Z' },
  { id: '4', username: 'Emeka Ciroma', transactionType: 'funding', amount: 210, date: '2024-08-22T08:00:00Z' },
  { id: '5', username: 'John Doe', transactionType: 'lipaNaMpesa', amount: 175, date: '2024-08-21T12:00:00Z' },
  { id: '6', username: 'William Ndoe', transactionType: 'sendMoney', amount: 100, date: '2024-08-08T09:00:00Z' },
  { id: '7', username: 'Esprecious Mukhongolo', transactionType: 'paybill', amount: 220, date: '2024-08-22T08:00:00Z' },
];

export default function TabOneScreen() {
  const route = useRouter()
  const [userdata,setUserData] = useState<any>()
  const [balance,setBalance] = useState<TotalAmounts>({usd:0,kes:0})
  const [transaction,setTransactions] = useState<Transactions[]>([])
  const [tokens,setTokens] =useState<ResponseBalance>({balance:{}})


  useEffect(()=>{
    const token = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
     
      if(token){
        const parsedToken = JSON.parse(token);
        const response = await getBalances(parsedToken.token);
        const trans = await Transaction(parsedToken.token)
        // console.log("transactions txt txt",trans.transactions)
        setTransactions(trans.transactions)

       
       

        if (response && response.balance) {
          // console.log("the response is",response)
          const balance:BalanceData = response.balance;
          setTokens(response)
          
          
          const totalBalance = Object.values(balance).reduce<TotalAmounts>((acc, currency) => {
            acc.usd += parseFloat(currency.usd);
            acc.kes += parseFloat(currency.kes);
            return acc;
          }, { usd: 0, kes: 0 });
          setBalance(totalBalance);
        }
        setUserData(parsedToken)
       


      }
      

    }
    token()

  },[userdata])
  
  

  const getGreetingAndImage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return { greeting: 'Good morning', image: morning };
    } else if (currentHour >= 12 && currentHour < 18) {
      return { greeting: 'Good afternoon', image: noon };
    } else {
      return { greeting: 'Good evening', image: moon };
    }
  };

  const { greeting, image } = getGreetingAndImage();



  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define the snap points (height) for the Bottom Sheet
  const snapPoints = useMemo(() => ['65%'], []);


  return (
    <View style={styles.container}>
      <StatusBar style={'light'} />
      <ImageBackground style={styles.background} source={dashboardBackground}>
        <View style={styles.dashBackground}>
          <View style={reusableStyle.paddingContainer}>

            <View style={[reusableStyle.rowJustifyBetween, { height: '30%', alignItems: 'flex-start' }]}>
              <View style={styles.flexRow}>
                <Pressable onPress={() => route.push('/profile')}>
                  <Image source={userIcon} style={styles.userIcon} />
                </Pressable>

                <View>
                  <View style={styles.flexRow}>
                    <PrimaryFontText style={{ color: '#FEFEFE', fontSize: 15 }}>{greeting}{'  '}</PrimaryFontText>
                    <Image source={image} style={{ height: 20, width: 20 }} />
                  </View>
                  <PrimaryFontBold style={{ color: '#FEFEFE', fontSize: 18 }}>{userdata?.data?.userName}</PrimaryFontBold>
                </View>
              </View>
              <View>
                <Ionicons name="notifications" size={28} color="white" />
              </View>
            </View>

            <View style={[reusableStyle.rowJustifyBetween, { height: '32%', alignItems: 'flex-start' }]}>
              <View>
                <PrimaryFontMedium style={{ color: '#ffffff', fontSize: 17 }}>Available Balance</PrimaryFontMedium>
                <PrimaryFontMedium style={{ color: '#ffffff', fontSize: 45, marginTop: 3 }}>${balance.usd.toFixed(4)}</PrimaryFontMedium>
              </View>
              <SecondaryButton
                textOnButton="Fund"
                icon={<FontAwesome6 name="add" size={17} color="#052330" />}
                containerStyle={{ backgroundColor: 'white', marginTop: 25 }}
                textStyle={{ fontSize: 16, color: "#052330" }}
                onPress={() => bottomSheetRef.current?.expand()}
              />
            </View>

            <View style={[styles.flexRow, { height: '38%', marginTop: 1 }]}>
              <SecondaryButton
               route={"/contacts" as Href<string | object>}  
                textOnButton="Send"
                icon={<Feather name="arrow-up" size={18} color="white" />}
                containerStyle={{ backgroundColor: '#E03A4E', padding: 17, paddingHorizontal: 21, paddingRight: 27 }}
                textStyle={{ fontSize: 17, color: "white" }}
              />

              <SecondaryButton
                route={"/makepayment" as Href<string | object>}  
                textOnButton="Make Payment"
                icon={<Feather name="arrow-down" size={18} color="white" />}
                containerStyle={{ backgroundColor: '#00C48F', padding: 17, paddingHorizontal: 21, paddingRight: 27, marginLeft: 17 }}
                textStyle={{ fontSize: 17, color: "white" }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={[reusableStyle.paddingContainer, reusableStyle.rowJustifyBetween, { paddingVertical: 20, backgroundColor: 'white' }]}>
        <PrimaryFontMedium style={{ fontSize: 25 }}>Recent activities</PrimaryFontMedium>
        <Pressable onPress={() => route.push('/transactions')}>
          <PrimaryFontMedium style={{ fontSize: 17, color: '#00C48F' }}>See all</PrimaryFontMedium>
        </Pressable>
      </View>

      <GroupedTransactions transactions={transaction} />
      {/* <GroupedTransactions transactions={transactions} /> */}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <PrimaryFontBold
          style={[reusableStyle.paddingContainer,
          { fontSize: 22, marginTop: 30, marginBottom: 15, paddingHorizontal: 23 }]}
        >
          Please choose a token
        </PrimaryFontBold>

        <TokenList   response={tokens} />
        {/* <TokenList routeProp='/fundingmethod'/> */}
      </BottomSheet>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  background: {
    height: 330,
    resizeMode: 'cover',
    width: '100%',
  },
  dashBackground: {
    height: 320,
    paddingTop: statusBarHeight
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userIcon: {
    width: 36,
    height: 35,
    marginRight: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
