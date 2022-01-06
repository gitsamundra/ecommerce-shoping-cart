import React from 'react'
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
import logo from '../../assets/shopping-cart.png'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({totalItems}) => {
    const location = useLocation();
    const classes = useStyles()
    return (
        <>
            <AppBar position='fixed' color='inherit' className={classes.appBar}>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} width='25px' alt="E-Commerce" className={classes.image} />
                        Shopping Cart
                    </Typography>
                    <div className={classes.grow}></div>
                    {location.pathname === '/' && (
                        <div className={classes.menuButton}>
                            <IconButton component={Link} to='/cart' color='inherit' aria-label='Show cart items'>
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
