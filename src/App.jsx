import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Atelier AH</h1>
        <p>React 프로젝트가 성공적으로 설정되었습니다!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          클릭 횟수: {count}
        </button>
      </header>
    </div>
  )
}

export default App

