"use client";

import { Cmv3Provider } from "use-cmv3";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";

import Mint from "./mint";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
  let network = WalletAdapterNetwork.Devnet;
  if (
    process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet-beta" ||
    process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet"
  ) {
    network = WalletAdapterNetwork.Mainnet;
  }
  let endpoint = "https://api.devnet.solana.com";
  if (process.env.NEXT_PUBLIC_RPC) {
    endpoint = process.env.NEXT_PUBLIC_RPC;
  }
  const wallets = useMemo(() => [], []);

  const allowLists = new Map<string, Array<string>>([
    ["OGs", ["61DZsc2GKvgygUMgmNcYmT2jVjdJmxWEiPyn3nfJW3Td"]],
  ]);

  return (
    <WalletProvider wallets={wallets}>
      <WalletModalProvider>
        <Cmv3Provider
          config={{
            candyMachineId: process.env.NEXT_PUBLIC_CANDY_MACHINE_ID,
            candyMachineLUT: process.env.NEXT_PUBLIC_CANDY_MACHINE_LUT,
            endpoint: endpoint,
          }}
          metadata={{
            allowLists: allowLists,
          }}
        >
          <div className="header">
            Made with ❤️ by <a href="https://github.com/0xalby">alby</a>
          </div>
          <Mint />
        </Cmv3Provider>
      </WalletModalProvider>
    </WalletProvider>
  );
}
