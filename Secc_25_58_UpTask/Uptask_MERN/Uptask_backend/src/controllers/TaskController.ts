import { Request, Response } from 'express'
import Task from '../models/Task'


export class TaskController {

     static  createTask = async (req: Request, res: Response) => {

          try {
               const task = new Task(req.body)

               task.project = req.project.id
               req.project.tasks.push(task.id)

               await Promise.allSettled([task.save(), req.project.save()])
               res.send('Tarea creada correctamente')

          } catch (error) {
               console.log(error)
          }
     }

     static  getProjectTasks = async (req: Request, res: Response) => {

          try {
               const tasks = await Task.find({ project: req.project.id }).populate('project')

               if (!tasks) {
                    res.status(404).json({ error: 'No se encontraron tareas para este proyecto' })
               }
               res.status(200).json(tasks)

          } catch (error) {
               res.status(500).json({ error: 'Error al obtener las tareas del proyecto' })
          }

     }

     static  getTaskById = async (req: Request, res: Response) => {

          try {
               res.status(200).json(req.task)

          } catch (error) {
               res.status(500).json({ error: 'Error al obtener la tarea' })

          }

     }

     static updateTask = async (req: Request, res: Response) => {

          try {
               req.task.name = req.body.name
               req.task.description = req.body.description

               await req.task.save()
               res.status(200).json({ message: 'Tarea actualizada correctamente' })

          } catch (error) {
               res.status(500).json({ error: 'Error al actualizar la tarea' })    
          }

     }

     static deleteTask = async (req:Request , res:Response) => {
     
          try {

               req.project.tasks = req.project.tasks.filter(t => t.toString() !== req.task.id.toString())
               await Promise.allSettled([req.task.deleteOne(), req.project.save()])
               res.status(200).json({ message: 'Tarea eliminada correctamente' })   

          } catch (error) {
               res.status(500).json({ error: 'Error al eliminar la tarea' })
          }
     
     }

     static updateStatus = async (req:Request , res:Response) => {

          try {

               const {status} = req.body
               req.task.status = status
               await req.task.save()
               res.status(200).json({ message: 'Estado de la tarea actualizado correctamente' })

          } catch (error) {
               res.status(500).json({ error: 'Error al eliminar la tarea' })
               
          }

     }

}