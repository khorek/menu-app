import React, { Component } from "react";
import { connect } from "react-redux";
import WithRestoService from '../hoc/';
import { menuLoaded, menuRequested, menuError, addedToCart, deleteFromCart } from '../../actions';

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
        const categoryItems = this.props.menuItems.filter((element) => {
            return element.category === this.props.match.params.category
        })
        console.log(this.props.items)

        const items = categoryItems.map((el) => {
            const { title, price, url, category, id } = el;
            return <div className="item_page">
                <div className="menu__item item_block">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category: <span>{category}</span></div>
                    <div className="menu__price">Price: <span>{price}$ </span>

                        {
                            this.props.items.map(i => {
                                if (i.totalPricePerUnit > 0 && i.id === id) {
                                    return <span>Total: {i.totalPricePerUnit}$ </span>
                                }
                            })
                        }

                    </div>
                    <button className="menu__btn" onClick={() => this.props.addedToCart(id)}>Add to cart</button>
                    <button className="menu__btn--remove" onClick={() => this.props.deleteFromCart(id)}>Remove</button>
                    <span className={`menu__category_Img ${category}`}></span>
                </div>
            </div>

        })

        return (
            <div>
                {items}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        items: state.items
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