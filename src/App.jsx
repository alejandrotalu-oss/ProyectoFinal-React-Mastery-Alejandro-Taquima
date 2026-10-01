import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TaskFormPage from './pages/TaskFormPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tareas/nueva" element={<TaskFormPage />} />
      <Route path="/tareas/:id/editar" element={<TaskFormPage />} />
    </Routes>
  )
}

export default App