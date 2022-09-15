import React, { useState, useRef } from 'react'
import {
    REMOVE_ORDER,
    SHOW_MORE,
    DEFAULT_SHOW_ORDERS
} from '../../variables/constants'
import { Order, DispatchOrder } from '../../types'

const MS_BEFORE_ORDER_DELETE = 1500

const useListing = (
    orders:  Order[],
    dispatchOrders: (arg0: DispatchOrder) => void,
    dispatchIsShowMoreBtnFired: any,
) => {
    const [isLimitedOrders, setIsLimitedOrders] = useState<boolean>(orders.length > DEFAULT_SHOW_ORDERS)
    const [disabledTable, setDisabledTable] = useState<boolean>(false)
    const [disabledOrderIndex, setDisabledOrderIndex] = useState<number | null>(null)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [updatedOrder,  setUpdaterOrder] = useState<Order | null>(null)
    const handleOpenModal = () => setIsModalOpened(true)
    const handleCloseModal = () => setIsModalOpened(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const limitedOrders = isLimitedOrders ? orders : orders.slice(0, DEFAULT_SHOW_ORDERS)

    const handleClick  = () => {
        setIsLimitedOrders(true)
        dispatchIsShowMoreBtnFired({type: SHOW_MORE, data: true})
    }

    const handleUpdate  = (currentOrder: Order) => {
        setUpdaterOrder(currentOrder)
        handleOpenModal()
    }

    const handleDelete  = (currentOrder: Order) => {
        setDisabledTable(true)
        setDisabledOrderIndex(currentOrder.id)

        const removeOrder = () => {
            dispatchOrders({
                type: REMOVE_ORDER,
                ...currentOrder,
            })
            setDisabledTable(false)
            setDisabledOrderIndex(null)
        }
        timerRef.current = setTimeout(removeOrder, MS_BEFORE_ORDER_DELETE)
    }

    const handleRetrieve  = () => {
        setDisabledTable(false)
        setDisabledOrderIndex(null)

        clearTimeout(timerRef.current as NodeJS.Timeout)
    }

    return {
        handleClick,
        handleUpdate,
        handleDelete,
        handleRetrieve,
        handleOpenModal,
        handleCloseModal,
        disabledTable,
        disabledOrderIndex,
        isModalOpened,
        updatedOrder,
        limitedOrders
    }
}

export default useListing