import { FarmsList } from '@/components/farms-list'
import { StakeCard } from '@/components/stake-card'

export default function FarmPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FarmsList />
        </div>
        <div>
          <StakeCard />
        </div>
      </div>
    </div>
  )
} 