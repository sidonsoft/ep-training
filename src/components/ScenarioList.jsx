function ScenarioList({ scenarios, progress, onStart }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'fire': return '#dc2626'
      case 'depressurisation': return '#2563eb'
      case 'evacuation': return '#ea580c'
      case 'medical': return '#16a34a'
      case 'security': return '#9333ea'
      default: return '#64748b'
    }
  }

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'fire': return 'FIRE'
      case 'depressurisation': return 'DEPRESSURISATION'
      case 'evacuation': return 'EVACUATION'
      case 'medical': return 'MEDICAL'
      case 'security': return 'SECURITY'
      default: return category.toUpperCase()
    }
  }

  return (
    <div className="scenario-list">
      {scenarios.length === 0 && (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading scenarios...
        </div>
      )}
      {scenarios.map(scenario => {
        const scenarioProgress = progress[scenario.id]
        const isComplete = scenarioProgress?.completed
        const score = scenarioProgress?.score

        return (
          <div
            key={scenario.id}
            className="scenario-card"
            onClick={() => onStart(scenario)}
          >
            <div
              className="scenario-category"
              style={{ color: getCategoryColor(scenario.category) }}
            >
              {getCategoryLabel(scenario.category)}
            </div>
            <div className="scenario-title">{scenario.title}</div>
            <div className="scenario-meta">
              <span>{scenario.aircraft}</span>
              <span>•</span>
              <span>{Object.keys(scenario.nodes).length} decisions</span>
              {isComplete && (
                <>
                  <span>•</span>
                  <span className="scenario-status status-complete">
                    ✓ {score}% correct
                  </span>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ScenarioList