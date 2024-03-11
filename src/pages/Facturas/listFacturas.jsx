import { useEffect, useRef, useState } from 'react';
import Table from '../../components/molecule/Table'
import { GetFacturaService, CreateFacturaService, DeleteFacturaService } from '../../Services/FacturasService';
import { GetClientService, CreateClientService } from '../../Services/ClientService';
import { GetProductService } from '../../Services/ProductService';
import { Delete, Detail } from '../../components/Icons';
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/loaderSlice';
import Button from '../../components/atom/Button';
import Modal from '../../components/molecule/Modal/Modal';
import Input from '../../components/atom/Input';
import Select from '../../components/atom/Select';
import { IGV } from '../../utils/constants';
import Logo from '../../../public/images/logo.svg';

function ListFacturas() {
    const dispatch = useDispatch();

    const [ facturas, setFacturas ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ items, setItems ] = useState([]);
    const [ dataModal, setDatamodal ] = useState({});
    const [ modalDelete, setModalDelete ] = useState(false);
    const [ modalAdd, setModalAdd ] = useState(false);
    const [ modalDetail, setModalDetail ] = useState(false)
    const [ modalAddClient, setModalAddClient ] = useState(false);
    const [ subTotal, setSubTotal ] = useState(0);
    const [ igvTotal, setIgvTotal ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0)

    const nombreEl = useRef(null);
    const rucDniEl = useRef(null);
    const correoEl = useRef(null);
    const direccionEl = useRef(null);
    const selectClientEl = useRef(null);

    const selectProductsEl = useRef(null);
    const cantItemAggEl = useRef(null);

    const nombreClientEl = useRef(null);
    const rucDniClientEl = useRef(null);
    const correoClientEl = useRef(null);
    const direccionClientEl = useRef(null);

    const deleteFactura =  async (id) => {
       await DeleteFacturaService(id)
       setModalDelete(false)
       getFacturas()
    }

    const getFacturas = async () => {
        dispatch(setLoader(true));
        const data = await GetFacturaService();
        console.log(data);
        setFacturas(data);
        dispatch(setLoader(false))
    }

    const getClients = async () => {
        const data = await GetClientService();
        setClients(data);
    }

    const getProducts = async () => {
        const data = await GetProductService();
        setProducts(data);
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));
        const client = clients.filter((clientItem) => clientItem.idCliente == selectClientEl.current.value)[0];

        const detailsItems = items.map((item) => {
            return {
                codigoProducto: item.codigo,
                nombreProducto: item.nombre,
                cantidad: parseInt(item.cantidad)
            }
        })
        console.log(detailsItems)
        const dataCreate = {
            idCliente: parseInt(selectClientEl.current.value),
            subTotal: subTotal,
            igv: igvTotal,
            total: totalPrice,
            cliente: {
                rucDni: rucDniEl.current.value,
                nombre: nombreEl.current.value,
                direccion: client.direccion,
                correo: correoEl.current.value,
                activo: true
            },
            detalles: detailsItems
        }
        const res = await CreateFacturaService(dataCreate);
        console.log(res);
        setModalAdd(false);
        getFacturas();
        dispatch(setLoader(false));
    }

    const handleDelete = (data) => {
        setDatamodal(data);
        setModalDelete(true)
    }

    const handleChangeClient = () => {
        const client = clients.filter((clientItem) => clientItem.idCliente == selectClientEl.current.value)[0];
        console.log('cliente', client)
        nombreEl.current.value = client.nombre;
        rucDniEl.current.value = client.rucDni;
        correoEl.current.value = client.correo;
        direccionEl.current.value = client.direccion;
    }

    const handleAddItems = () => {
        const product = products.filter((productItem) => productItem.idProducto == selectProductsEl.current.value)[0];
        const cantItems = cantItemAggEl.current.value;
        if(!cantItems || cantItems < 1){
            alert('Debe seleccionar una cantidad igual o mayor a 1');
        }else{
            product['cantidad'] = cantItems;
            setItems([...items, product]);
            setSubTotal(subTotal + ((product.precio*cantItems))-(product.precio*cantItems*IGV));
            setIgvTotal(igvTotal + (product.precio*cantItems*IGV));
            setTotalPrice(totalPrice + (product.precio*cantItems))
            console.log(items)
        }
    }

    const handleDeleteItem = (itemDelete) => {
        const newItemsArray = items.filter((item) => item.idProducto != itemDelete.idProducto);
        setSubTotal(subTotal - Math.abs((itemDelete.precio*itemDelete.cantidad)-(itemDelete.precio*itemDelete.cantidad*IGV)));
        setIgvTotal(igvTotal - Math.abs((itemDelete.precio*itemDelete.cantidad*IGV)));
        setTotalPrice(totalPrice - Math.abs((itemDelete.precio*itemDelete.cantidad)));
        setItems(newItemsArray);
    }

    const handleCreateClient = () => {
        setModalAdd(false);
        setModalAddClient(true)

    }

    const handleCreateNewClientService = async (e) => {
        e.preventDefault()
        dispatch(setLoader(true));
        const dataCreate = {
            rucDni: rucDniClientEl.current.value,
            nombre: nombreClientEl.current.value,
            direccion: direccionClientEl.current.value,
            correo: correoClientEl.current.value,
            activo: true
        }
        const res = await CreateClientService(dataCreate);
        console.log(res);
        setModalAddClient(false);
        getClients();
        setModalAdd(true);
        dispatch(setLoader(false));
    }

    const handleModalDetail = (item) => {
        setDatamodal(item);
        setModalDetail(true);
    }

    useEffect(() => {
        getFacturas();
        getClients();
        getProducts();
    }, [])
  return (
    <>
    <div className='pt-4'>
        <div className='bg-white rounded-3xl shadow-sm p-12'>
            <div className='flex'>
                <div onClick={() => setModalAdd(true)}>
                    <Button>Emitir Factura</Button>
                </div>
            </div>
            <Table>
                <thead className='border-b'>
                    <tr>
                        <th className='py-4 text-left'>Número de Factura</th>
                        <th className='py-4 text-left'>Código Cliente</th>
                        <th className='py-4 text-left'>Monto Total</th>
                        <th className='py-4 text-left'>Actions</th>
                        
                    </tr>
                </thead>
                <tbody className='[&:not(:last-child)]:border'>
                    {facturas.map((item, index) => {
                    return (
                    <tr key={index} className='border-b '>
                        <td  className='py-4'>{item.idFactura}</td>
                        <td  className='py-4'>{item.cliente.idCliente}</td>
                        <td className='py-4'>{item.total}</td>
                        <td className='py-4 flex gap-4'>
                            <button onClick={() => handleModalDetail(item)}>
                                <Detail width={32} height={32}/>
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
                ¿Estás seguro que quieres eliminar la factura?
            </h1>
            <p className="text-2xl text-center py-4">{dataModal.idFactura}</p>
            <div className="flex justify-center gap-4 pt-6">
                <div onClick={() => deleteFactura(dataModal.idFactura)}>
                    <Button variant="danger" typeButton='button'>Eliminar</Button>
                </div>
                <div onClick={() => setModalDelete(false)}>
                    <Button variant="secondary" typeButton='button'>Cancelar</Button>
                </div>
            </div>
        </Modal>
    )}

    {modalAdd && (
        <Modal>
            <h1 className="text-2xl">
                Emitir Factura
            </h1>
            <div className="flex justify-center flex-col gap-6 pt-6">
                <form className='flex flex-col gap-4' method='POST' onSubmit={(e) => handleCreate(e)}>
                    <div>
                        <p className='text-xl pb-2'>Información de cliente</p>
                        <div className='grid grid-cols-4 gap-4' onClick={() => handleCreateClient()}>
                            <Button>Crear nuevo cliente</Button>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <Select refEl={selectClientEl} name="cliente" placeholder="Nombre" label="Seleccionar Cliente" typeInput="text" change={() => handleChangeClient()}>
                                <option value="">Seleccione</option>
                                {clients?.map((client, index) => {
                                    return (
                                        <option value={client.idCliente} key={index}>{client.nombre}</option>
                                    )
                                })}
                            </Select>
                            <Input refEl={nombreEl} name="nombre" placeholder="Razón Social" label="Razón Social" typeInput="text" disabled/>
                            <Input refEl={rucDniEl} name="rucDni" placeholder="RUC / DNI" label="RUC / DNI" typeInput="number" disabled/>
                            <Input refEl={correoEl} name="correo" placeholder="Correo" label="Correo" typeInput="email" disabled/>
                            <Input refEl={direccionEl} name="direccion" placeholder="" label="" typeInput="hidden"/>

                        </div>

                    </div>

                    <div>
                        <p className='text-xl pb-2'>Agergar productos</p>
                        <div className='grid grid-cols-3 gap-4'>
                            <Select required={false} refEl={selectProductsEl} name="cliente" placeholder="Nombre" label="Seleccionar Cliente" typeInput="text" >
                                <option value="">Seleccione</option>
                                {products?.map((product, index) => {
                                    return (
                                        <option value={product.idProducto} key={index}>{product.nombre}</option>
                                    )
                                })}
                            </Select>
                            <Input required={false} refEl={cantItemAggEl} name="cantidad" placeholder="Cantidad" label="Cantidad" typeInput="number" minValue={1}/>
                            <div className='mt-6' onClick={() => handleAddItems()}>
                                <Button variant="secondary" typeButton='button'>Agregar</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                    <p className='text-xl'>
                        Productos agregados
                    </p>
                </div>
                <Table>
                <thead className='border-b'>
                    <tr>
                        <th className='py-4 text-left'>Código</th>
                        <th className='py-4 text-left'>Nombre del producto</th>
                        <th className='py-4 text-left'>Precio</th>
                        <th className='py-4 text-left'>Cantidad</th>
                        <th className='py-4 text-left'>Actions</th>
                        
                    </tr>
                </thead>
                <tbody className='[&:not(:last-child)]:border'>
                    {items.map((item, index) => {
                    return (
                    <tr key={index} className='border-b '>
                        <td  className='py-4'>{item.idProducto}</td>
                        <td  className='py-4'>{item.nombre}</td>
                        <td className='py-4'>{item.precio}</td>
                        <td className='py-4'>{item.cantidad}</td>
                        <td className='py-4 flex gap-4'>
                            <button type='button' onClick={() => handleDeleteItem(item)}>
                                <Delete width={32} height={32}/>
                            </button>
                        </td>
                    </tr>
                    )
                    })}
                </tbody>
                </Table>
                <div className='grid grid-cols-3'>
                    <p>SubTotal: {subTotal}</p>
                    <p>IGV: {igvTotal}</p>
                    <p>Total: {totalPrice}</p>
                </div>
                <div className='flex gap-4 justify-center'>
                    <div className='w-[200px]'>
                        <Button variant="primary" typeButton='submit'>Guardar</Button>
                    </div>
                    <div className='w-[200px]' onClick={() => setModalAdd(false)}>
                        <Button variant="danger" typeButton='button'>Cancelar</Button>
                    </div>
                </div>
                </form>
            </div>
        </Modal>
    )}
    {modalAddClient && (
        <Modal>
            <h1 className="text-2xl">
                Crear Cliente
            </h1>
            <div className="flex justify-center flex-col gap-6 pt-6">
                <form className='flex flex-col gap-4' method='POST' onSubmit={(e) => handleCreateNewClientService(e)}>
                    <Input refEl={nombreClientEl} name="nombre" placeholder="Nombre" label="Nombre de Cliente" typeInput="text"/>
                    <Input refEl={rucDniClientEl} name="rucDni" placeholder="RUC / DNI" label="RUC / DNI" typeInput="number"/>
                    <Input refEl={direccionClientEl} name="direccion" placeholder="Dirección" label="Dirección" typeInput="text"/>
                    <Input refEl={correoClientEl} name="correo" placeholder="Correo" label="Correo" typeInput="email"/>

                <div>
                    <Button variant="primary" typeButton='submit'>Guardar</Button>
                </div>
                </form>
                <div onClick={() => {
                    setModalAddClient(false);
                    setModalAdd(true);
                    }}>
                    <Button variant="secondary" typeButton='button'>Cancelar</Button>
                </div>
            </div>
        </Modal>
    )}

    {modalDetail && (
        <Modal>
            <div>
                <img src={Logo} alt="logo" className='bg-primary w-[200px] p-4 rounded-3xl'/>
            </div>
            <div className='py-4 flex justify-between gap-12'>
                <p>Número de Factura: {dataModal.idFactura}</p>
                <p>Código de Cliente: {dataModal.cliente.idCliente}</p>
            </div>
            <div className='pb-4'>
                <p>Ruc / DNI Cliente: {dataModal.cliente.rucDni}</p>
                <p>Razón Social: {dataModal.cliente.nombre}</p>
                <p>Correo: {dataModal.cliente.correo}</p>
            </div>
            <div>
                <Table>
                <thead className='border-b'>
                    <tr>
                        <th className='py-4 px-8 text-left'>Id Item</th>
                        <th className='py-4 px-8 text-left'>Código Producto</th>
                        <th className='py-4 px-8 text-left'>Nombre Producto</th>
                        <th className='py-4 px-8 text-left'>Precio</th>
                        <th className='py-4 px-8 text-left'>Cantidad</th>
                        <th className='py-4 px-8 text-left'>Subtotal</th>
                        
                    </tr>
                </thead>
                <tbody className='[&:not(:last-child)]:border'>
                    {dataModal.detalles.map((item, index) => {
                    const productPrice = products.filter((producto) => item.codigoProducto == producto.codigo)[0]
                    console.log('adsa',productPrice)
                    return (
                    <tr key={index} className='border-b '>
                        <td  className='py-4'>{item.idDetalle}</td>
                        <td  className='py-4'>{item.codigoProducto}</td>
                        <td  className='py-4'>{item.nombreProducto}</td>
                        <td className='py-4'>{productPrice.precio}</td>
                        <td className='py-4'>{item.cantidad}</td>
                        <td className='py-4'>{item.cantidad*productPrice.precio}</td>
                    </tr>
                    )
                    })}
                </tbody>
                </Table>
                <div className='flex justify-end gap-6 pt-6'>
                    <p>SubTotal: {dataModal.subTotal}</p>
                    <p>IGV: {dataModal.igv}</p>
                    <p>Total: {dataModal.total}</p>
                </div>
            </div>
            <div className='pt-6 w-[200px] mr-0' onClick={() => setModalDetail(false)}>
                <Button typeButton='button' variant='danger'>
                    Cerrar
                </Button>
            </div>
        </Modal>
    )}
    </>
  )
}

export default ListFacturas;