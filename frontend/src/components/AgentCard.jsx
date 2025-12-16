export default function AgentCard({ agent, status, message, progress }) {
  const statusColors = {
    working: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    pending: 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const statusIcons = {
    working: '⚙️',
    completed: '✅',
    error: '❌',
    pending: '⏳'
  }

  return (
    <div className={`border-2 rounded-lg p-4 transition-all ${statusColors[status] || statusColors.pending}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{statusIcons[status] || statusIcons.pending}</span>
          <h3 className="font-semibold">{agent}</h3>
        </div>
        <span className="text-sm font-medium">{progress}%</span>
      </div>

      <p className="text-sm">{message}</p>

      {status === 'working' && (
        <div className="mt-3 w-full bg-white rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
