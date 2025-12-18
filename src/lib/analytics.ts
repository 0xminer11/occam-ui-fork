export interface Wallet {
  address: string;
  btcBalance: number;
  usbdMinted: number;
  change1d: number;
  change7d: number;
  change30d: number;
  lastActive: Date;
}

export interface ProtocolStats {
  totalBTC: number;
  totalBTCUSD: number;
  totalUSBD: number;
  collateralRatio: number;
  activeWallets: number;
}

export interface BTCDistribution {
  address: string;
  btcAmount: number;
  percentage: number;
}
