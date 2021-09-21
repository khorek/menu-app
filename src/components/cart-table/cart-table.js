import React, { useState } from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addedToCart, deleteFromCart, clearCart } from '../../actions'

const CartTable = ({ items, deleteFromCart, total, addedToCart, clearCart }) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__title">Итого: {total}$</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const { title, price, url, id, qtty, totalPricePerUnit } = item;

                        return (
                            <div key={id}>
                                <Link to={`/${id}`}>
                                    <div className="cart__item" key={id}>
                                        <img src={url} className="cart__item-img" alt={title}></img>
                                        <div className="cart__item-title">{title}</div>
                                        <div className="cart__item-price">Price: {price}$</div>
                                        <div className="cart__item-qtty">Qty: {qtty}pcs</div>
                                        <div className="cart__item-total-price">Total: {totalPricePerUnit}$</div>
                                    </div>
                                </Link>
                                <button onClick={() => addedToCart(id)} className="menu__btn">Add + </button>
                                <button onClick={() => deleteFromCart(id)} className="menu__btn--remove">Remove - </button>

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