import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BTCDistribution } from "@/lib/analytics";
import { truncateAddress, formatBTC } from "@/lib/formatters";

interface BTCDistributionPieProps {
  data: BTCDistribution[];
  loading?: boolean;
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

export function BTCDistributionPie({ data, loading = false }: BTCDistributionPieProps) {
  const topHolders = [...data].sort((a, b) => b.btcAmount - a.btcAmount).slice(0, 3);
  const largestPercentage = topHolders[0]?.percentage || 0;
  const smallHolders = data.filter((d) => d.btcAmount < 1);
  const smallHoldersPercentage = smallHolders.reduce((acc, d) => acc + d.percentage, 0);

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
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="btcAmount"
                  stroke="transparent"
                  strokeWidth={0}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
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
