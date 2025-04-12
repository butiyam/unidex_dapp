"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "./particles.json";
import DataTable, { createTheme } from 'react-data-table-component';
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

         <main className="container mx-auto px-4 py-12 relative z-10">
            <section className="text-center mb-16 relative">
               <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 text-transparent bg-clip-text">
               What is UNIDEX?
               </h1>
               <p className="text-xl md:text-2xl mb-8 text-gray-300">
               What if your crypto could only go up? Meet UNIDEX, the world&apos;s first decentralized exchange with unidirectional functionality, built to perform better than other cryptocurrencies. Why? Because with this technology, dips and dumps are impossible, no matter how big your exit position is
               It&apos;s simple, robust game theory. 
               </p>
               <a href="/" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 hover:from-emerald-500 hover:via-cyan-500 hover:to-purple-600 text-white border-none shadow-lg shadow-emerald-500/20">
                     Buy $UNIDEX Now 
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
                         {donated} ETH  
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
                           {8-donated} ETH
                        </p>
                     </div>
                  </div>
               
               </div>
            </section>
            <section id="support" className="mb-16">
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
               Benefits for donors
               </h2>
               <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                  <ol className="list-decimal list-inside space-y-4 text-gray-300">
                     <li>Receive 100X rate of UNIDEX tokens daily in our free mining stage.</li>
                     <li>Your daily rates will be maintained in both testnet and mainnet phases.</li>
                     <li>The larger your donations, the higher your daily mining rates.</li>
                     <li>Receive equivalent testnet tokens which will be convertible to mainnet UNIDEX tokens at launch.</li>
                  </ol>
               </div>
            </section>
            <section id="tokenomics" className="mb-16">
               <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
               Early Supporter Pool
               </h2>
               <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                  <p className="mb-4 text-gray-300">
                  To enable us expand our activities, we have approved an 8ETH capped donation pool, set to give early supporters a head start. With a minimum of 0.02ETH everyone can participate. There is no individual limit, but a general cap of 8ETH beyond which we will close this phase and begin the testnet phase.
                  </p>
               </div>
            </section>
            <section id="faq" className="mb-16">
               <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">FAQ</h2>
               <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                     <h3 className="text-xl font-semibold mb-2 text-emerald-400">How often are rewards paid out?</h3>
                     <p className="text-gray-300">Rewards are distributed automatically based on transaction volume and the amount of SOLMAX tokens you hold. The more tokens you hold,
                        the more frequently you&#x27;
                        ll receive payouts.
                     </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                     <h3 className="text-xl font-semibold mb-2 text-emerald-400">What&#x27;
                        s the difference between SOLMAX and IMG/SMG?
                     </h3>
                     <p className="text-gray-300">SOLMAX is the first truly automatic rewards token on Solana. In contrast,
                        IMG/SMG require manual distributions from their developers. With SOLMAX,
                        your rewards are processed automatically—no action needed on your part.
                     </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-emerald-500/20">
                     <h3 className="text-xl font-semibold mb-2 text-emerald-400">What is the wallet activity I see on the chart?</h3>
                     <div className="space-y-4 text-gray-300">
                        <p>If you
                           ve been monitoring the chart,
                           you may have noticed activity from the wallet<span className="text-emerald-400 font-mono text-sm break-all">
                            58fjhsR7HSx4aH8bQFT59hRTURxCweNWdcE4nzdgtShc</span>. This is our automated tax collection wallet,
                           which periodically sells into the chart—a normal and essential function of the token&#x27;
                           s smart contract to facilitate reward distribution.
                        </p>
                        <div>
                           <p className="font-semibold text-emerald-400">How It Works:</p>
                           <ul className="list-disc list-inside mt-2 space-y-2">
                              <li>This wallet automatically accumulates taxed tokens from every buy,
                                 sell,
                                 and transfer.
                              </li>
                              <li>At strategic intervals,
                                 it sells these tokens and sends the resulting Solana to wallet<span className="text-emerald-400 font-mono text-sm break-all">
                                  BY9Fy6VQmNGoYp87GoiGcLKdQoxx6rgjBuHhf7s1FKLf</span>,
                                 which then distributes rewards to holders.
                              </li>
                           </ul>
                        </div>
                        <div>
                           <p className="font-semibold text-emerald-400">Why This Matters:</p>
                           <ul className="list-disc list-inside mt-2 space-y-2">
                              <li>
                                 <span className="font-semibold">Consistent Rewards</span>
                                  These sales trigger reward distributions,
                                 ensuring a steady flow of benefits for holders.
                              </li>
                              <li><span className="font-semibold">Market Stability</span>The smart contract dynamically adjusts sell timing to avoid liquidity drain during downtrends.</li>
                              <li><span className="font-semibold">Strategic Opportunities</span>These sell events create consistent DCA (dollar-cost averaging) opportunities for investors looking to strengthen their position.</li>
                           </ul>
                        </div>
                        <p>This fully automated system keeps the ecosystem healthy while rewarding loyal holders. Smart investors use this to their advantage !</p>
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
                    <a href="https://t.me/SOLMAXPortal" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Telegram</a>
                    <a href="https://dexscreener.com/solana/axh1babyzm9dirdeylhwmaf6nqxvvudokjtlkeqhmhmu" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Chart</a>
                    <a href="https://jup.ag/swap/FEhfph34VeoCfkuiNnv89pEGPiGPukWfhrKtLko66mvj-SOL" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Buy</a>
                  </div>
               </div>
            </div>
         </footer>
    </div>
  );
}
export default Home;
