import React from 'react'
import styled from 'styled-components'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DEFAULT_LOCALE } from '../../variables/constants'
import { CONTENT } from '../../variables/data'
import { Order, DispatchOrder } from '../../types'
import CreateOrder from '../../components/CreateOrder'
import useListing from './useListing'
import ShowMore from './ShowMore'
import ListingOrders from './ListingOrders'

type OrderProps = {
    orders: Order[]
    dispatchOrders: (arg0: DispatchOrder) => void
    currencySymbolsData: string[]
    isShowMoreBtnFired: boolean
    dispatchIsShowMoreBtnFired: any
}

type StyledTableRowProps = {
    disabled: boolean
}

const StyledTableRow = styled(TableRow)<StyledTableRowProps>`
    ${({ disabled }) => disabled && `
        background-color: #eee;
        user-select: none;
    `}
`

const Listing: React.FC<OrderProps> = ({
    orders,
    dispatchOrders,
    currencySymbolsData,
    isShowMoreBtnFired,
    dispatchIsShowMoreBtnFired,
}) => {
    const {
        handleClick,
        handleUpdate,
        handleCloseModal,
        isModalOpened,
        updatedOrder,
        limitedOrders
    } = useListing(orders, dispatchOrders, dispatchIsShowMoreBtnFired)

    const listingOrdersProps = {dispatchOrders, handleUpdate, dispatchIsShowMoreBtnFired}
    const showMoreProps  = {orders, isShowMoreBtnFired, handleClick}

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
                        {limitedOrders && <ListingOrders {...listingOrdersProps} orders={limitedOrders} />}
                    </TableBody>
                </Table>
            </TableContainer>
            <ShowMore {...showMoreProps} />
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