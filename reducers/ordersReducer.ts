import { 
    ADD_ORDER,
    REMOVE_ORDER,
    UPDATE_ORDER
} from '../variables/constants'
import { Order } from '../types'

export const ordersReducer = (state: Order[], action: any) => {
    switch (action.type) {
        case ADD_ORDER:
            const maxId = Math.max(...state.map(item => item.id))
            const currentMaxId = Math.max(maxId, state.length)

            return [
            ...state,
            {
                id: currentMaxId + 1,
                name: action.name,
                description: action.description,
                price: action.price,
                currency: action.currency,
            }
        ]
        case REMOVE_ORDER:
            return state.filter((order) => order.id != action.id)
        case UPDATE_ORDER:
            const getUpdatedOrderIndex  = state.findIndex(item => item.id === action.id)
            const newState = Object.assign([], state)
            newState.splice(getUpdatedOrderIndex, 1, {
                id: action.id,
                name: action.name,
                description: action.description,
                price: action.price,
                currency: action.currency,
            })

            return newState
        default:
            return state
    }
}
