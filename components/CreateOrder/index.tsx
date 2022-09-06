import React, { useState, useEffect, forwardRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { styled } from '@mui/material/styles'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import {
    DEFAULT_LOCALE,
    DEFAULT_CURRENCY,
    ADD_ORDER,
    UPDATE_ORDER
} from '../../variables/constants'
import { CONTENT } from '../../variables/data'
import { isValidForm } from './validation'
import { FadeProps, CreateOrderProps } from '../../types'
import fixerRequest from '../../pages/api/fixer'

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },

        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    })
  
    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    )
})

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: theme.spacing(1, 2),
    color: '#fff',
    background: 'linear-gradient(135deg,rgb(79 210 156) 0%,rgb(2 175 110) 100%)'
}))

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const CreateOrder: React.FC<CreateOrderProps> = ({
    open,
    updatedOrder,
    handleCloseModal,
    dispatchOrders,
    currencySymbolsData,
}) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [currency, setCurrency] = useState<string>(DEFAULT_CURRENCY)
    const [isNameError, setIsNameError] = useState<boolean>(false)
    const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false)
    const [isPriceError, setIsPriceError] = useState<boolean>(false)

    useEffect(() => {
        if (updatedOrder) {
            setName(updatedOrder?.name)
            setDescription(updatedOrder?.description)
            setPrice(updatedOrder?.price)
            setCurrency(DEFAULT_CURRENCY)
        }
    }, [updatedOrder])

    const handleClickSave = async () => {
        const isValid = isValidForm({name, description, price,  currency})
        const isDefaultCurrency = currency === DEFAULT_CURRENCY

        setIsNameError(Boolean(!name))
        setIsDescriptionError(Boolean(!description))
        setIsPriceError(Boolean(!price))

        async function fetchCurrencyConverted() {
            if (isValid) {
                return await fixerRequest().getCurrencyConvert(currency, price)
            }
        }

        const convertedPrice = isDefaultCurrency ? price : await fetchCurrencyConverted()

        if (convertedPrice && !updatedOrder) {
            dispatchOrders({
                type: ADD_ORDER,
                name,
                description,
                price: String(convertedPrice),
                currency
            })
        }  else if (convertedPrice && updatedOrder) {
            dispatchOrders({
                type: UPDATE_ORDER,
                id: updatedOrder.id,
                name,
                description,
                price: String(convertedPrice),
                currency
            })
            handleCloseModal()
        }
    }

    const handleClickClear = () => {
        setName('')
        setDescription('')
        setPrice('')
        setIsNameError(false)
        setIsDescriptionError(false)
        setIsPriceError(false)
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value as string)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value as string)
    }

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value as string)
    }

    const handleChangeCurrency = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string)
    }

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={boxStyle}>
                    <TextField
                        value={name}
                        helperText=" "
                        label={CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_NAME}
                        fullWidth={true}
                        error={isNameError}
                        onChange={handleChangeName}
                    />
                    <TextField
                        value={description}
                        label={CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_DESCRIPTION}
                        fullWidth={true}
                        multiline
                        rows={4}
                        sx={{marginBottom: '24px'}}
                        error={isDescriptionError}
                        onChange={handleChangeDescription}
                    />
                    <TextField
                        value={price}
                        helperText=" "
                        label={CONTENT[DEFAULT_LOCALE].TRADE_TABLE_ITEM_PRICE}
                        fullWidth={true}
                        type="number"
                        error={isPriceError}
                        onChange={handleChangePrice}
                    />
                    <FormControl fullWidth>
                        <InputLabel>{CONTENT[DEFAULT_LOCALE].TRADE_CURRENCY}</InputLabel>
                        <Select
                            value={currency}
                            label={CONTENT[DEFAULT_LOCALE].TRADE_CURRENCY}
                            onChange={handleChangeCurrency}
                        >
                            {currencySymbolsData.map((currency, index) => <MenuItem key={index} value={currency}>{currency}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Stack direction="row" justifyContent="flex-end" spacing={2} mt='24px'>
                        <ColorButton onClick={handleClickSave}>
                            {CONTENT[DEFAULT_LOCALE].TRADE_BTN_SAVE}
                        </ColorButton>
                        <Button onClick={handleClickClear} variant="outlined">
                            {CONTENT[DEFAULT_LOCALE].TRADE_BTN_CLEAR}
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CreateOrder