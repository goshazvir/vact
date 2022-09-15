import React from 'react'
import styled from 'styled-components'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import RestoreIcon from '@mui/icons-material/Restore'
import useListing from '../useListing'
import { Order, DispatchOrder } from '../../../types'
import { DEFAULT_CURRENCY } from '../../../variables/constants'

type ListingOrdersProps = {
    orders: Order[]
    dispatchOrders: (arg0: DispatchOrder) => void
    dispatchIsShowMoreBtnFired: any
    handleUpdate: (order: Order) => void
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

const ListingOrders: React.FC<ListingOrdersProps> = ({
    orders,
    dispatchOrders,
    dispatchIsShowMoreBtnFired,
    handleUpdate,
}) => {
    const {
        handleDelete,
        handleRetrieve,
        disabledTable,
        disabledOrderIndex,
    } = useListing(orders, dispatchOrders, dispatchIsShowMoreBtnFired)

    return (
        <>
            {orders.map((item) => (
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
        </>
    )
}

export default ListingOrders