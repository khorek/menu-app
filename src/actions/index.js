const menuLoaded = (newMenu) => {
    return{
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

const menuRequested = () => {
    return{
        type: 'MENU_REQUESTED',
    }
}

const menuError = () => {
    return{
        type: 'MENU_ERROR',
    }
}

const addedToCart = (id) => {
    return{
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

const deleteFromCart = (id, event = '') => {
    return{
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id,
        event: event
    }
}

const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}


export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart,
    clearCart
}; 