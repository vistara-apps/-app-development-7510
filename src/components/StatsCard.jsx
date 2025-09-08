import React from 'react'

const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          <p className="text-green-400 text-sm mt-1">{change} from last month</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  )
}

export default StatsCard