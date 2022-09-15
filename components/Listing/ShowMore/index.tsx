import React from 'react'
import Button from '@mui/material/Button'
import {
    DEFAULT_LOCALE,
    DEFAULT_SHOW_ORDERS
} from '../../../variables/constants'
import { CONTENT } from '../../../variables/data'
import { Order } from '../../../types'

type ShowMoreProps = {
    orders: Order[]
    isShowMoreBtnFired: boolean
    handleClick: any
}

const ShowMore: React.FC<ShowMoreProps> = ({
    orders,
    isShowMoreBtnFired,
    handleClick
}) => {
    return orders.length > DEFAULT_SHOW_ORDERS && !isShowMoreBtnFired ?  (
        <Button
            variant="outlined"
            sx={{margin: '24px auto 0', display: 'block'}}
            onClick={handleClick}
        >
            {CONTENT[DEFAULT_LOCALE].TRADE_TABLE_SHOW_MORE}
        </Button>
    ) : null
}

export default ShowMore