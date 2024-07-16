import { API } from "./api.js"

export const SellProduct = async(id_usuario,fecha,total,email,productos,token) =>{

    try {
       
            const res = await fetch(`${API}/sell/newSell/`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_usuario,fecha,total,email,productos,token }) // Enviar cuerpo de la solicitud en formato JSON
            })
            
            const data = await res.json()
            return data
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}