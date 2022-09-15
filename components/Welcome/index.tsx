import React from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import { useGoogleLogin } from '@react-oauth/google'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button, { ButtonProps } from '@mui/material/Button'
import { PAGES, DEFAULT_LOCALE } from '../../variables/constants'
import { CONTENT } from '../../variables/data'

const StyledBox = styled(Box)<BoxProps>(() => ({
    background: 'linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%)',
    height: '100vh'
}))

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: theme.spacing(1, 4),
    fontSize: 24,
    color: '#fff',
    background: 'linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)'
}))

const StyledRightDiv = styled('div')(() => ({
    background: 'rgb(74,234,220)',
    height: '140px',
    width: '20px',
    position: 'absolute',
    bottom:'80px',
    right: '80px',
    '&::after': {
        content: '""',
        height: '20px',
        width: '140px',
        background: 'rgb(74,234,220)',
        position: 'absolute',
        left: '-120px',
        top: '120px',
      }
}))

const StyledLeftDiv = styled('div')(() => ({
    background: 'rgb(254,248,76)',
    height: '140px',
    width: '20px',
    position: 'absolute',
    top:'80px',
    left: '80px',
    '&::after': {
        content: '""',
        height: '20px',
        width: '140px',
        background: 'rgb(254,248,76)',
        position: 'absolute',
      }
}))

const Welcome: React.FC = () => {
    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            router.push(tokenResponse?.access_token ? PAGES.TRADE : PAGES.LOGIN_ERROR)
        },
        onError: () => router.push(PAGES.LOGIN_ERROR),
    })

    return (
        <StyledBox>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100vh"
            >
                <Typography variant="h2" mb={4} color='#fff'>
                    {CONTENT[DEFAULT_LOCALE].WELCOME_TITLE}
                </Typography>
                <Stack spacing={2} direction="row" alignItems="center">
                    <ColorButton onClick={() => login()} size="large">
                        {CONTENT[DEFAULT_LOCALE].WELCOME_BTN}
                    </ColorButton>
                </Stack>
                <StyledRightDiv />
                <StyledLeftDiv />
            </Grid>
        </StyledBox>
    )
};

export default Welcome;
