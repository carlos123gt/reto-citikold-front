import { BASE_URL_API, PATH_FACTURA } from "../utils/constants";

const GetFacturaService = async () => {
    const response = await fetch(`${BASE_URL_API}${PATH_FACTURA}`);
    const result = await response.json();
    return result
}

const DeleteFacturaService = async (id) => {
    const response = await fetch(`${BASE_URL_API}${PATH_FACTURA}/${id}`, {
        method: 'DELETE',
      })
    const result = await response;
    return result
}

const CreateFacturaService = async (body) => {
    console.log('body', body)
    const response = await fetch(`${BASE_URL_API}${PATH_FACTURA}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    const result = await response;
    return result
}

const GetFacturaByIdService = async (id) => {
    const response = await fetch(`${BASE_URL_API}${PATH_FACTURA}/${id}`);
    const result = await response.json();
    return result
}

const GetFacturaByClientService = async (idCliente) => {
    const response = await fetch(`${BASE_URL_API}${PATH_FACTURA}/${idCliente}`);
    const result = await response.json();
    return result
}

export {GetFacturaService, DeleteFacturaService, CreateFacturaService, GetFacturaByIdService, GetFacturaByClientService};