import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const navigate=useNavigate()

    let auth = { 'token': false }
    return (
        !auth.token ? <Outlet/>
            :
            navigate('/')
    )
}

export default PrivateRoutes