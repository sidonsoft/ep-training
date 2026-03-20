import { useState, useEffect } from 'react'
import ScenarioList from './components/ScenarioList'
import ScenarioPlayer from './components/ScenarioPlayer'
import Stats from './components/Stats'
import { loadScenarios } from './utils/loadScenarios'

function App() {
  const [scenarios, setScenarios] = useState([])
  const [currentView, setCurrentView] = useState('home')
  const [activeScenario, setActiveScenario] = useState(null)
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('ep-progress')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    async function fetchScenarios() {
      const data = await loadScenarios()
      setScenarios(data)
    }
    fetchScenarios()
  }, [])

  useEffect(() => {
    localStorage.setItem('ep-progress', JSON.stringify(progress))
  }, [progress])

  const handleStartScenario = (scenario) => {
    setActiveScenario(scenario)
    setCurrentView('scenario')
  }

  const handleCompleteScenario = (scenarioId, score) => {
    setProgress(prev => ({
      ...prev,
      [scenarioId]: {
        completed: true,
        score,
        completedAt: new Date().toISOString()
      }
    }))
    setCurrentView('home')
  }

  const handleBack = () => {
    setCurrentView('home')
    setActiveScenario(null)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">EP Training Prep</div>
        <div className="header-subtitle">Qantas Cabin Crew</div>
      </header>

      {currentView === 'home' && (
        <>
          <nav className="nav">
            <button
              className={`nav-tab ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Scenarios
            </button>
            <button
              className={`nav-tab ${currentView === 'stats' ? 'active' : ''}`}
              onClick={() => setCurrentView('stats')}
            >
              Progress
            </button>
          </nav>
          <ScenarioList
            scenarios={scenarios}
            progress={progress}
            onStart={handleStartScenario}
          />
        </>
      )}

      {currentView === 'stats' && (
        <>
          <nav className="nav">
            <button
              className={`nav-tab ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Scenarios
            </button>
            <button
              className={`nav-tab ${currentView === 'stats' ? 'active' : ''}`}
              onClick={() => setCurrentView('stats')}
            >
              Progress
            </button>
          </nav>
          <Stats scenarios={scenarios} progress={progress} />
        </>
      )}

      {currentView === 'scenario' && activeScenario && (
        <ScenarioPlayer
          scenario={activeScenario}
          progress={progress[activeScenario.id]}
          onComplete={handleCompleteScenario}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

export default App