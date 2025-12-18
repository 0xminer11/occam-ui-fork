import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Wallet } from "@/lib/analytics";
import {
  truncateAddress,
  formatBTC,
  formatCompactNumber,
  formatPercentage,
  formatTimeAgo,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface WalletHoldingsTableProps {
  wallets: Wallet[];
  loading?: boolean;
}

type SortField = "btcBalance" | "change1d" | "change7d" | "change30d" | "usbdMinted" | "lastActive";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

function ChangeIndicator({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
  isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
      )}
    >
      {isPositive ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )}
      {formatPercentage(value)}
    </span>
  );
}

function CopyableAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleCopy}
          className="group inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-primary"
        >
          {truncateAddress(address)}
          {copied ? (
            <Check className="h-3 w-3 text-success" />
          ) : (
            <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-mono text-xs">{address}</p>
        <p className="mt-1 text-xs text-muted-foreground">Click to copy</p>
      </TooltipContent>
    </Tooltip>
  );
}

function SortButton({
  field,
  currentField,
  direction,
  onSort,
  children,
}: {
  field: SortField;
  currentField: SortField | null;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}) {
  const isActive = currentField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="inline-flex items-center gap-1 text-left font-medium transition-colors hover:text-primary"
    >
      {children}
      {isActive ? (
        direction === "asc" ? (
          <ArrowUp className="h-3 w-3 text-primary" />
        ) : (
          <ArrowDown className="h-3 w-3 text-primary" />
        )
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-50" />
      )}
    </button>
  );
}

export function WalletHoldingsTable({
  wallets,
  loading = false,
}: WalletHoldingsTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField | null>("btcBalance");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setPage(1);
  };

  const filteredAndSortedWallets = useMemo(() => {
    let result = [...wallets];

    // Filter
    if (search) {
      result = result.filter((w) =>
        w.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let aVal: number | Date = a[sortField];
        let bVal: number | Date = b[sortField];

        if (sortField === "lastActive") {
          aVal = (aVal as Date).getTime();
          bVal = (bVal as Date).getTime();
        }

        if (sortDirection === "asc") {
          return (aVal as number) - (bVal as number);
        }
        return (bVal as number) - (aVal as number);
      });
    }

    return result;
  }, [wallets, search, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedWallets.length / ITEMS_PER_PAGE);
  const paginatedWallets = filteredAndSortedWallets.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle>User BTC Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold">
            User BTC Holdings
          </CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search wallet address..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">
                  Wallet Address
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <SortButton
                    field="btcBalance"
                    currentField={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                  >
                    BTC Holdings
                  </SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <SortButton
                    field="change1d"
                    currentField={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                  >
                    24h
                  </SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <SortButton
                    field="change7d"
                    currentField={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                  >
                    7d
                  </SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <SortButton
                    field="change30d"
                    currentField={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                  >
                    30d
                  </SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <SortButton
                    field="usbdMinted"
                    currentField={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                  >
                    USBD Minted
                  </SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <SortButton
                    field="lastActive"
                    currentField={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                  >
                    Last Activity
                  </SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedWallets.map((wallet) => (
                <TableRow
                  key={wallet.address}
                  className="border-border/30 transition-colors hover:bg-secondary/30"
                >
                  <TableCell>
                    <CopyableAddress address={wallet.address} />
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {formatBTC(wallet.btcBalance)} BTC
                  </TableCell>
                  <TableCell>
                    <ChangeIndicator value={wallet.change1d} />
                  </TableCell>
                  <TableCell>
                    <ChangeIndicator value={wallet.change7d} />
                  </TableCell>
                  <TableCell>
                    <ChangeIndicator value={wallet.change30d} />
                  </TableCell>
                  <TableCell className="text-foreground">
                    ${formatCompactNumber(wallet.usbdMinted)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatTimeAgo(wallet.lastActive)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(page * ITEMS_PER_PAGE, filteredAndSortedWallets.length)} of{" "}
            {filteredAndSortedWallets.length} wallets
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border-border/50 bg-secondary/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border-border/50 bg-secondary/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
