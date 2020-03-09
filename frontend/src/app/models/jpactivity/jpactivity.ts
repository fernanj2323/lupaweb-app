export interface Jpactivity {




//-----------PHASE 0---------   

_id: string; 
name: string; 
serviceDetail:string;
client:string;

//cambiamos responsible line
//por un booleano de cada linea, ya que puede existir el caso de varias lineas en una sola orden de servicio
// responsibleLine:string;

wl:boolean; 
sl:boolean;
ct:boolean;
fi:boolean;
wt:boolean;
dateInit:string;
dateEnd:string;

//LOCACIONES
country:string; 
district:string;
camp:string; 
closter:string;

well:string;
well2:string; 
well3:string; 
well4:string; 
well5:string; 

// nuevos criticos  
NewClient:boolean;
NewDistrict:boolean;
NewCamp:boolean; 
NewWell:boolean; 

scopeODT:string;
stimatedRevenue:string; 
RequestInformation:string; 
planningFormat:string; 
history:string; 
technicalRequirements:string;
adminisitrativeRequirements:string;
RRHHRequirements:string;
HSEQRequirements:string;
otherRequirements:string;

risk1:string;
cause1:string;
probability1:string;
impact1:string;
riskLevel1:string;
actions1:string;

risk2:string;
cause2:string;
probability2:string;
impact2:string;
riskLevel2:string;
actions2:string;

risk3:string;
cause3:string;
probability3:string;
impact3:string;
riskLevel3:string;
actions3:string;

risk4:string;
cause4:string;
probability4:string;
impact4:string;
riskLevel4:string;
actions4:string;

risk5:string;
cause5:string;
probability5:string;
impact5:string;
riskLevel5:string;
actions5:string;

milestone1:string;
scheduledDate1:string;
milestone2:string;
scheduledDate2:string;
milestone3:string;
scheduledDate3:string;
milestone4:string;
scheduledDate4:string;
milestone5:string;
scheduledDate5:string;
milestone6:string;
scheduledDate6:string;


exclusions:string; //exlcusiones 
leaderDesignation:string;//lider de ODT

phase:string;  //definidos por sistemas para ver si ya esta diligenciado todo el fomulario 
status:string; //definido por usuarios para variar entre kom y fases controlabeles 
hrisk:string; 
finished:boolean; 
}

