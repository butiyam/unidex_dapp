"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "./particles.json";
import DataTable, { createTheme } from 'react-data-table-component';
import QRCodeModal from "./QRCodeModal";
import $ from "jquery";

import Navbar from "./Navbar";
import { Web3 } from "web3";
import api from "./api";

const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.ninicoin.io"));
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
    text: {
      primary: '#FFF',
      secondary: '#2aa198',
    },
    background: {
      default: 'transparent',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#000',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

const columns = [
  {
    name: 'Sign',
    selector: (row: { sign: unknown; }) => row.sign,
  },
  {
    name: 'Date',
    selector: (row: { date: unknown; }) => row.date,
  },
    {
         name: 'From',
         selector: (row: { from: unknown; }) => row.from
    },
    {
        name: 'Amount',
        selector: (row: { amount: unknown; }) => row.amount
   }
];

const data: React.SetStateAction<undefined> | { id: number; sign: React.JSX.Element; date: string; from: string; amount: string; }[] = [];

 function Home() {
  const [init, setInit] = useState(false);
  const [datas, setDatas] = useState();
  const [donated, setDonated] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const ethAddress = "0xb2Fda2C633Ae2B600dd732F57e0F325CBE95f590";

  const showQRCode = async () => {
   setShowModal(true);
     $("#copy").removeClass('selected-button');
     $("#qr-code").addClass('selected-button');
  }

  const copyButton = async () => {
   $("#copy").html("Copied");
   $("#copy").addClass('selected-button');
   $("#qr-code").removeClass('selected-button');

   navigator.clipboard.writeText(ethAddress);

   setTimeout(() => $("#copy").html("Copy"), 2000);

  }

  const fetchData = async () => { 
    const Datas = await api.get().then(res => res.data);
    let totalETHs = 0;

    for(let  i = 0; i < Datas.result.length; i++ ){
       // console.log(Datas.result[i])
        const d = new Date(Datas.result[i].timeStamp * 1000);
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const h = d.getHours();
        const m = d.getMinutes();
        const s = d.getSeconds();

        const sign = Datas.result[i].hash.substring(0, 12)+'...';
        const from = Datas.result[i].from.substring(0, 10)+'...'+Datas.result[i].hash.substring(57)
        
        const row = {
            id: i,
            sign: <a href={ 'https://etherscan.io/tx/'+Datas.result[i].hash } rel="noopener noreferrer" target="_blank"  > { sign}</a>,
            date: month +' '+ day+', '+year+' '+h+':'+m+':'+s,
            from: from,
            amount: parseFloat( web3.utils.fromWei(Datas.result[i].value,"ether")).toFixed(4)+' ETH'
        }
        totalETHs += Number(parseFloat( web3.utils.fromWei(Datas.result[i].value,"ether")).toFixed(4));

        data.push(row);

        //this.setState({ data:[...this.state.data, row]});
    }
     setDatas(data);
     setDonated(totalETHs);
  //  console.log(totalETHs);
  }



  
  fetchData();

  useEffect( () => {
      if (init) {
          return;
      }


      initParticlesEngine(async (engine) => {
          await loadFull(engine);
        

      }).then(() => {
          setInit(true);
      });
  }, [init]);

  
  return (


    <div className="min-h-screen text-white relative">
           <Particles options={particlesOptions}/> 
         <Navbar />

         <QRCodeModal
         show={showModal}
         onClose={() => setShowModal(false)}
         ethAddress={ethAddress}
         />

         <main className="container mx-auto px-4 py-12 relative z-10">
            <section className="text-center mb-16 relative">
               <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 text-transparent bg-clip-text">
               Welcome to UNIDEX
               </h1>
               <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Empowering the People with a Decentralized and Unstoppable Medium of Exchange that only goes UP
               </p>
               <a href="#donate" >
                  <button style={{background: '#1FF031'}} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 hover:from-emerald-500 hover:via-cyan-500 hover:to-purple-600 text-white border-none shadow-lg shadow-emerald-500/20">
                     Get $UNIDEX Now
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                     </svg>
                  </button>
               </a>
            </section>
            <section id="features" className="mb-16">
               <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
                  &nbsp;
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="rounded-xl border shadow bg-white/5 backdrop-blur-sm border-emerald-500/20 text-white hover:bg-white/10 transition-colors">
                     <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight flex items-center space-x-2">
                          <Image style={{borderRadius: '25px'}} src="/4.png" width={35} height={35} alt="mini-dontaion-amount-img" />
                           <span>Minimum Donation</span>
                        </h3>
                     </div>
                     <div className="p-6 pt-0">
                        <p className="text-gray-300">
                         0.0200 ETH
                        </p>
                     </div>
                  </div>
                  <div className="rounded-xl border shadow bg-white/5 backdrop-blur-sm border-emerald-500/20 text-white hover:bg-white/10 transition-colors">
                     <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight flex items-center space-x-2">
                          <Image style={{borderRadius: '25px'}} src="/1.png" width={35} height={35} alt="dontaion-pool-img" />
                           <span>Donation Pool</span>
                        </h3>
                     </div>
                     <div className="p-6 pt-0">
                        <p className="text-gray-300">
                           8.000 ETH
                        </p>
                     </div>
                  </div>
                  <div className="rounded-xl border shadow bg-white/5 backdrop-blur-sm border-emerald-500/20 text-white hover:bg-white/10 transition-colors">
                     <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight flex items-center space-x-2">
                         <Image style={{borderRadius: '25px'}} src="/2.png" width={35} height={35} alt="donted-pool-img" />
                           <span>Donated Pool</span>
                        </h3>
                     </div>
                     <div className="p-6 pt-0">
                        <p className="text-gray-300">
                        {parseFloat(donated.toString()).toFixed(4)} ETH  
                        </p>
                     </div>
                  </div>
                  <div className="rounded-xl border shadow bg-white/5 backdrop-blur-sm border-emerald-500/20 text-white hover:bg-white/10 transition-colors">
                     <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight flex items-center space-x-2">
                          <Image style={{borderRadius: '25px'}} src="/3.png" width={35} height={35} alt="remain-dontaion-pool-img" />
                           <span>Remaining Pool</span>
                        </h3>
                     </div>
                     <div className="p-6 pt-0">
                        <p className="text-gray-300">
                        {parseFloat((8-donated).toString()).toFixed(4)} ETH
                        </p>
                     </div>
                  </div>
               
               </div>
            </section>
            <section id="supporters" className="mb-16">
               <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
                Early Supporters
               </h2>
               <div  className="mx-auto">
                  <div className="rounded-xl border text-card-foreground shadow bg-white/5 backdrop-blur-sm border-emerald-500/20">
                  <DataTable
                      columns={columns}
                      data={datas}
                      pagination
                      theme="solarized"
                  />
                  </div>
               </div>
            </section>
            <section id="benefits" className="mb-16">
               <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
               Benefits for Supporters
               </h2>
               <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                  <ol className="list-decimal list-inside space-y-4 text-gray-300">
                     <li>Receive 100X rate of UNIDEX tokens daily per each ETH donated capped at 8 ETH global.</li>
                     <li>The 100X rate pereach Ethereum will start counting from the moment you do the transfer till the
                     day we launch mainnet, the more time we take testing the more tokens you get for waiting.</li>
                     <li>The larger your donations, the higher your daily minting rates.</li>
                     <li>Receive equivalent testnet tokens whichwill be convertible to mainnet UNIDEX tokens at launch.</li>
                  </ol>
               </div>
            </section>
            <section id="donate" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
               Donate
            </h2>
            <div className="max-w-2xl mx-auto">
               <div className="rounded-xl border text-card-foreground shadow bg-white/5 backdrop-blur-sm border-emerald-500/20">
                  <div className="flex flex-col space-y-1.5 p-6">
                     <h3 className="font-semibold leading-none tracking-tight flex items-center justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
                           Send your ETH here 👇
                        </span>
                        <span className="text-xs text-gray-400"></span>
                     </h3>
                  </div>
                  <div className="p-6 pt-0 space-y-6">
                     <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white" >
                      Our donation address
                      </label>
                      <input type="text" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-emerald-500/20 text-white placeholder:text-gray-500"  readOnly value={ethAddress} />
                      </div>
                     <div  className="w-full">
                        <div  className="h-10 items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-2 bg-white/5">
                        <button onClick={ ()=> { copyButton() }} type="button" id="copy" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium text-white" >
                          Copy
                        </button>
                        <button onClick={ ()=> { showQRCode() }} type="button" id="qr-code" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium text-white" >
                           QR Code
                        </button>
                     </div>
                        <div   className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" >
                           <div className="space-y-2 p-4 rounded-lg bg-white/5">
                              <p style={{ color: '#1FF031', fontSize: '20px' }} className="text-sm text-gray-400">1</p>
                              <p className="text-lg font-bold text-white">
                              Copy or scan donation address.
                              </p>
                           </div>
                        </div>
                        <div  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"></div>
                     </div>
                     <div className="space-y-2 p-4 rounded-lg bg-white/5">
                        <p style={{ color: '#1FF031', fontSize: '20px' }} className="text-sm text-gray-400">2</p>
                        <p className="text-lg font-bold text-white">
                        Select ETH amount
                        </p>
                     </div>
                     <div className="space-y-2 p-4 rounded-lg bg-white/5">
                        <p style={{ color: '#1FF031', fontSize: '20px' }} className="text-sm text-gray-400">3</p>
                        <p className="text-lg font-bold text-white">
                        Confirm the Transaction
                        </p>
                     </div>
                     <div className="space-y-2 p-4 rounded-lg bg-white/5">
                        <p style={{ color: '#1FF031', fontSize: '20px' }} className="text-sm text-gray-400">4</p>
                        <p className="text-lg font-bold text-white">
                        Done
                        </p>
                     </div>
                     <div className="pt-4 border-t border-white/10">
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-white">Note:</p>
                           <p style={{color: '#1FF031'}} className="font-bold bg-gradient-to-r from-emerald-400 to-purple-500  bg-clip-text">
                           Donations should be 0.02ETH and above, anything below that will not be counted and assigned a rate.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            </section>

            <section id="faq" className="mb-16">
               <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">FAQ</h2>
               <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                     <h3 className="text-xl font-semibold mb-2 text-emerald-400">What is UNIDEX?</h3>
                     <p className="text-gray-300">
                     What if your crypto could only go up? Meet UNIDEX, the world&apos;s first decentralized exchange with unidirectional functionality, built
                     to perform better than other cryptocurrencies. Why? Because with this technology, dips and dumps are impossible, no matter how big your exit position is.
                     With it&apos;s simple, robust game theory, we get the pumps without the dumps. On UNIDEX, tokens flow in one direction, from stablecoins to your token and never back. That&apos;s what makes the price move in just one direction to up.
                     But how do you sell? That&apos;s where our powerful P2P-OTC smart contract comes in. You sell directly to others, peer to peer, at the exact same
                     price as the UNIDEX pool, a price that updates in real time and climbs higher every time someone buys.
                     It&apos;s seamless, it&apos;s synced, it&apos;s unstoppable. Built on a Uniswap
                     V3 fork, optimized for growth with no fees, full transparency and a community driven core. No middlemen, no slippage, no red candles, just pure upward
                     momentum.
                     UNIDEX, are you ready to go up?
                     </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                     <h3 className="text-xl font-semibold mb-2 text-emerald-400">What are rates?
                     </h3>
                     <p className="text-gray-300">
                     Rates/minting rates is the quantity of UNIDEX tokens our Dapp will allow each donor to mint per day. Only given as rewards to early supporters who donated, 
                     ensuring they have more UNIDEX tokens than users that join later on in testnet and mainnet phases. Rates are assigned per wallet address. Meaning you can donate
                     from as many wallet addresses as you want while each wallet address will be assigned it&apos;s unique rate.
                     The rates count per donor address begins from the moment you do the transfer till the mainnet goes live. The more time we take testing the more tokens you get for waiting.
                     </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                     <h3 className="text-xl font-semibold mb-2 text-emerald-400">How much rates do I gain from donating?</h3>
                     <div className="space-y-4 text-gray-300">
                        <div>
                           <ul className="list-disc list-inside mt-2 space-y-2">
                              <li>Rates are calculated with an ETH scale of 100X rate per ETH in donation. </li>
                              <li>Meaning for example, your donation of 1 ETH will give you a 100X rate while your donation of 0.02 ETH will give you a 2X rate.</li>
                              <li>Therefore the higher the donation the bigger the rate.</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

          </main>

         <footer className="bg-black/50 text-white py-8 relative z-10">
            <div className="container mx-auto px-4">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-center md:text-left">
                     <p>© 2025 UNIDEX. All rights reserved.</p>
                  </div>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#supporters"  className="hover:text-emerald-400 transition-colors">Supporters</a>
                    <a href="#benefits"  className="hover:text-emerald-400 transition-colors">Benefits</a>
                    <a href="#donate" className="hover:text-emerald-400 transition-colors">Donate</a>
                    <a href="https://t.me/unidexcommunity" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Telegram</a>
                    <a href="https://x.com/unidex_" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">X</a>
                  </div>
               </div>
            </div>
         </footer>
    </div>
  );
}
export default Home;
