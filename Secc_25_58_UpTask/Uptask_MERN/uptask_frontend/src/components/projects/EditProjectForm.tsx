import { Link, useNavigate,  } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { Project, ProjectFormData } from "@/typs/index";
import { useForm } from "react-hook-form";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
     data: ProjectFormData
     projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

     const navigate = useNavigate()
     const initialValues: ProjectFormData = {
          projectName: data.projectName,
          clientName: data.clientName,
          description: data.description
     }

     const queryClient = useQueryClient()
     const {mutate} = useMutation({
          mutationFn: updateProject,
          onError: (error) =>{
               toast.error(error.message)
          },
          onSuccess:(data)=>{
               queryClient.invalidateQueries({queryKey: ['projects']})
               queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
               toast.success(data)
               navigate('/')
          }
     })

     const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


     const handleForm = (formData : ProjectFormData) => {
          const data = {
               formData,
               projectId
          }
          mutate(data)
     }

     return (
          <>
               <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-black">Editar Proyecto</h1>
                    <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para Editar el proyecto</p>

                    <nav className="my-5">
                         <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white textxl font-bold cursor-pointer trasition-colors"
                              to='/'>
                              Volver a Proyectos
                         </Link>

                    </nav>

                    <form
                         className='mt-10 bg-white shadow-lg p-10 rounded-lg'
                         onSubmit={handleSubmit(handleForm)}
                         noValidate
                    >
                         <ProjectForm
                              register={register}
                              errors={errors}
                         />

                         <input
                              type="submit"
                              value='Guardar Cambios'
                              className='bg-fuchsia-600 hover:bg-fuchsia700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
                         />
                    </form>
               </div>
          </>
     )
}
