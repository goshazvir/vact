import React, { useState, useReducer } from 'react'
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Button, { ButtonProps } from '@mui/material/Button'
import Container from '@mui/material/Container'
import {
    DEFAULT_LOCALE,
    ADD_ORDER,
    REMOVE_ORDER,
    UPDATE_ORDER
} from '../../variables/constants'
import { CONTENT, PAGE_TITLE } from '../../variables/data'
import CreateOrder from '../../components/CreateOrder'
import Listing from '../../components/Listing'
import { Order } from '../../types'
import fixerRequest from '../api/fixer'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: theme.spacing(1, 2),
    fontSize: 18,
    color: '#fff',
    background: 'linear-gradient(135deg,rgb(79 210 156) 0%,rgb(2 175 110) 100%)'
}))

const TradePage: NextPage<any> = ({ currencySymbolsData }) => {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const handleOpenModal = () => setIsModalOpened(true)
    const handleCloseModal = () => setIsModalOpened(false)

    const [orders, dispatchOrders] = useReducer((state: Order[], action: any) => {
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
    }, [])

    return (
        <>
            <Head>
                <title>{PAGE_TITLE[DEFAULT_LOCALE].TRADE}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxWidth="lg">
                <Stack direction="row" justifyContent='flex-end'  mt={4}>
                    <ColorButton onClick={handleOpenModal}>
                        {CONTENT[DEFAULT_LOCALE].TRADE_BTN_CREATE_ORDER}
                    </ColorButton>
                </Stack>
                <Listing
                    orders={orders}
                    dispatchOrders={dispatchOrders}
                    currencySymbolsData={currencySymbolsData}
                />
                {isModalOpened &&
                    <CreateOrder
                        open={isModalOpened}
                        handleCloseModal={handleCloseModal}
                        dispatchOrders={dispatchOrders}
                        currencySymbolsData={currencySymbolsData}
                    />
                }
            </Container>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fixerRequest().getCurrencySymbols()
    const currencySymbolsData: string[] = response && Object.keys(response)

    return {
        props: {
            currencySymbolsData,
        },
    }
}

export default TradePage