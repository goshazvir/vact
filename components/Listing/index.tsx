import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import RestoreIcon from '@mui/icons-material/Restore'
import {
    DEFAULT_LOCALE,
    DEFAULT_CURRENCY,
    REMOVE_ORDER
} from '../../variables/constants'
import { CONTENT } from '../../variables/data'
import { Order, DispatchOrder } from '../../types'
import CreateOrder from '../../components/CreateOrder'

type OrderProps = {
    orders: Order[]
    dispatchOrders: (arg0: DispatchOrder) => void
    currencySymbolsData: string[]
}

type StyledTableRowProps = {
    disabled: boolean
}

const DEFAULT_SHOW_ORDERS = 5
const MS_BEFORE_ORDER_DELETE = 1500


const StyledTableRow = styled(TableRow)<StyledTableRowProps>`
    ${({ disabled }) => disabled && `
        background-color: #eee;
        user-select: none;
    `}
`

const Listing: React.FC<OrderProps> = ({ orders, dispatchOrders, currencySymbolsData }) => {
    const [isLimitedOrders, setIsLimitedOrders] = useState<boolean>(orders.length > DEFAULT_SHOW_ORDERS)
    const [showBtn, setShowBtn] = useState<boolean>(true)
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
        setShowBtn(false)
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

    return (
        <>
            <TableContainer component={Paper} sx={{mt: 8}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_ID}</TableCell>
                            <TableCell>{CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_NAME}</TableCell>
                            <TableCell align="right">{CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_DESCRIPTION}</TableCell>
                            <TableCell align="right">{CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_PRICE}</TableCell>
                            <TableCell align="right">{CONTENT[DEFAULT_LOCALE].TRADE_CURRENCY}</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {limitedOrders.map((item) => (
                            <StyledTableRow
                                key={`${item.id}_${item.name}_${item.price}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                disabled={disabledTable}
                            >
                                <TableCell component="th" scope="row">{item.id}</TableCell>
                                <TableCell align="left">{item.name}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">{DEFAULT_CURRENCY}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label="update"
                                        disabled={disabledTable}
                                        onClick={() => handleUpdate(item)}
                                    >
                                        <RefreshIcon />
                                    </IconButton>
                                    {disabledOrderIndex !== item.id && (
                                        <IconButton
                                            aria-label="delete"
                                            disabled={disabledTable}
                                            onClick={() => handleDelete(item)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                    {disabledOrderIndex === item.id && (
                                        <IconButton
                                            aria-label="restore"
                                            disabled={!disabledTable}
                                            onClick={() => handleRetrieve()}
                                        >
                                            <RestoreIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {orders.length > DEFAULT_SHOW_ORDERS && showBtn && (
                <Button
                    variant="outlined"
                    sx={{margin: '24px auto 0', display: 'block'}}
                    onClick={handleClick}
                >
                    {CONTENT[DEFAULT_LOCALE].TRADE_TABLE_SHOW_MORE}
                </Button>
            )}
            {isModalOpened &&
                <CreateOrder
                    open={isModalOpened}
                    handleCloseModal={handleCloseModal}
                    dispatchOrders={dispatchOrders}
                    updatedOrder={updatedOrder}
                    currencySymbolsData={currencySymbolsData}
                />
            }
        </>
    )
}

export default Listing