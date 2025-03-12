import { jwtDecode } from "jwt-decode";

/**
 * Decodifica un JWT y devuelve el objeto decodificado o `null` si falla.
 */
export function decodeToken(token: string): { exp?: number } | null {
    try {
        // jwtDecode te devuelve un objeto con "exp", "iat", etc.
        // El tipo exacto depende de tu JWT. Si tienes mas campos, agrégalos en la interfaz.
        return jwtDecode<{ exp: number }>(token);
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
}

/**
 * Verifica si el token ha expirado comparando `exp` con la hora actual.
 */
export function isTokenExpired(token: string): boolean {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
        // Si no hay exp o falló la decodificación, considerarlo inválido
        return true;
    }
    // exp está en segundos, compararlo con la hora actual en milisegundos
    return decoded.exp * 1000 < Date.now();
}
