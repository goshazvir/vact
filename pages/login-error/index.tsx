import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button, { ButtonProps } from '@mui/material/Button'
import { DEFAULT_LOCALE } from '../../variables/constants'
import { CONTENT, PAGE_TITLE } from '../../variables/data'

const StyledBox = styled(Box)<BoxProps>(() => ({
    background: 'linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%)',
    height: '100vh'
}))

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: theme.spacing(1, 4),
    fontSize: 24,
    color: '#fff',
    background: 'linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)'
}))

const StyledRightDiv = styled('div')(() => ({
    background: 'rgb(254,205,165)',
    height: '140px',
    width: '20px',
    position: 'absolute',
    bottom:'80px',
    right: '80px',
    '&::after': {
        content: '""',
        height: '20px',
        width: '140px',
        background: 'rgb(254,205,165)',
        position: 'absolute',
        left: '-120px',
        top: '120px',
      }
}))

const StyledLeftDiv = styled('div')(() => ({
    background: 'rgb(107,0,62)',
    height: '140px',
    width: '20px',
    position: 'absolute',
    top:'80px',
    left: '80px',
    '&::after': {
        content: '""',
        height: '20px',
        width: '140px',
        background: 'rgb(107,0,62)',
        position: 'absolute',
      }
}))

const LogInErrorPage: NextPage = () => {
    return (
        <>
            <Head>
            <title>{PAGE_TITLE[DEFAULT_LOCALE].LOGIN_ERROR}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StyledBox>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    height="100vh"
                >
                    {CONTENT[DEFAULT_LOCALE].LOGIN_ERROR_TITLE && (
                        <Typography variant="h2" mb={4} color='#fff'>
                            {CONTENT[DEFAULT_LOCALE].LOGIN_ERROR_TITLE}
                        </Typography>
                    )}
                    {CONTENT[DEFAULT_LOCALE].LOGIN_ERROR_BTN && (
                        <Link href="/">
                            <ColorButton href='/'>{CONTENT[DEFAULT_LOCALE].LOGIN_ERROR_BTN}</ColorButton>
                        </Link>
                    )}
                    <StyledRightDiv />
                    <StyledLeftDiv />
                </Grid>
            </StyledBox>
        </>
    );
};

export default LogInErrorPage
