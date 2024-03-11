import { BASE_URL_API, PATH_CLIENT } from "../utils/constants";

const GetClientService = async () => {
    const response = await fetch(`${BASE_URL_API}${PATH_CLIENT}`);
    const result = await response.json();
    return result
}

const DeleteClientService = async (rucDni) => {
    const response = await fetch(`${BASE_URL_API}${PATH_CLIENT}/${rucDni}`, {
        method: 'DELETE',
      })
    const result = await response;
    return result
}

const CreateClientService = async (body) => {
    const response = await fetch(`${BASE_URL_API}${PATH_CLIENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    const result = await response;
    return result
}

const UpdateClientService = async (body, id) => {
    const response = await fetch(`${BASE_URL_API}${PATH_CLIENT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    const result = await response;
    return result
}

export {GetClientService, DeleteClientService, CreateClientService, UpdateClientService};