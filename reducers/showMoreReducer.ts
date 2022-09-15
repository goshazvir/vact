import { SHOW_MORE } from '../variables/constants'
import { ShowMoreReducerAction } from '../types'


export const showMoreReducer = (state: boolean, action: ShowMoreReducerAction) => {
    switch (action.type) {
        case SHOW_MORE:
            return action.data
        default:
            return state
    }
}
