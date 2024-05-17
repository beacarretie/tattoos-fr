import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { amIArtist } from "../../app/slices/userSlice"


export const ArtistRoute = ({Component}) => {

    //Ruta privada que recibe un componente por props (una vista). Si eres admin, te devuelve el componente recibido, y si no te envía a home
    //de esta manera podemos definir rutas de acceso restringido que directamente no intenten cargar el componente si no tienes acceso.
    const isArtist = useSelector(amIArtist)

    return isArtist ? <Component /> : <Navigate to="/artist" /> 
}