import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CreatePost/>
    </div>
  )
}

export default App
