type OrderCommon = {
    name: string,
    description: string,
    price: string,
    currency: string
}

export type Order = {
    id: number,
} & OrderCommon

export type DispatchOrder = {
    type: 'ADD_ORDER' | 'REMOVE_ORDER' | 'UPDATE_ORDER'
    id?: number,
} & OrderCommon

export interface FadeProps {
    children?: React.ReactElement
    in: boolean
    onEnter?: () => {}
    onExited?: () => {}
}
  
export type CreateOrderProps = {
    open: boolean,
    handleCloseModal: () => void
    dispatchOrders: (arg0: DispatchOrder ) => void
    currencySymbolsData: string[]
    updatedOrder?: Order | null
}

export type IsValidFormProps = {
    name: string,
    description: string,
    price: string,
    currency: string
}

export type ShowMoreReducerAction = {
    type: 'SHOW_MORE'
    data: boolean
}