function Stats({ scenarios, progress }) {
  const completedCount = Object.values(progress).filter(p => p.completed).length
  const totalScenarios = scenarios.length
  const avgScore = (() => {
    const scores = Object.values(progress)
      .filter(p => p.completed && typeof p.score === 'number')
      .map(p => p.score)
    if (scores.length === 0) return null
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  })()

  const getCategoryStats = () => {
    const stats = {}
    scenarios.forEach(s => {
      if (!stats[s.category]) {
        stats[s.category] = { total: 0, completed: 0 }
      }
      stats[s.category].total++
      if (progress[s.id]?.completed) {
        stats[s.category].completed++
      }
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'fire': return 'Fire Fighting'
      case 'depressurisation': return 'Depressurisation'
      case 'evacuation': return 'Evacuation'
      case 'medical': return 'Medical'
      case 'security': return 'Security'
      default: return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  return (
    <div style={{ padding: '16px' }}>
      <div className="stats-card">
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Your Progress</h2>

        <div className="stat-item">
          <span className="stat-label">Scenarios Completed</span>
          <span className="stat-value">{completedCount} / {totalScenarios}</span>
        </div>

        {avgScore !== null && (
          <div className="stat-item">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">{avgScore}%</span>
          </div>
        )}

        {Object.keys(categoryStats).length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-muted)' }}>
              By Category
            </h3>
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category} className="stat-item">
                <span className="stat-label">{getCategoryLabel(category)}</span>
                <span className="stat-value">{stats.completed} / {stats.total}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {Object.keys(progress).length > 0 && (
        <div className="stats-card" style={{ marginTop: '16px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-muted)' }}>
            Recent Activity
          </h3>
          {Object.entries(progress)
            .filter(([_, p]) => p.completed)
            .sort((a, b) => new Date(b[1].completedAt) - new Date(a[1].completedAt))
            .slice(0, 5)
            .map(([scenarioId, p]) => {
              const scenario = scenarios.find(s => s.id === scenarioId)
              const date = new Date(p.completedAt)
              return (
                <div key={scenarioId} className="stat-item">
                  <span className="stat-label">
                    {scenario?.title || scenarioId}
                  </span>
                  <span className="stat-value" style={{
                    color: p.score >= 80 ? 'var(--color-success)' : p.score >= 50 ? 'var(--color-warning)' : 'var(--color-error)'
                  }}>
                    {p.score}%
                  </span>
                </div>
              )
            })}
        </div>
      )}

      {completedCount === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--color-text-muted)',
          fontSize: '14px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
          <div>Complete scenarios to track your progress</div>
        </div>
      )}
    </div>
  )
}

export default Stats