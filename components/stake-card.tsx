"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function StakeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stake LP Tokens</CardTitle>
        <CardDescription>Stake your LP tokens to earn DEX rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select LP Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth-usdt">ETH/USDT LP</SelectItem>
              <SelectItem value="eth-usdc">ETH/USDC LP</SelectItem>
              <SelectItem value="usdt-usdc">USDT/USDC LP</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Amount" />
        </div>
        <div className="space-y-2 p-4 bg-muted rounded-lg">
          <div className="flex justify-between">
            <span>APR:</span>
            <span className="text-green-500">25.5%</span>
          </div>
          <div className="flex justify-between">
            <span>Your Stake:</span>
            <span>0 LP</span>
          </div>
          <div className="flex justify-between">
            <span>Earned DEX:</span>
            <span>0 DEX</span>
          </div>
        </div>
        <Button className="w-full">Stake LP Tokens</Button>
      </CardContent>
    </Card>
  )
} 