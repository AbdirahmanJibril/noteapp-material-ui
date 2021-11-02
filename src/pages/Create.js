import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function Create({ title, note, category, id, deleteItem }) {
  const history = useHistory()
  function handleClick() {
    deleteItem(id)
  }

  return (
    <div className='note'>
      <Typography variant='h6'>{title}</Typography>

      <Typography variant='body2'>{note}</Typography>
      <Typography variant='subtitle1'>{category}</Typography>

      <Button variant='contained' className='button' onClick={handleClick}>
        <DeleteForeverIcon color='primary' style={{ fontSize: 30 }} />
      </Button>
    </div>
  )
}
