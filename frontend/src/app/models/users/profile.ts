export interface Profile {


    id? : string; 
    firstName:string; 
    sex:string; 
    phone:number; 
    identification:number; 
    status:boolean; 
    lastName:string; 
    email:string; 
    authId:string; 
    role:string; 
 
    //locaciones
    country:string; 
    district:string; 
    company:string; 

    //deparatemntos
    department:string;
    //si el departamento es operaciones
    serviceLine: {
        operations: {
            wt:boolean,
            sl:boolean, 
            fi:boolean,
            ct:boolean, 
            wl:boolean, 
        }
    }; 
    job:string;  //cargo 
    //permisologia
    permisology:{
        //permisologias de eservices
        eservices:{
            kom:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            },
            IRO:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            },
            WorkPreparation:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            },
            PrejobIndex:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            }, 
            closing: {
                admin:{type:boolean};
                observe:{type: boolean};
                edit:{type: boolean};
                create: {type: boolean};
                aprobation: {type: boolean};
                },

                lections: {
                    admin:{type:boolean};
                    observe:{type: boolean};
                    edit:{type: boolean};
                    create: {type: boolean};
                    aprobation: {type: boolean};
                    },
                  
        }, 
         //permisologias de Elearning 
        elearning:{
            createCourse:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            }
        },
        //permisologias de Ehseq 
        ehseq:{
            lupaCard:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            }
        },
        //permisologias de ejourney 
        ejourney:{
            basic:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            }

            aprobation:{
                admin:boolean;  //solo para jefe de linea 
                observe:boolean; 
                edit:boolean; 
                create:boolean; 
                aprobation:boolean;
            }
        }
    }
  
}