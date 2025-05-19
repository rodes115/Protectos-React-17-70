import type { Request, Response, NextFunction } from 'express'
import Task,{ ITask } from '../models/Task' 

declare global {

     namespace Express{
          interface Request{
               task: ITask
          }
     }

}

export async function TaskExist(req: Request, res: Response, next: NextFunction) {

     try {

          const { taskId } = req.params
          const task = await Task.findById(taskId)
          if (!task) {
               let error = new Error('Tarea no encontrada')
               res.status(404).json({ error: error.message })
          }
          req.task = task
          next()
     }
     catch (error) {
          res.status(500).json({ error: 'Hubo un error' })
     }

}

export async function TaskBelongsToProject(req: Request, res: Response, next: NextFunction) {
     try {
          if(req.task.project.toString() !== req.project.id.toString()){
               const error = new Error('Acción no válida')
               res.status(400).json({ error: error.message })
          }
          next()
     }catch (error) {
          res.status(500).json({ error: 'Error al validar la tarea' })
     }
}