export interface JwResponse {
    dataTicket:{ 
        id: number,
        title: string,
        description: string, 
        applicant: string, 
        applicantId: string, 
        responsable: string, 
        status: number, 
        created: string, 
        response: string 
        //created: string, // probar con fomato datetime 
    } 
}
  