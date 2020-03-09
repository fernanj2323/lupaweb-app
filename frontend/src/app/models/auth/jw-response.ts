export interface JwResponse {
    dataUser:{ 
        id: number,
        name: string, 
        email: string, 
        accessToken: string, 
        expiresIn: string, 
        //created: string, // probar con fomato datetime 
    }
}
