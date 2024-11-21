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

export function CreatePoolCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Pool</CardTitle>
        <CardDescription>Add liquidity to earn trading fees</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select token 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Amount" />
        </div>
        <div className="space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select token 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Amount" />
        </div>
        <Button className="w-full">Create Pool</Button>
      </CardContent>
    </Card>
  )
} 