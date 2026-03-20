// Import scenarios - bundled with the app
import fire001 from '../data/fire-001-galley-oven.json'
import fire002 from '../data/fire-002-lavatory-waste-bin.json'
import depress001 from '../data/depress-001-sudden.json'
import evac001 from '../data/evac-001-unplanned-land.json'
import evac002 from '../data/evac-002-ditching.json'

export function loadScenarios() {
  return [
    fire001,
    fire002,
    depress001,
    evac001,
    evac002
  ]
}

export function getScenarioById(id) {
  const scenarios = {
    'fire-001': fire001,
    'fire-002': fire002,
    'depress-001': depress001,
    'evac-001': evac001,
    'evac-002': evac002
  }
  return scenarios[id] || null
}