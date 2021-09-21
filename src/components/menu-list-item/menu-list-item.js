import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart, items }) => {
    const { title, price, url, category, } = menuItem;
    const [count, setCount] = useState(0);

    const addTotalCost = () => {
        setCount(() => count + 1)
    }

    const removeTotalCost = () => {
        setCount(() => count > 0 ? count - 1 : 0)
    }

    if (count > 1 && items.length <= 0) {
        setCount(() => count === 0)
    }

    return (
        <>
            <li className="menu__item" key={menuItem.id}>
                <Link to={`/${menuItem.id}`} className='menu__link'>
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category:<span> {category}</span>
                    </div>
                    <div>
                        <span className="menu__price">Price pcs: <span>{price}$ </span></span>
                        {
                            count > 0 ? <span className="menu__price">Total: <span>{count * price}$</span></span> : ''
                        }
                    </div>

                </Link>
                <div>
                    <button onClick={() => {
                        onAddToCart()
                        addTotalCost()
                    }} className="menu__btn">Add to cart</button>
                    {
                        count > 0 ? <button onClick={() => { removeTotalCost() }} className="menu__btn--remove">Remove</button> : ''
                    }
                </div>
            </li>
        </>
    )
}


export default MenuListItem;
