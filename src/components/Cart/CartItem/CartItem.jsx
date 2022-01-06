import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

const CartItem = ({item, onRemoveFromCart, onUpdateQty}) => {
    const classes = useStyles()

    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant='h4'>{item.name}</Typography>
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button  type='button' size='small' onClick={() => onUpdateQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button type='button' variant='contained' color='secondary' onClick={() => onRemoveFromCart(item.id, item.quantity)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
