import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './routes/routes'
import AuthInitializer from './components/shared/AuthInitializer'

function App() {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  )
}

export default App
