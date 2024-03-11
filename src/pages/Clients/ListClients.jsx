import { useEffect, useRef, useState } from 'react';
import Table from '../../components/molecule/Table'
import { GetClientService, DeleteClientService, CreateClientService, UpdateClientService } from '../../Services/ClientService'
import { Delete, Edit } from '../../components/Icons';
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/loaderSlice';
import Button from '../../components/atom/Button';
import Modal from '../../components/molecule/Modal/Modal';
import Input from '../../components/atom/Input';

function ListClients() {
    const dispatch = useDispatch();

    const [ clients, setClients ] = useState([])
    const [ dataModal, setDatamodal ] = useState({})
    const [ modalDelete, setModalDelete ] = useState(false)
    const [ modalEdit, setModalEdit ] = useState(false)
    const [ modalAdd, setModalAdd ] = useState(false)

    const nombreEl = useRef(null)
    const rucDniEl = useRef(null)
    const direccionEl = useRef(null)
    const correoEl = useRef(null)

    const deleteClient =  async (rucDni) => {
       await DeleteClientService(rucDni)
       setModalDelete(false)
       getClients()
    }

    const getClients = async () => {
        dispatch(setLoader(true));
        const data = await GetClientService();
        setClients(data)
        console.log(data)
        dispatch(setLoader(false));
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        dispatch(setLoader(true));
        const dataCreate = {
            rucDni: rucDniEl.current.value,
            nombre: nombreEl.current.value,
            direccion: direccionEl.current.value,
            correo: correoEl.current.value,
            activo: true
        }
        const res = await CreateClientService(dataCreate);
        console.log(res)
        setModalAdd(false)
        getClients()
        dispatch(setLoader(false));
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch(setLoader(true));
        const dataUpdate = {
            idCliente: dataModal.idCliente,
            rucDni: rucDniEl.current.value,
            nombre: nombreEl.current.value,
            direccion: direccionEl.current.value,
            correo: correoEl.current.value,
            activo: true
        }
        console.log(dataUpdate)
        console.log(dataModal.rucDni)
        const res = await UpdateClientService(dataUpdate, dataModal.idCliente);
        console.log(res)
        setModalEdit(false)
        getClients()
        dispatch(setLoader(false));
    }

    const handleDelete = (data) => {
        setDatamodal(data);
        setModalDelete(true)
    }

    const handleEdit = (data) => {
        setDatamodal(data);
        setModalEdit(true)
    }

    useEffect(() => {
        getClients()
    }, [])
  return (
    <>
    <div className='pt-4'>
        <div className='bg-white rounded-3xl shadow-sm p-12'>
            <div className='flex'>
                <div onClick={() => setModalAdd(true)}>
                    <Button>Crear nuevo cliente</Button>
                </div>
            </div>
            <Table>
                <thead className='border-b'>
                    <tr>
                        <th className='py-4 text-left'>Código</th>
                        <th className='py-4 text-left'>RUC/DNI</th>
                        <th className='py-4 text-left'>Nombre</th>
                        <th className='py-4 text-left'>Dirección</th>
                        <th className='py-4 text-left'>Correo</th>
                        <th className='py-4 text-left'>Activo</th>
                        <th className='py-4 text-left'>Fecha Creación</th>
                        <th className='py-4 text-left'>Actions</th>
                        
                    </tr>
                </thead>
                <tbody className='[&:not(:last-child)]:border'>
                    {clients?.map((item, index) => {
                    return (
                    <tr key={index} className='border-b '>
                        <td  className='py-4'>{item.idCliente}</td>
                        <td  className='py-4'>{item.rucDni}</td>
                        <td className='py-4'>{item.nombre}</td>
                        <td className='py-4'>{item.direccion}</td>
                        <td className='py-4'>{item.correo}</td>
                        <td className='py-4'>{item.activo && 'Si' || 'No'}</td>
                        <td className='py-4'>{item.fechaCreacion}</td>
                        <td className='py-4 flex gap-4'>
                            <button onClick={() => handleEdit(item)}>
                                <Edit width={32} height={32}/>
                            </button>
                            <button onClick={() => handleDelete(item)}>
                                <Delete width={32} height={32}/>
                            </button>
                        </td>
                    </tr>
                    )
                    })}
                </tbody>
            </Table>
        </div>
    </div>
    {modalDelete && (
        <Modal>
            <h1 className="text-xl">
                ¿Estás seguro que quieres eliminar el cliente?
            </h1>
            <p className="text-2xl text-center py-4">{dataModal.nombre}</p>
            <div className="flex justify-center gap-4 pt-6">
                <div onClick={() => deleteClient(dataModal.rucDni)}>
                    <Button variant="danger" typeButton='button'>Eliminar</Button>
                </div>
                <div onClick={() => setModalDelete(false)}>
                    <Button variant="secondary" typeButton='button'>Cancelar</Button>
                </div>
            </div>
        </Modal>
    )}
    {modalEdit && (
        <Modal>
            <h1 className="text-2xl">
                Editar Cliente
            </h1>
            <div className="flex justify-center flex-col gap-6 pt-6">
                <form className='flex flex-col gap-4' method='POST' onSubmit={(e) => handleUpdate(e)}>
                    <Input refEl={nombreEl} value={dataModal.nombre} name="nombre" placeholder="Nombre" label="Nombre de Cliente" typeInput="text"/>
                    <Input refEl={rucDniEl} value={dataModal.rucDni} name="rucDni" placeholder="RUC / DNI" label="RUC / DNI" typeInput="number"/>
                    <Input refEl={direccionEl} value={dataModal.direccion} name="direccion" placeholder="Dirección" label="Dirección" typeInput="text"/>
                    <Input refEl={correoEl} value={dataModal.correo} name="correo" placeholder="Correo" label="Correo" typeInput="email"/>
                    <div>
                        <Button variant="primary" typeButton='submit'>Guardar</Button>
                    </div>

                </form>
                <div onClick={() => setModalEdit(false)}>
                    <Button variant="secondary" typeButton='button'>Cancelar</Button>
                </div>
            </div>
        </Modal>
    )}

    {modalAdd && (
        <Modal>
            <h1 className="text-2xl">
                Crear Cliente
            </h1>
            <div className="flex justify-center flex-col gap-6 pt-6">
                <form className='flex flex-col gap-4' method='POST' onSubmit={(e) => handleCreate(e)}>
                    <Input refEl={nombreEl} name="nombre" placeholder="Nombre" label="Nombre de Cliente" typeInput="text"/>
                    <Input refEl={rucDniEl} name="rucDni" placeholder="RUC / DNI" label="RUC / DNI" typeInput="number"/>
                    <Input refEl={direccionEl} name="direccion" placeholder="Dirección" label="Dirección" typeInput="text"/>
                    <Input refEl={correoEl} name="correo" placeholder="Correo" label="Correo" typeInput="email"/>

                <div>
                    <Button variant="primary" typeButton='submit'>Guardar</Button>
                </div>
                </form>
                <div onClick={() => setModalAdd(false)}>
                    <Button variant="secondary" typeButton='button'>Cancelar</Button>
                </div>
            </div>
        </Modal>
    )}
    
    </>
  )
}

export default ListClients