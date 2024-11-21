import { PoolsList } from '@/components/pools-list'
import { CreatePoolCard } from '@/components/create-pool-card'

export default function PoolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PoolsList />
        </div>
        <div>
          <CreatePoolCard />
        </div>
      </div>
    </div>
  )
} 