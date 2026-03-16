import axios from 'axios'
const baseUrl = '/api/notes'

export const getAll = () => {
    // const nonExisting = {
    //     id: 100000,
    //     content: 'This note is not saved to server',
    //     important: true,
    // }
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
}
export const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response=>response.data)
}

export const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response=>response.data)
}
