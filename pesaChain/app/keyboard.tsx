import React, { useState, useRef, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar as RNStatusBar, Platform, Pressable ,ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { PrimaryFontBold } from '@/components/PrimaryFontBold';
import { PrimaryFontMedium } from '@/components/PrimaryFontMedium';
import { PrimaryFontText } from '@/components/PrimaryFontText';
import { useRouter, useLocalSearchParams, Href } from 'expo-router';
import Dropdown from '@/assets/icons/Dropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import TokenList from '@/components/TokenList';
import  TokenListPayment, { Token } from '@/components/MakePaymentTokenList';
import reusableStyle from '@/constants/ReusableStyles'
import * as SecureStore from "expo-secure-store"
import { TOKEN_KEY } from './context/AuthContext';
import { getBalances } from './Apiconfig/api';
import { BalanceData, ResponseBalance } from './(tabs)';
import { SendMoney } from './Apiconfig/api';
//import {normalizePhoneNumber } from "../app/hooks/"
import { normalizePhoneNumber } from './hooks/normalizePhone';






const statusBarHeight = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) + 20 : 0;

// Sample response
const response = {
  balance: {
    celo: { usd: 2, ksh: 150, token: 10 },
    cusd: { usd: 3, ksh: 200, token: 6 },
    ckes: { usd: 2, ksh: 50, token: 5 },
    usdc: { usd: 3, ksh: 200, token: 6 },
  },
};

type TokenType = {
  token: string;
  balance: number;
  ksh: number;
};


