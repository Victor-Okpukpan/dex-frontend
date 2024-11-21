"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Wallet2, ChevronDown, ExternalLink, Copy, Power } from "lucide-react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useEnsName, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function Navigation() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ 
    address,
    query: {
      enabled: Boolean(address),
    }
  });
  const { data: balance } = useBalance({ 
    address,
    query: {
      enabled: Boolean(address),
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await connect({ connector: injected() });
    } catch (error) {
      toast.error("Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      toast.error("Failed to disconnect wallet");
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  const shortenAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: typeof balance) => {
    if (!bal) return "0";
    return parseFloat(bal.formatted).toFixed(4);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold">
              DEX
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/swap" className="text-foreground/60 hover:text-foreground">
                Swap
              </Link>
              <Link href="/pools" className="text-foreground/60 hover:text-foreground">
                Pools
              </Link>
              <Link href="/farm" className="text-foreground/60 hover:text-foreground">
                Farm
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    <div className="flex items-center">
                      <Wallet2 className="mr-2 h-4 w-4" />
                      <span className="truncate">
                        {ensName || shortenAddress(address)}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[240px]">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {formatBalance(balance)} {balance?.symbol}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={copyAddress}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={`https://etherscan.io/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Etherscan
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDisconnect}>
                    <Power className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleConnect}
                disabled={isLoading}
              >
                <Wallet2 className="mr-2 h-4 w-4" />
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}