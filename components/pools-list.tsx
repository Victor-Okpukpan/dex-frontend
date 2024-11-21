"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const pools = [
  {
    pair: "ETH/USDT",
    liquidity: "$15.8M",
    volume24h: "$1.2M",
    apr: "12.5%",
    myLiquidity: "$1,250",
  },
  {
    pair: "ETH/USDC",
    liquidity: "$12.4M",
    volume24h: "$985K",
    apr: "10.2%",
    myLiquidity: "$850",
  },
  {
    pair: "USDT/USDC",
    liquidity: "$10.1M",
    volume24h: "$754K",
    apr: "8.5%",
    myLiquidity: "$0",
  },
]

export function PoolsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liquidity Pools</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pool</TableHead>
              <TableHead>Liquidity</TableHead>
              <TableHead>24h Volume</TableHead>
              <TableHead>APR</TableHead>
              <TableHead>My Liquidity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools.map((pool) => (
              <TableRow key={pool.pair}>
                <TableCell className="font-medium">{pool.pair}</TableCell>
                <TableCell>{pool.liquidity}</TableCell>
                <TableCell>{pool.volume24h}</TableCell>
                <TableCell className="text-green-500">{pool.apr}</TableCell>
                <TableCell>{pool.myLiquidity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 