const CustomKeyboard = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');
  const route = useRouter();
  const [activeToken, setActiveToken] = useState<TokenType>({
    token: '',
    balance: 0,
    ksh: 0
  });
  const { source, name, phoneNumber, tillNumber, paybillNumber, businessNumber } = useLocalSearchParams();
  const [tokens,setTokens] =useState<ResponseBalance>({balance:{}})
  const [selectedTokenId, setSelectedTokenId] = useState<number>(0);
  const [jwtTokens,setJwtToken] = useState<string>("")
  const [send,setSend]=useState<boolean>(false)

  let textOnButton
  if (source === 'contacts') {
    textOnButton = "NEXT"
  } else textOnButton = "CONFIRM"

  const handlePress = (value: string) => {
    // Update the input value when a number or dot is pressed
    setInputValue(prev => prev + value);
    setError(false)
  };

  const handleButtonClick = async() => {
    if (inputValue === "") {
      setError(true)
      setErrorDescription('Enter a valid amount')
      return;
    }

    if (source === 'contacts') {
      route.push({
        pathname: '/optionalmessage',
        params: {
          name,
          phoneNumber,
          amount: inputValue
        }
      });
    }
    else if (source === 'sendmoney') {
      setSend(true)     
      try{
        const res = await SendMoney(jwtTokens,selectedTokenId,normalizePhoneNumber(phoneNumber as string),parseFloat(inputValue))
      console.log('send money response is',res)
      if(!res.error){
        setSend(false)
      }

      }catch(err){
        console.log('error is',err)
        setSend(false)

      }
      
      
    }
    else if (source === 'tillnumber') {
      alert(source)
      console.log('tillnumber')
    }
    else if (source === 'paybillaccountnumber') {
      alert(source)
      console.log('paybill')
    }

  }

  const handleBackspace = () => {
    // Remove the last character from the input value
    setInputValue(prev => prev.slice(0, -1));
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
 

  // Define the snap points (height) for the Bottom Sheet
  const snapPoints = useMemo(() => ['57%'], []);

  // Define the snap points (height) for the Bottom Sheet
  const handleTokenSelect = (id: number, token: Token) => {
    setSelectedTokenId(id);
    setActiveToken({
        token: token.tokenName.toUpperCase(),  // Use token.tokenName here
        balance: token.balance,
        ksh: parseFloat(token.ksh),
    });
    bottomSheetRef.current?.close();  // Close the BottomSheet after selection
};

  useEffect(()=>{
    const fetchBalances = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        const parsedToken = JSON.parse(token);
        const response = await getBalances(parsedToken.token);
        setJwtToken(parsedToken.token)

        if (response && response.balance) {
          setTokens(response);

          // Set active token to the first token in the response
          const firstTokenKey = Object.entries(response.balance)[0][0];
          const firstToken = response.balance[firstTokenKey];
          if (selectedTokenId === 0) { // Only set if no token is selected
            setActiveToken({
              token: firstTokenKey.toUpperCase(),
              balance: firstToken.token,
              ksh: firstToken.ksh
            });
          }
  
        }
      }
    };

    fetchBalances();
  },[tokens])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style={'light'} />
        <View style={styles.balanceContainer}>
          <Pressable style={styles.closeContainer} onPress={() => route.push(`/${source}` as Href<string | object>)}>
            <Feather name='x' color={'#E31D1A'} size={28} />
          </Pressable>
          <Pressable style={styles.balanceView} onPress={() => bottomSheetRef.current?.expand()}>
            <PrimaryFontMedium style={{ color: '#FFFFFF6D', fontSize: 12 }}>BALANCE</PrimaryFontMedium>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <PrimaryFontBold style={{ color: '#FFFFFF', fontSize: 17 }}>{activeToken.balance.toFixed(4)} {activeToken.token} </PrimaryFontBold>
              <Dropdown />
            </View>
            <PrimaryFontMedium style={{ color: '#FFFFFF6D', fontSize: 11.5 }}>≈ Ksh {activeToken.ksh}</PrimaryFontMedium>
          </Pressable>
          <PrimaryFontMedium style={{ fontSize: 19, marginTop: 15, color: 'white' }}>How much would you like to send?</PrimaryFontMedium>
          {error ? <PrimaryFontText style={{ marginTop: 10, marginBottom: -27, color: 'red', fontSize: 15 }}>{errorDescription}</PrimaryFontText> : null}
        </View>

        <View style={styles.inputContainer}>
          <PrimaryFontBold style={styles.inputText}>${inputValue ? null : 0}{inputValue}</PrimaryFontBold>
        </View>

        <View>
          <View style={styles.row}>
            {['1', '2', '3'].map((num) => (
              <KeyButton key={num} label={num} onPress={() => handlePress(num)} />
            ))}
          </View>
          <View style={styles.row}>
            {['4', '5', '6'].map((num) => (
              <KeyButton key={num} label={num} onPress={() => handlePress(num)} />
            ))}
          </View>
          <View style={styles.row}>
            {['7', '8', '9'].map((num) => (
              <KeyButton key={num} label={num} onPress={() => handlePress(num)} />
            ))}
          </View>
          <View style={styles.row}>
            <KeyButton label="." onPress={() => handlePress('.')} />
            <KeyButton label="0" onPress={() => handlePress('0')} />
            <TouchableOpacity onPress={handleBackspace} style={styles.keyButton}>
              <Feather name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Pressable onPress={handleButtonClick} style={styles.button}>
            <PrimaryFontMedium style={{ color: 'white' }}>{send ? (
  <>
    <ActivityIndicator size="small" color="#0000ff" />
    {" SENDING"}
  </>
) : (
  textOnButton
)}   </PrimaryFontMedium>
          </Pressable>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <PrimaryFontBold
            style={[reusableStyle.paddingContainer,
            { fontSize: 22, marginTop: 25, marginBottom: 15, paddingHorizontal: 23 }]}
          >
            Select token to send
          </PrimaryFontBold>

          <TokenListPayment  response={tokens}  onSelectToken={handleTokenSelect} />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

// Button Component for each key
const KeyButton = ({ label, onPress }: { label: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.keyButton}>
      <PrimaryFontBold style={styles.keyText}>{label}</PrimaryFontBold>
    </TouchableOpacity>
  );
};


const white = '#ffffff'
const background = '#052330'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    paddingTop: statusBarHeight,
    paddingBottom: 30,
    backgroundColor: background
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  balanceView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF3D',
    padding: 5,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  closeContainer: {
    width: '100%',
    paddingHorizontal: 18,
    alignItems: 'flex-end'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 55,
    color: white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  keyButton: {
    width: '30%',
    height: 83,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
  },
  keyText: {
    fontSize: 25,
    color: white
  },
  button: {
    backgroundColor: '#00C48F',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 18,
    width: '50%',
    // marginTop: 3
  }
});

export default CustomKeyboard;
