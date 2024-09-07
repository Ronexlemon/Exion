// Define the Wallet type
interface Wallet {
    currency: string;
    encryptedPrivateKey: string;
    id: string;
    mpesaNumber: string;
    publicKey: string;
    userId: string;
}

// Define the UserDetails type
export interface UserDetails {
    id: string;
    phoneNumber: string;
    userName: string;
    wallet?: Wallet;
}

// Define the UserData interface
export interface UserData {
    data: UserDetails;
    token: string;
}

interface Balance {
    [key: string]: string; 
}

export interface BalanceData {
    balance: Balance;
}



export interface Transactions{
    id: string;
    type: string;
    hash: string;
    amount:string;
    userId: string;
    walletType: string;
    date: string;
    recipient:string;
}

//qrcode
interface Query {
    allowedIssuers: string[];
    context: string;
    type: string;
    credentialSubject: {
      countryCode: {
        $eq: number;
      };
    };
  }
  
  interface Scope {
    circuitId: string;
    id: number;
    query: Query;
  }
  
  interface Body {
    reason: string;
    message: string;
    callbackUrl: string;
    scope: Scope[];
  }
  
 export  interface RequestData {
    id: string;
    thid: string;
    from: string;
    typ: string;
    type: string;
    body: Body;
  }

  interface Wallet {
    id: string;
    mpesaNumber: string;
    userId: string;
    publicKey: string;
    encryptedPrivateKey: string;
    currency: string;
  }
  
  interface Userdata {
    id: string;
    phoneNumber: string;
    userName: string;
    role: string;
    countryCode: string;
    verified: boolean;
    wallet: Wallet;
  }
  
  export interface ProfileResponse {
    data: Userdata;
  }
  