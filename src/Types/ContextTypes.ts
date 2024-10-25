export type ModalTypeData = 
{id: number, name: string,type: string, category: string, amount: number,date:string} 
  | number |undefined 

export interface ModalStates{
    isDelete: boolean,
    isAdd: boolean,
    isEdit: boolean,
    isLogout: boolean,
}

export interface ContextType {
    ModalStates:ModalStates,
    selectedData : ModalTypeData,
    handelOpenModal:(typeOfModal:string, data? : ModalTypeData  )=>void,
    handelCloseModal:(typeOfModal:string, data? : ModalTypeData)=>void,
    isDarkMode:boolean,
    handelDarkMode:()=>void,
    isOpenMenu:boolean,
    handelOpenMenu:()=>void,
    handelCloseMenu:()=>void,
  }