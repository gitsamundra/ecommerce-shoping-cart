import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import useStyles from './styles'

const Cart = ({cart, handleRemoveFromCart, handleUpdateQty, handleEmptyCart}) => {
    const classes = useStyles()
    const EmptyCart = () => {
        return <Typography variant='subtitle2'>You have no item in your shopping cart.
        <Link to='/' className={classes.link}> start to add some! </Link></Typography>
    }

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} 
                                onRemoveFromCart={handleRemoveFromCart}
                                onUpdateQty={handleUpdateQty}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button variant='contained' color='secondary' size='large' type='button' className={classes.emptyButton} onClick={() => handleEmptyCart(cart.id)}>Empty Cart</Button>
                        <Button variant='contained' color='primary' size='large' type='button' className={classes.checkoutButton} component={Link} to='/checkout'>Checkout</Button>
                    </div>
                </div>
            </>
        )
    }

    if(!cart.line_items) return "Loading ..."

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant='h3' gutterBottom>Your shopping cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart/>}
        </Container>
    )
}

export default Cart
