import { useState, useMemo } from 'react'

function ScenarioPlayer({ scenario, progress, onComplete, onBack }) {
  const nodes = useMemo(() => scenario.nodes, [scenario])
  const nodeOrder = useMemo(() => {
    // Walk through nodes to get order
    const order = []
    let currentId = 'start'
    while (currentId && nodes[currentId]) {
      order.push(currentId)
      const node = nodes[currentId]
      if (node.type === 'completion') break
      // Get first choice's next_node
      const choices = node.choices
      if (choices && choices[0]) {
        currentId = choices[0].next_node
      } else {
        break
      }
    }
    return order
  }, [nodes])

  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [answers, setAnswers] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(null)

  const currentNode = nodes[currentNodeId]
  const currentIndex = nodeOrder.indexOf(currentNodeId)
  const totalSteps = nodeOrder.length
  const progressPercent = Math.round(((currentIndex + 1) / totalSteps) * 100)

  const handleChoice = (choice) => {
    setSelectedChoice(choice)
    setAnswers([...answers, { nodeId: currentNodeId, correct: choice.correct }])
    setShowFeedback(true)
  }

  const handleNext = () => {
    // For completion screen, no need for selectedChoice
    if (currentNode.type === 'completion') {
      // Calculate score
      const totalCorrect = answers.filter(a => a.correct).length
      const score = answers.length > 0 ? Math.round((totalCorrect / answers.length) * 100) : 0
      onComplete(scenario.id, score)
      return
    }

    if (!selectedChoice) return

    setShowFeedback(false)
    setSelectedChoice(null)

    // Go to next node based on correct choice flow
    const nextNode = selectedChoice.next_node
    if (nextNode && nodes[nextNode]) {
      setCurrentNodeId(nextNode)
    }
  }

  const getFeedbackClass = (choice) => {
    if (!showFeedback || choice.id !== selectedChoice?.id) return ''
    return choice.correct ? 'selected-correct' : 'selected-incorrect'
  }

  if (!currentNode) {
    return (
      <div className="scenario-player">
        <div className="scenario-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
        </div>
        <div style={{ padding: 20 }}>Error loading scenario</div>
      </div>
    )
  }

  return (
    <div className="scenario-player">
      <div className="scenario-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="scenario-content">
        <div className="situation-text">{currentNode.content}</div>

        {currentNode.type === 'completion' ? (
          <div className="completion-screen">
            <div className="completion-icon">✈️</div>
            <div className="completion-title">Scenario Complete</div>
            <div className="completion-score">
              {Math.round((answers.filter(a => a.correct).length / answers.length) * 100)}%
            </div>
            <div className="completion-message">
              {answers.filter(a => a.correct).length} of {answers.length} decisions correct
            </div>
            <div className="completion-content">
              <h3>Key Learning Points</h3>
              <div dangerouslySetInnerHTML={{ __html: currentNode.content.split('### Key Learning Points')[1]?.replace(/\n/g, '<br/>') || '' }} />
            </div>
            <div className="completion-buttons">
              <button className="next-button" onClick={handleNext}>
                Finish & Return Home
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="choices">
              {currentNode.choices?.map((choice) => (
                <div key={choice.id}>
                  <button
                    className={`choice-button ${getFeedbackClass(choice)}`}
                    onClick={() => handleChoice(choice)}
                    disabled={showFeedback}
                  >
                    {choice.text}
                  </button>
                  {showFeedback && choice.id === selectedChoice?.id && (
                    <div className={`feedback-box ${choice.correct ? 'feedback-correct' : 'feedback-incorrect'}`}>
                      {choice.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showFeedback && (
              <button className="next-button" onClick={handleNext}>
                Continue →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ScenarioPlayer