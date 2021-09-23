import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addedToCart, deleteFromCart, clearCart } from '../../actions'

const CartTable = ({ items, deleteFromCart, total, addedToCart, }) => {
    return (
        <>
            <div className="cart__title">Your order:</div>
            <div className="cart__title">Total: {total}$</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const { title, price, url, id, qtty, totalPricePerUnit } = item;

                        return (
                            <div key={id}>
                                <div className="cart__item" key={id}>
                                    <Link to={`/${id}`}>
                                        <img src={url} className="cart__item-img" alt={title}></img>
                                        <div className="cart__item-title">{title}</div>
                                        <div className="cart__item-price">Price: {price}$</div>
                                        <div className="cart__item-qtty">Qty: {qtty}pcs</div>
                                        <div className="cart__item-total-price">Total: {totalPricePerUnit}$</div>
                                    </Link>
                                    <div className='cart__item-buttons-wrapper'>
                                        <button onClick={() => addedToCart(id)} className="menu__btn">Add + </button>
                                        <button onClick={() => deleteFromCart(id)} className="menu__btn--remove">Remove - </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        total: state.totalPrice
    }
}

const mapDispatchToProps = {
    addedToCart,
    deleteFromCart,
    clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);