const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            }

        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true
            }
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            }
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            // Если товар был в корзине
            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0) {
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty,
                    totalPricePerUnit: itemInState.qtty * itemInState.price
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }
            // Если товара не было в корзине
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1,
                totalPricePerUnit: (item.qtty >= 1 ? item.qtty : 1) * item.price
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            }
        case 'ITEM_REMOVE_FROM_CART':
            // Штучное удаление товара из корзины
            const id2 = action.payload;
            const itemInd2 = state.items.findIndex(item => item.id === id2);
            if (itemInd2 >= 0) {
                const itemInState2 = state.items.find(item => item.id === id2);
                const newItem2 = {
                    ...itemInState2,
                    qtty: --itemInState2.qtty,
                    totalPricePerUnit: itemInState2.qtty * itemInState2.price
                }
                if (newItem2.qtty <= 0) {
                    return {
                        ...state,
                        items: [
                            ...state.items.slice(0, itemInd2),
                            ...state.items.slice(itemInd2 + 1)
                        ],
                        totalPrice: state.totalPrice - newItem2.price
                    }
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd2),
                        newItem2,
                        ...state.items.slice(itemInd2 + 1)
                    ],
                    totalPrice: state.totalPrice - newItem2.price
                }
            }
        // eslint-disable-next-line no-fallthrough
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                totalPrice: 0
            }
        default:
            return state;
    }
}

export default reducer;