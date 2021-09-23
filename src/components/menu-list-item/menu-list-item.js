import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart, items, onRemoveFromCart }) => {
    const { title, price, url, category, } = menuItem;
    const [count, setCount] = useState(0);

    const addTotalLocalCost = () => {
        setCount(() => count + 1)
    }

    const removeTotalLocalCost = () => {
        setCount(() => count > 0 ? count - 1 : 0)
    }

    if (count > 1 && items.length <= 0) {
        setCount(() => count === 0)
    }

    return (
        <>
            <li className="menu__item" key={menuItem.id}>
                <Link to={`${category}/${menuItem.id}`} className='menu__link'>
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div>
                        <span className="menu__price">Price pcs: <span>{price}$ </span></span>
                        {
                            count > 0 ? <span className="menu__price">Total: <span>{count * price}$</span></span> : null
                        }
                    </div>
                </Link>
                <Link to={`/${category}`} className='menu__link'>
                    <div className="menu__category">Category: <span> {category}</span></div>
                </Link>


                <div className="paymentWrap">
                    <div className="btn-group paymentBtnGroup btn-group-justified" data-toggle="buttons">
                        <label className="btn paymentMethod active">
                            <div className="method visa"></div>
                            <input type="radio" name="options" defaultChecked />
                        </label>
                        <label className="btn paymentMethod">
                            <div className="method master-card"></div>
                            <input type="radio" name="options" />
                        </label>
                        <label className="btn paymentMethod">
                            <div className="method amex"></div>
                            <input type="radio" name="options" />
                        </label>
                        <label className="btn paymentMethod">
                            <div className="method vishwa"></div>
                            <input type="radio" name="options" />
                        </label>
                    </div>
                </div>


                <div>
                    <button onClick={() => {
                        addTotalLocalCost()
                        onAddToCart()
                    }} className="menu__btn">Add to cart</button>
                    {
                        count > 0 ? <button onClick={() => {
                            removeTotalLocalCost()
                            onRemoveFromCart()
                        }} className="menu__btn--remove">Remove</button> : ''
                    }
                </div>
            </li>
        </>
    )
}


export default MenuListItem;