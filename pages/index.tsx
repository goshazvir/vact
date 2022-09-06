import type { NextPage } from 'next'
import Head from 'next/head'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { DEFAULT_LOCALE } from '../variables/constants'
import { PAGE_TITLE } from '../variables/data'
import Welcome from '../components/Welcome'


const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>{PAGE_TITLE[DEFAULT_LOCALE].HOME_PAGE}</title>
            </Head>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <Welcome />
            </GoogleOAuthProvider>
           
        </>
    );
};

export default Home