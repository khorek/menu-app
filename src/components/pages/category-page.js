import React, { Component } from "react";
import { connect } from "react-redux";
import WithRestoService from '../hoc/';
import { menuLoaded, menuRequested, menuError, addedToCart, deleteFromCart } from '../../actions';
import { Link } from 'react-router-dom';
import Spinner from '../spinner';

class CategoryPage extends Component {
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
            return <Spinner />

        }

        const categoryItems = this.props.menuItems.filter((element) => {
            return element.category === this.props.match.params.category
        })

        const items = categoryItems.map((el) => {
            const { title, price, url, category, id } = el;
            return (
                <div className="item_page" key={id} >
                    <div className="menu__item item_block category-page__item">
                        <Link to={`${category}/${id}`} className='menu__link'>
                            <div className="menu__title">{title}</div>
                            <img className="menu__img" src={url} alt={title}></img>
                        </Link>

                        <div className="menu__category">Category: <span>{category}</span></div>
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
                    </div>
                </div>
            )
        })

        return (
            <div className='category-page'>
                {items}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        items: state.items,
        loading: state.loading
    }
}

const mapDispathToProps = {
    menuLoaded: menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispathToProps)(CategoryPage));