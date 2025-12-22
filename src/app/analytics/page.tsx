"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RefreshCw, Bitcoin, Coins, Shield, Users, Lock } from "lucide-react";
import { StatsCard } from "@/components/analytics/StatsCard";
import { BTCDistributionPie } from "@/components/analytics/BTCDistributionPie";
import { WalletHoldingsTable } from "@/components/analytics/WalletHoldingsTable";
import { protocolStats, wallets, btcDistribution } from "@/lib/mockAnalytics";
import { formatBTC, formatUSD, formatCompactNumber } from "@/lib/formatters";

export default function Analytics() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Approximate total BTC in hidden wallets (update with real logic as needed)
  const hiddenBtcApprox = 20;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setIsRefreshing(false);
  };

  const hasRestricted = true; // This should be based on your actual data

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        {/* <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> */}
          {/* <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Bitcoin & USBD Analytics
            </h1>
            <p className="mt-1 text-muted-foreground">
              Protocol-wide TVL, circulation, and user distribution
            </p>
          </div> */}
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-border/50 bg-secondary/30 hover:bg-secondary hover:border-primary/30"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>
        </header> */}

        {/* KPI Cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <StatsCard
              title="Total Bitcoin TVL"
              value={`${formatBTC(protocolStats.totalBTC)} BTC`}
              secondaryValue={formatUSD(protocolStats.totalBTCUSD)}
              tooltip="Total value of Bitcoin locked in the protocol"
              icon={<Bitcoin className="h-4 w-4" />}
              loading={loading}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <StatsCard
              title="Total USBD Circulating"
              value={`$${formatCompactNumber(protocolStats.totalUSBD)}`}
              tooltip="Total USBD stablecoin in circulation"
              icon={<Coins className="h-4 w-4" />}
              loading={loading}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <StatsCard
              title="BTC Collateral Ratio"
              value={`${protocolStats.collateralRatio}%`}
              tooltip="Ratio of BTC collateral to USBD minted"
              icon={<Shield className="h-4 w-4" />}
              loading={loading}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <StatsCard
              title="Active Wallets"
              value={formatCompactNumber(protocolStats.activeWallets)}
              tooltip="Number of unique BTC holders in the protocol"
              icon={<Users className="h-4 w-4" />}
              loading={loading}
            />
          </div>
        </section>

        {/* BTC Distribution Section */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {hasRestricted && (
            <div className="flex items-center justify-between rounded-lg border border-dashed border-border/70 bg-secondary/40 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                  <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    Hidden Wallets
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Validation required to view distribution
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Restricted
              </span>
            </div>
          )}
          <BTCDistributionPie
            data={btcDistribution}
            hiddenBtcTotal={hiddenBtcApprox}
          />
        </section>

        {/* Wallet Holdings Table */}
        <section className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <WalletHoldingsTable wallets={wallets} loading={loading} />
        </section>
      </div>
    </div>
  );
}
