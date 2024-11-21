import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tokens = [
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$1,890.45",
    change: "+2.5%",
    volume: "$1.2B",
    tvl: "$15.8B",
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: "$1.00",
    change: "0%",
    volume: "$985M",
    tvl: "$12.4B",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    price: "$1.00",
    change: "0%",
    volume: "$754M",
    tvl: "$10.1B",
  },
];

export function TokenStats() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Token Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>TVL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.symbol}>
                <TableCell className="font-medium">
                  {token.name} ({token.symbol})
                </TableCell>
                <TableCell>{token.price}</TableCell>
                <TableCell className={token.change.startsWith("+") ? "text-green-500" : ""}>
                  {token.change}
                </TableCell>
                <TableCell>{token.volume}</TableCell>
                <TableCell>{token.tvl}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}