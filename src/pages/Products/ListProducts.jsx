import { useEffect, useRef, useState } from 'react';
import Table from '../../components/molecule/Table'
import { Delete, Edit } from '../../components/Icons';
import Button from '../../components/atom/Button';
import Modal from '../../components/molecule/Modal/Modal';
import Input from '../../components/atom/Input';
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/loaderSlice';
import { GetProductService, DeleteProducttService, CreateProductService, UpdateProductService } from '../../Services/ProductService'

function ListProducts() {
    const dispatch = useDispatch();

    const [ products, setProducts ] = useState([])
    const [ dataModal, setDatamodal ] = useState({})
    const [ modalDelete, setModalDelete ] = useState(false)
    const [ modalEdit, setModalEdit ] = useState(false)
    const [ modalAdd, setModalAdd ] = useState(false)

    const nombreEl = useRef(null)
    const codigoEl = useRef(null)
    const precioEl = useRef(null)
    const stockEl = useRef(null)

    const deleteProduct =  async (nombre) => {
       await DeleteProducttService(nombre)
       setModalDelete(false)
       getProducts()
    }

    const getProducts = async () => {
        dispatch(setLoader(true));
        const data = await GetProductService();
        setProducts(data);
        dispatch(setLoader(false));
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        const dataCreate = {
            codigo: codigoEl.current.value,
            nombre: nombreEl.current.value,
            precio: precioEl.current.value,
            stock: stockEl.current.value,
            activo: true
        }
        const res = await CreateProductService(dataCreate);
        console.log(res)
        setModalAdd(false)
        getProducts()
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const dataUpdate = {
            idProducto: dataModal.idProducto,
            codigo: codigoEl.current.value,
            nombre: nombreEl.current.value,
            precio: precioEl.current.value,
            stock: stockEl.current.value,
            activo: true
        }
        const res = await UpdateProductService(dataUpdate, dataModal.idProducto);
        console.log(res)
        setModalEdit(false)
        getProducts()
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
        getProducts()
    }, [])
  return (
    <>
        <div className='pt-4'>
            <div className='bg-white rounded-3xl shadow-sm p-12'>
            <div className='flex'>
                <div onClick={() => setModalAdd(true)}>
                    <Button>Crear nuevo producto</Button>
                </div>
            </div>
                <Table>
                    <thead className='border-b'>
                        <tr>
                            <th className='py-4 text-left'>Código</th>
                            <th className='py-4 text-left'>Nombre</th>
                            <th className='py-4 text-left'>Precio</th>
                            <th className='py-4 text-left'>Stock</th>
                            <th className='py-4 text-left'>Activo</th>
                            <th className='py-4 text-left'>Fecha Creación</th>
                            <th className='py-4 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={index} className='border-b'>
                            <td  className='py-4'>{item.codigo}</td>
                            <td className='py-4'>{item.nombre}</td>
                            <td className='py-4'>{item.precio} $</td>
                            <td className='py-4'>{item.stock}</td>
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
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

        {modalDelete && (
        <Modal>
            <h1 className="text-xl">
                ¿Estás seguro que quieres eliminar el producto?
            </h1>
            <p className="text-2xl text-center py-4">{dataModal.nombre}</p>
            <div className="flex justify-center gap-4 pt-6">
                <div onClick={() => deleteProduct(dataModal.nombre)}>
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
                Editar Producto
            </h1>
            <div className="flex justify-center flex-col gap-6 pt-6">
                <form className='flex flex-col gap-4' method='POST' onSubmit={(e) => handleUpdate(e)}>
                    <Input refEl={nombreEl} value={dataModal.nombre} name="nombre" placeholder="Nombre" label="Nombre de Cliente" typeInput="text"/>
                    <Input refEl={codigoEl} value={dataModal.codigo} name="codigo" placeholder="Codigo Producto" label="Codigo Producto" typeInput="number"/>
                    <Input refEl={precioEl} value={dataModal.precio} name="precio" placeholder="Precio" label="Precio" typeInput="number"/>
                    <Input refEl={stockEl} value={dataModal.stock} name="stock" placeholder="Stock" label="Stock" typeInput="number"/>
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
                Crear Producto
            </h1>
            <div className="flex justify-center flex-col gap-6 pt-6">
                <form className='flex flex-col gap-4' method='POST' onSubmit={(e) => handleCreate(e)}>
                <Input refEl={nombreEl}  name="nombre" placeholder="Nombre" label="Nombre de Producto" typeInput="text"/>
                    <Input refEl={codigoEl}  name="codigo" placeholder="Codigo Producto" label="Codigo Producto" typeInput="number"/>
                    <Input refEl={precioEl}  name="precio" placeholder="Precio" label="Precio" typeInput="number"/>
                    <Input refEl={stockEl}  name="stock" placeholder="Stock" label="Stock" typeInput="number"/>

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

export default ListProducts