import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider'
import axios from 'axios'
const useGetUser = () => {
const { user} = useContext(AuthContext)

  const { data: role = '',  } = useQuery({
    queryKey: ['role', user?.email],
    
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/users/${user?.email}`)
      return data.role
    },
  })


  return role
}

export default useGetUser