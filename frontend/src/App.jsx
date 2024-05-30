import { useState } from 'react'
import CreatePost from './components/CreatePost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CreatePost/>
    </div>
  )
}

export default App
