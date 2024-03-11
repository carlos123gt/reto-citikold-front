import Input from '../../components/atom/Input'
import Button from '../../components/atom/Button/Button'
import Logo from '../../../public/images/logo.svg'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/userSlice'
import { setLoader } from '../../redux/loaderSlice'
import UserService from '../../Services/UserService'
import { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { PATHS } from '../../utils/constants'
import Modal from '../../components/molecule/Modal/Modal'

function FormLogin() {
    const dispatch = useDispatch();
    const user = useRef(null);
    const pass = useRef(null)
    const navigate = useNavigate();
    const [ modal, setModal ] = useState(false);
    const [ dataModal, setDataModal ] = useState('')
 
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));
        const data = {
            username: user.current.value,
            password: pass.current.value
        }
        const response = await UserService(data);
        if(response.username){
            dispatch(addUser({userName: response.username,}));
            navigate(PATHS.HOME)
        }else{
            setDataModal(response[Object.keys(response)[0]]);
            setModal(true)
        }
        dispatch(setLoader(false));
        
    }
  return (
    <>
        <form className='gap-6 grid' method='POST' onSubmit={(e) => handleLogin(e)}>
            <legend className='text-3xl text-center'>
                <img src={Logo} alt="logo" className='bg-primary rounded-3xl p-6'/>
                <p className='pt-6'>Login</p>
            </legend>
            <Input refEl={user} name="user" placeholder="Nombre de Usuario" label="Nombre de usuario" typeInput="text"/>
            <Input refEl={pass} name="pass" placeholder="Contraseña" label="Contraseña" typeInput="password"/>
            <Button typeButton="submit">
                Ingresar
            </Button>
        </form>
        {modal && (
            <Modal>
                <p className='pb-4 text-xl'>{dataModal}</p>
                <div onClick={() => setModal(false)}>
                    <Button typeButton="button">Aceptar</Button>
                </div>
            </Modal>
        )}
    </>
  )
}

export default FormLogin