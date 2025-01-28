"use client"
import { useState, useEffect } from "react"

type PriceList = {
    items: string[],
}
export default function FindCoin({items}: PriceList){
    const [query, setQuery] = useState("")
    const [filteredItems, setFilteredItems] = useState<string[]>([])
    const [prices, setPrices] = useState<{symbol: string, price: string}[]>([])

    
    useEffect(()=>{
        const filtered = items.filter((item)=>
        item.toLowerCase().includes(query.toLowerCase()))
        setFilteredItems(filtered)

        if (filteredItems.length > 0){
            fetchExactPrices(filtered).then(setPrices).catch((e)=>{})
        }

    },[query, items])

    const fetchExactPrices = async(filteredItems: string[])=>{
        const pricePromises = filteredItems.map(async(coin) =>{
            const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coin}`);
            const data = await response.json();
            return{symbol: coin, price: data.price}
        })

        const prices = await Promise.all(pricePromises);
        return prices
    }



    return(
        <div>
            <div>
                <input
                 type="text" 
                 className="h-12 p-4 bg-black focus:outline-none rounded-lg text-white w-full"
                 value = {query}
                 onChange={(e)=> setQuery(e.target.value)}
                 
                 />
            </div>
            {query && (
                 <ul className="flex flex-col gap-4 mt-6 p-4 ">
                 {filteredItems.map((item) => {
                   const price = prices.find((p) => p.symbol === item)?.price;
                   return (
                     <li key={item} className="bg-black text-white w-full h-12 text-center rounded-xl ">
                       {item} - {price ? `$${parseFloat(price).toFixed(2)}` : "Loading..."}
                     </li>
                   );
                 })}
               </ul>
            )}
        </div>
    )
}