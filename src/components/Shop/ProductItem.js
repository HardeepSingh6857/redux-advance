import { useDispatch, useSelector } from 'react-redux';

import { cartAction } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { id, title, price, description } = props;

  const AddToCartHandler = () => {
    const newTotalQuantity = cart.totalQuantity + 1;
    //cart.totalQuantity = cart.totalQuantity + 1; never do this outside of a reducer

    const updatedItems = cart.items.slice();  //instead create a copy via slice to avoid mutation of data
    const existingItem = updatedItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedItem = {...existingItem};  //new object + copy existing properties
      updatedItem.quantity++;
      updatedItem.price = updatedItem.price + price;
      const existingItemIndex = updatedItem.findIndex(
        (item) => item.id === id
      );
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }

    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems,
    }

    dispatch(cartAction.replaceCart(newCart));

    //and then send http request
    //  fetch('firebase-url', { method: 'POST',body: JSON.stringify(newCart) })

    //  dispatch(  
    //       cartActions.addItemToCart({
    //         id,
    //         title,
    //         price,
    //    })
    //  };
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
