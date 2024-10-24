export type ContextDataType = 
{id: number, transaction_name: string,type: string, category: string, amount: number,date:string} 
  | number |undefined 

  export interface ContextStateType{
    isDelete: boolean,
    isAdd: boolean,
    isEdit: boolean,
    isLogout: boolean,
  }
export interface ContextType {
    ModalStates:ContextStateType,
    selectedData : ContextDataType,
    handelOpenModal:(typeOfModal:string, data? : ContextDataType  )=>void,
    handelCloseModal:(typeOfModal:string, data? : ContextDataType)=>void,
    isDarkMode:boolean,
    handelDarkMode:()=>void,
    isOpenMenu:boolean,
    handelOpenMenu:()=>void,
    handelCloseMenu:()=>void,
  }