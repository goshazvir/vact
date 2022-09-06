type ContentType = {
    [key: string]: {
        [key: string]: string
    };
}

export const PAGE_TITLE: ContentType = {
    en: {
        HOME_PAGE: 'Vakt test task',
        LOGIN_ERROR: 'LogIn error page',
        TRADE: 'Trading page',
    }
}

export const CONTENT: ContentType = {
    en: {
        WELCOME_TITLE: 'Welcome to the VAKT trading platform!',
        WELCOME_BTN: 'Log in',
        LOGIN_ERROR_TITLE: 'Something went wrong',
        LOGIN_ERROR_BTN: 'Home page',
        TRADE_BTN_CREATE_ORDER: 'Create order',
        TRADE_BTN_SAVE: 'Save',
        TRADE_BTN_CLEAR: 'Clear',
        TRADE_CURRENCY: 'Currency',
        TRADE_TABLE_ITEM_ID: 'ID',
        TRADE_TABLE_ITEM_NAME: 'Item name',
        TRADE_TABLE_ITEM_DESCRIPTION: 'Description',
        TRADE_TABLE_ITEM_PRICE: 'Price',
        TRADE_TABLE_SHOW_MORE: 'Show more',
    }
}