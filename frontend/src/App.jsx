import { useState } from 'react'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/PostsList'


function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <CreatePost/>
      <PostsList/>
    </div>
  )
}

export default App
