import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './app-header.scss';
import { clearCart } from '../../actions';

const AppHeader = ({ total, clearCart }) => {
    return (
        <header className="header">
            <Link to={'/'} className="header__link">
                <button type="button" class="btn btn-info">Menu</button>
            </Link>
            <button className="menu__btn" onClick={() => clearCart()}>Clear cart</button>
            <Link to='/cart' className="header__link" href="#">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {total} $
            </Link>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        total: state.totalPrice
    }
}

const mapDispatchToProps = {
    clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);