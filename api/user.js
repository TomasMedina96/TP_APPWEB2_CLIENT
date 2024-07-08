import { API } from "./api.js";

export const validateUser = async (email, password) => {
    try {
        const response = await fetch(`${API}/user/users/validation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, pass: password })
        });
        const result = await response.json();

        if (result == 'Usuario no encontrado') {
            throw new Error(result.message || 'Usuario no encontrado');
        }
        return result;
    } catch (error) {
        console.error('validateUser error:', error);
        throw error;
    }
}

export const newUser = async (datos) => {
    try {
        const response = await fetch(`${API}/user/newuser/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( datos )
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error de autenticación');
        }
        return result;
    } catch (error) {
        console.error('validateUser error:', error);
        throw error;
    }
}