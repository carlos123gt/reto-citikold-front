/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { menuLinks } from '../../../utils/data'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { deleteUser } from '../../../redux/userSlice';
import { PATHS } from '../../../utils/constants';
import Logo from '../../../../public/images/logo.svg'
import Button from '../../atom/Button'

function SideBarMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(deleteUser());
        navigate(PATHS.LOGIN);
    }
  return (
    <div className='py-5 bg-primary rounded-e-3xl h-screen text-white'>
        <img src={Logo} className='w-[200px] mx-auto' alt="logo" />
        <ul className='flex gap-3 flex-col pt-6'>
            {menuLinks.map((item, index) => (
                <li className={`cursor-pointer relative flex ${index == 0 && 'text-primary bg-silverbg rounded-s-3xl after:bg-silverbg after:absolute after:w-12 after:h-10 after:-right-3  after:top-1/2 before:bg-silverbg before:absolute before:w-12 before:h-10 before:-right-3  before:bottom-1/2'}`} key={index}>
                    {index == 0 && (
                            <div className='after:bg-primary after:absolute after:w-16 after:h-16 after:-right-0 after:rounded-3xl after:bottom-11 before:bg-primary before:absolute before:w-16 before:h-16 before:-right-0 before:rounded-3xl before:top-11 before:z-30'></div>
                        )}
                    {item.subMenu && (
                        <details className='px-5 py-2.5 group list-image-none w-full'>
                            <summary className='list-image-none flex justify-between w-full'>
                                {item.title} <span className='z-50 group-open:rotate-90'>{'>'}</span>
                                </summary>
                            <ul className='pl-4 flex flex-col'>
                                {item.subMenu.map((subItem, subIndex) => (
                                    <Link className='w-full  px-5 pt-3' key={subIndex} to={subItem.href}>
                                        <li className=''>
                                            {subItem.title}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </details>
                    ) || (
                        
                        <Link className='w-full  px-5 py-2.5' to={item.href}>{item.title}</Link>
                    )}
                </li>
            ))}
        </ul>
        <div className='p-5 hover:underline cursor-pointer' onClick={() => handleLogOut()}>
                Cerrar Sesión
        </div>
    </div>
  )
}

export default SideBarMenu