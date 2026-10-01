import { Link, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm'

function TaskFormPage() {
  const { id } = useParams()

  return (
    <main>
      <h1>{id ? 'Editar Tarea' : 'Nueva Tarea'}</h1>

      <TaskForm />

      <Link to="/">
        ← Volver a mis tareas
      </Link>
    </main>
  )
}

export default TaskFormPage