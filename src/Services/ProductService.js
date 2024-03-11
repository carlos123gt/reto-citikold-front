import { BASE_URL_API, PATH_PRODUCT } from "../utils/constants";

const GetProductService = async () => {
    const response = await fetch(`${BASE_URL_API}${PATH_PRODUCT}`);
    const result = await response.json();
    return result
}

const DeleteProducttService = async (nombre) => {
    const response = await fetch(`${BASE_URL_API}${PATH_PRODUCT}/${nombre}`, {
        method: 'DELETE',
      })
    const result = await response;
    return result
}

const CreateProductService = async (body) => {
    const response = await fetch(`${BASE_URL_API}${PATH_PRODUCT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    const result = await response;
    return result
}

const UpdateProductService = async (body, id) => {
    const response = await fetch(`${BASE_URL_API}${PATH_PRODUCT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    const result = await response;
    return result
}

export {GetProductService, DeleteProducttService, CreateProductService, UpdateProductService};