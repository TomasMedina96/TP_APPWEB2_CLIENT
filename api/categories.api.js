import { API } from "./api.js"

export const allCategories = async() =>{

    try {
        const res = await fetch(`${API}/categories/all/`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}