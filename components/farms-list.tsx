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

const farms = [
  {
    pool: "ETH/USDT LP",
    tvl: "$15.8M",
    apr: "25.5%",
    rewards: "DEX",
    myStake: "$1,250",
  },
  {
    pool: "ETH/USDC LP",
    tvl: "$12.4M",
    apr: "22.2%",
    rewards: "DEX",
    myStake: "$850",
  },
  {
    pool: "USDT/USDC LP",
    tvl: "$10.1M",
    apr: "18.5%",
    rewards: "DEX",
    myStake: "$0",
  },
]

export function FarmsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yield Farms</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pool</TableHead>
              <TableHead>TVL</TableHead>
              <TableHead>APR</TableHead>
              <TableHead>Rewards</TableHead>
              <TableHead>My Stake</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms.map((farm) => (
              <TableRow key={farm.pool}>
                <TableCell className="font-medium">{farm.pool}</TableCell>
                <TableCell>{farm.tvl}</TableCell>
                <TableCell className="text-green-500">{farm.apr}</TableCell>
                <TableCell>{farm.rewards}</TableCell>
                <TableCell>{farm.myStake}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 