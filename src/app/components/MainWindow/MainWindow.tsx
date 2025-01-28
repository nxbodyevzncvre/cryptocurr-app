"use client"


import { useEffect, useState } from "react"
import FindCoin from "../FindCoin/FindCoin"




type SymbolInfo = {
    symbol: string;
  };
  
type ExchangeInfoResponse = {
symbols: SymbolInfo[];
};
  

export default function MainWindow(){
    const [priceList, setPriceList] = useState<string[]>([])
    useEffect(()=>{
        const fetchPrices = async(): Promise<string[]> =>{
            const response = await fetch("https://api.binance.com/api/v3/exchangeInfo")
            const data: ExchangeInfoResponse = await response.json()
            return data.symbols.map((item)=>item.symbol);
        }
        fetchPrices().then(setPriceList)

    },[])

    return(
        <div className="border-2 h-96 border-black flex  text-center flex-col mt-64 w-96  rounded-md bg-gradient-to-b from-purple-400 to-purple-200">
            <h1 className="text-4xl">Select Your Coin</h1>
            <div><FindCoin items = {priceList}/></div>
        </div>
    )
}