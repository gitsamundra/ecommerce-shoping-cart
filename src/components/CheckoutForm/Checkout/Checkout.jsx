import { Button, CircularProgress, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { commerce } from '../../../lib/Commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'

const steps = ['Shipping Address', 'Payment details']
const Checkout = ({cart, error, onCaptureCheckout, order}) => {
    const history = useNavigate()
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'}) 
                setCheckoutToken(token)
            } catch (error) {
                history.pushState('/')
            }
        }
        generateToken()
    }, [cart.id, history])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 )
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 )

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }
    const Form = () => activeStep === 0 
    ? 
        <AddressForm checkoutToken={checkoutToken} next={next} />
    :
        <PaymentForm 
            shippingData={shippingData} 
            checkoutToken={checkoutToken}
            backStep={backStep}
            onCaptureCheckout={onCaptureCheckout}
            nextStep={nextStep}
            timeout={timeout}
        />

    const Confirmation = () => order.cutomer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchage, {order.cutomer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order Ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchage</Typography>
                <Divider className={classes.divider}/>
            </div>
            <br />
            <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )
    
    if(error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
        </>
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper} >
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
