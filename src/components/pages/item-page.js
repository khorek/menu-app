import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc/';
import Spinner from '../spinner';
import { menuLoaded, menuRequested, menuError, addedToCart, deleteFromCart } from '../../actions';
import './itemPage.css';
import { Link } from 'react-router-dom';

class ItemPage extends Component {
    componentDidMount() {
        if (this.props.menuItems.length === 0) {
            this.props.menuRequested();

            const { RestoService } = this.props;
            RestoService.getMenuItems()
                .then(res => this.props.menuLoaded(res))
                .catch(error => this.props.menuError());
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="item_page">
                    <Spinner />
                </div>
            )
        }
        const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id)
        const { title, url, category, price, id } = item;

        return (
            <div className="item_page">
                <div className="menu__item item_block">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <Link to={`/${category}`} className='menu__link'>
                        <div className="menu__category">Category: <span>{category}</span></div>
                    </Link>

                    <div className="menu__price">Price: <span>{price}$ </span>
                        {
                            this.props.items.map(i => {
                                if (i.totalPricePerUnit > 0 && i.id === id) {
                                    return <b key={i.id}>Total: <span>{i.totalPricePerUnit}$</span> </b>
                                }
                                return null
                            })
                        }
                    </div>
                    <button className="menu__btn" onClick={() => this.props.addedToCart(id)}>Add to cart</button>
                    <button className="menu__btn--remove" onClick={() => this.props.deleteFromCart(id)}>Remove</button>

                    <Link to={`/${category}`} className='menu__link'>
                        <span className={`menu__category_Img ${category}`}></span>
                    </Link>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error,
        items: state.items
    }
}

const mapDispatchToProps = {
    menuLoaded: menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));