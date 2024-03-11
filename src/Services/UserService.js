import { BASE_URL_API, PATH_USER } from "../utils/constants";

const UserService = async (body) => {
    const response = await fetch(`${BASE_URL_API}${PATH_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    const result = await response.json();
    return result
}

export default UserService;