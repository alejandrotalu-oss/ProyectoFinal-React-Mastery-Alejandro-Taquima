import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteTask, getTasks } from '../services/taskService'

function HomePage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true)
        setError('')

        const savedTasks = await getTasks()
        setTasks(savedTasks)
      } catch (error) {
        console.error(error)
        setError('No se pudieron cargar las tareas.')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta tarea?'
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteTask(id)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      console.error(error)
      setError('No se pudo eliminar la tarea.')
    }
  }

  if (loading) {
    return (
      <main>
        <p>Cargando tareas...</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Mis Tareas</h1>
      <Link to="/tareas/nueva" className="btn-primary">
       + Nueva tarea
       </Link>


      {error && <p>{error}</p>}

      {tasks.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <article key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <span className={`status status-${task.status}`}>
                {task.status === 'pendiente' && 'Pendiente'}
                {task.status === 'en-progreso' && 'En progreso'}
                {task.status === 'completada' && 'Completada'}
                </span>

              <Link to={`/tareas/${task.id}/editar`}
              className="btn-edit"
              >
                Editar
                </Link>

              <button
                type="button"
                onClick={() => handleDelete(task.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage