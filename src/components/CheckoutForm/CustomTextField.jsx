import { Grid, TextField } from '@material-ui/core'
import React from 'react'

const FormInput = ({name, label}) => {
    return (
        <Grid item xs={12} sm={6}>
            <TextField name={name} required label={label}/>
        </Grid>
    )
}

export default FormInput
