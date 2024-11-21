import { PriceChart } from '@/components/price-chart';
import { SwapCard } from '@/components/swap-card';
import { TokenStats } from '@/components/token-stats';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceChart />
          <TokenStats />
        </div>
        <div>
          <SwapCard />
        </div>
      </div>
    </div>
  );
}