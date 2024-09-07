import axios from "axios";
import { PESACHAIN_URL } from "@/constants/urls";

export const getBalances = async (token: string) => {
    try {
        const response = await axios.get(`${PESACHAIN_URL}/tx/balances`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching balances:", error);
        throw error; 
    }
};

//fetch transactions
export const Transaction = async (token: string) => {
    try {
        const response = await axios.get(`${PESACHAIN_URL}/transaction/recent`, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
                });
                return response.data;
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                    throw error;
                    }
                    };

                    
//create transaction
//{"amount":"1","tokenId":2}
export const AddFund = async (token: string,tokenId:number,amount:number) => {
    try {
        const response = await axios.post(`${PESACHAIN_URL}/tx/fund`,{amount,tokenId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e:any) {
        return {error:true,msg: e.response.data.message}
    }
};

//send Money
export const SendMoney = async (token: string,tokenId:number,phoneNumber:string,amount:number) => {
    try {
        const response = await axios.post(`${PESACHAIN_URL}/tx/send`,{amount,phoneNumber,tokenId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e:any) {
        return {error:true,msg: e.response.data.message}
    }
};


//const { promoCode, tokenId } = req.body;

export const RedeemPromo = async (token: string,tokenId:number =1,promoCode:string) => {
    try {
        const response = await axios.post(`${PESACHAIN_URL}/promo/apply-discount`,{promoCode, tokenId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e:any) {
        
        return {error:true,msg: e.response.data.message}
    }
};

//get qrcode details
export const GetQRCodeDetails = async (token: string) => {
    try {
        const response = await axios.post(`${PESACHAIN_URL}/privado/sign`, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
                });
                return response.data;
            }catch(err:any){
                console.log("the error is",err)
                return {error:true,msg: err.response.data.message}
            }};
//get user profile
export const GetProfile = async (token: string) => {
    try {
        const response = await axios.get(`${PESACHAIN_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
                });
                return response.data;
                }catch(err:any){
                    console.log("the error is",err)
                    return {error:true,msg: err.response.data.message}
                    }};