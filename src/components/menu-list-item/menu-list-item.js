import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart, items, }) => {
    const { title, price, url, category, } = menuItem;
    const [count, setCount] = useState(0);

    const addTotalCost = () => {
        setCount(() => count + 1)
    }

    const removeTotalCost = () => {
        setCount(() => count > 0 ? count - 1 : 0)
    }

    return (
        <>
            <li className="menu__item">
                <Link to={`/${menuItem.id}`}>
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category:<span> {category}</span>
                    </div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    {
                        count > 0 ? <div className="menu__price">Total cost per one: <span>{count * price}$</span></div> : ''
                    }
                </Link>
                <button onClick={() => {
                    onAddToCart()
                    addTotalCost()
                }} className="menu__btn">Add to cart</button>

                {
                    count > 0 ? <button onClick={() => { removeTotalCost() }} className="menu__btn--remove">Remove</button> : ''
                }

            </li>
        </>
    )
}


export default MenuListItem;
