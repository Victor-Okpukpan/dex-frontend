"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useSimulateContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowDownUp } from "lucide-react";
import { SWAP_CONTRACT_ADDRESS, SWAP_CONTRACT_ABI } from '@/config/contracts';
import { toast } from 'sonner';

export function SwapCard() {
  const { address, isConnected } = useAccount();
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [amountOutMin, setAmountOutMin] = useState("0");

  // Get amount out calculation
  const { data: amountOut } = useReadContract({
    address: SWAP_CONTRACT_ADDRESS,
    abi: SWAP_CONTRACT_ABI,
    functionName: 'getAmountOut',
    args: [tokenIn, tokenOut, parseEther(amountIn || "0")],
    query: {
      enabled: Boolean(tokenIn && tokenOut && amountIn),
    },
  });

  // Prepare swap transaction
  const { data: simulateData } = useSimulateContract({
    address: SWAP_CONTRACT_ADDRESS,
    abi: SWAP_CONTRACT_ABI,
    functionName: 'swap',
    args: [
      tokenIn,
      tokenOut,
      parseEther(amountIn || "0"),
      parseEther(amountOutMin),
      BigInt(Math.floor(Date.now() / 1000) + 1800), // 30 min deadline
    ],
    query: {
      enabled: Boolean(tokenIn && tokenOut && amountIn && amountOutMin),
    },
  });

  // Execute swap
  const { writeContract, isPending } = useWriteContract();

  const handleSwap = async () => {
    try {
      if (!simulateData?.request) return;
      
      await writeContract(simulateData.request);
      toast.success('Swap successful!');
    } catch (error) {
      toast.error('Swap failed. Please try again.');
      console.error(error);
    }
  };

  // Update minimum amount out with slippage
  useEffect(() => {
    if (amountOut) {
      const minAmount = (Number(formatEther(amountOut)) * 0.995).toString(); // 0.5% slippage
      setAmountOutMin(minAmount);
    }
  }, [amountOut]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Trade tokens instantly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select onValueChange={setTokenIn}>
            <SelectTrigger>
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="number" 
            placeholder="Amount" 
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              const tempToken = tokenIn;
              setTokenIn(tokenOut);
              setTokenOut(tempToken);
            }}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <Select onValueChange={setTokenOut}>
            <SelectTrigger>
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="number" 
            placeholder="Amount" 
            value={amountOut ? formatEther(amountOut) : ""}
            readOnly 
          />
        </div>
        <div className="space-y-2 p-4 bg-muted rounded-lg">
          <div className="flex justify-between">
            <span>Rate</span>
            <span>
              1 {tokenIn.toUpperCase()} = {amountOut ? formatEther(amountOut) : "0"} {tokenOut.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Slippage</span>
            <span>0.5%</span>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleSwap}
          disabled={!simulateData?.request || isPending || !isConnected}
        >
          {!isConnected 
            ? "Connect Wallet" 
            : isPending 
              ? "Swapping..." 
              : "Swap"}
        </Button>
      </CardContent>
    </Card>
  );
}