import {Router} from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { ProjectExists } from '../middleware/project'
import { TaskBelongsToProject, TaskExist } from '../middleware/Task'

const router = Router()

router.post('/',
    body('projectName').
        notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName').
        notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description').
        notEmpty().withMessage('La Descripción es Obligatioria'),
    handleInputErrors,
    ProjectController.createProject

)
router.get('/',ProjectController.getAllProjects)

router.get('/:id',
    
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById

)

router.put('/:id',
    
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName').
        notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName').
        notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description').
        notEmpty().withMessage('La Descripción es Obligatioria'),
    handleInputErrors,
    ProjectController.updateProject

)

router.delete('/:id',

    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject

)

/** Routes for Tasks */

router.param('projectId',ProjectExists)

router.post('/:projectId/tasks',
    body('name').
        notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('description').
        notEmpty().withMessage('la descripción de la tarea es Obligatorio'),
    handleInputErrors,
    TaskController.createTask

)

router.get('/:projectId/tasks',
    handleInputErrors,
    TaskController.getProjectTasks
)

router.param('taskId',TaskExist)
router.param('taskId',TaskBelongsToProject)
    
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name').
        notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('description').
        notEmpty().withMessage('la descripción de la tarea es Obligatorio'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('status').
        notEmpty().withMessage('El estado de la tarea es Obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router