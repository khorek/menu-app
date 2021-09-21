import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import './menu-list.scss';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, addedToCart, } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested();
        const { RestoService } = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(error => this.props.menuError())
    }

    render() {
        const { menuItems, loading, error, addedToCart, items } = this.props;
        if (error) {
            return <Error />
        }
        if (loading) {
            return <Spinner />
        }

        const itemsList = menuItems.map((menuItem) => {
            return (
                    <MenuListItem key={menuItem.id}
                        menuItem={menuItem}
                        items={items}
                        onAddToCart={() => addedToCart(menuItem.id)} />
            )
        })

        return (
            <div className="menuList">{itemsList}</div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error,
        items: state.items
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));