export interface RolConfig {


    _id: string;
    name: string;
    typeRol: string;
    menulink: string;
    relmenu:any; 
    submenu:{
        name: string,
        sblink: string,
        status: string
    }
}