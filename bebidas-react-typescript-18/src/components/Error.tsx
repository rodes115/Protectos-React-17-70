import {ReactNode} from 'react'

export default function Error({children}:{children:ReactNode}) {
  return (
    <div className='text-4xl font-bold text-red-500'>{children}</div>
  )
}
