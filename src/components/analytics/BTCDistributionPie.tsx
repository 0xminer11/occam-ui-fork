import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Lock } from "lucide-react";
import { BTCDistribution } from "@/lib/analytics";
import { truncateAddress, formatBTC } from "@/lib/formatters";

interface BTCDistributionPieDatum extends BTCDistribution {
  isRestricted?: boolean;
}

interface BTCDistributionPieProps {
  data: BTCDistribution[];
  hiddenBtcTotal?: number; // aggregated BTC for restricted wallets (approximate)
}

// Dark-theme friendly palette
const COLORS = [
  "hsl(28, 90%, 60%)",   // warm orange
  "hsl(210, 75%, 60%)",  // bright blue
  "hsl(265, 65%, 62%)",  // violet
  "hsl(170, 60%, 48%)",  // teal
  "hsl(340, 65%, 60%)",  // muted pink
  "hsl(46, 85%, 58%)",   // warm yellow
  "hsl(190, 65%, 50%)",  // cyan
  "hsl(250, 55%, 54%)",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    if (data.isRestricted) {
      const approxPercent = data.percentage
        ? `~${Math.round(data.percentage)}% of total`
        : "Partial share of total";

      return (
        <div className="gradient-card rounded-lg border border-border/50 p-3 shadow-xl">
          <p className="text-xs font-semibold text-foreground">Hidden wallet distribution</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Validation required to view details.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{approxPercent}</p>
        </div>
      );
    }
    return (
      <div className="gradient-card rounded-lg border border-border/50 p-3 shadow-xl">
        <p className="font-mono text-xs text-primary">
          {truncateAddress(data.address)}
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {formatBTC(data.btcAmount)} BTC
        </p>
        <p className="text-xs text-muted-foreground">
          {data.percentage.toFixed(2)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function BTCDistributionPie({
  data,
  hiddenBtcTotal,
}: BTCDistributionPieProps) {
  const totalVisibleBtc = data.reduce((acc, d) => acc + d.btcAmount, 0);
  const hasRestricted = hiddenBtcTotal && hiddenBtcTotal > 0;

  const totalBtcForPercent = totalVisibleBtc + (hiddenBtcTotal || 0);

  const chartData: BTCDistributionPieDatum[] = data.map((d) => ({
    ...d,
    percentage: totalBtcForPercent
      ? (d.btcAmount / totalBtcForPercent) * 100
      : d.percentage,
  }));

  if (hasRestricted) {
    const hiddenPercentage = totalBtcForPercent
      ? (hiddenBtcTotal! / totalBtcForPercent) * 100
      : undefined;

    // chartData.push({
    //   address: "hidden-wallets",
    //   btcAmount: hiddenBtcTotal!,
    //   percentage: hiddenPercentage || 0,
    //   isRestricted: true,
    // } as BTCDistributionPieDatum);
  }

  const topHolders = [...data]
    .sort((a, b) => b.btcAmount - a.btcAmount)
    .slice(0, 3);
  const largestPercentage = topHolders[0]?.percentage || 0;
  const smallHolders = data.filter((d) => d.btcAmount < 1);
  const smallHoldersPercentage = smallHolders.reduce(
    (acc, d) => acc + d.percentage,
    0
  );

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">BTC Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="btcAmount"
                  stroke="transparent"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => {
                    const isRestricted = entry.isRestricted;
                    const baseColor = isRestricted
                      ? "hsl(220, 10%, 35%)"
                      : COLORS[index % COLORS.length];

                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={baseColor}
                        className={
                          isRestricted
                            ? "cursor-default opacity-60 [stroke-width:1.5px] [stroke:rgba(148,163,184,0.55)]"
                            : "transition-opacity duration-200 hover:opacity-80"
                        }
                        aria-label={
                          isRestricted
                            ? "Hidden wallet data — validation required"
                            : undefined
                        }
                      />
                    );
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {hasRestricted && (
              <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Partial View
                </p>
                <p className="mt-1 max-w-[120px] text-[11px] text-muted-foreground/80">
                  Some wallet data is hidden
                </p>
              </div>
            )}
          </div>

          {/* Legend / Insights Panel */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                Top 3 BTC Holders
              </h4>
              <div className="space-y-3">
                {topHolders.map((holder, index) => (
                  <div
                    key={holder.address}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-mono text-xs text-foreground">
                        {truncateAddress(holder.address)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {formatBTC(holder.btcAmount)} BTC
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {holder.percentage.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground">Largest Wallet</p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {largestPercentage.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground">{"Long-tail (<1 BTC)"}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {smallHoldersPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
