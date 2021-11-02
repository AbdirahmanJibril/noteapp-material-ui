import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

// function handleNotes(e){
//   const newNote=e.targe.value;
//   setNotes(newNote);
// }
// function handleTitle(e) {
//   const newTitle = e.target.value;
//   setTitle(newTitle);
// }

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 30,
    marginBottom: 30,

    display: 'block',
  },
}))

export default function Notes(props) {
  const history = useHistory()
  const [notes, setNotes] = useState({
    title: '',
    note: '',
    category: 'travel-blogger',
  })

  function handleNote(event) {
    const { value, name } = event.target
    setNotes(prevNotes => {
      return {
        ...prevNotes,
        [name]: value,
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onAdd(notes)
    fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(notes),
    })
    setNotes({ title: '', note: '', category: 'travel-blogger' })
    history.push('/fetched')
  }

  const classes = useStyles()
  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <Typography variant='h2' color='primary' gutterBottom>
        Create a note
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.root}
          name='title'
          value={notes.title}
          onChange={handleNote}
          label='Subject'
          variant='outlined'
          fullWidth
        />

        <TextField
          className={classes.root}
          name='note'
          value={notes.note}
          onChange={handleNote}
          label='Your Note'
          placeholder='Placeholder'
          helperText='max 250 words!'
          multiline
          rows={4}
          variant='outlined'
          fullWidth
        />

        <FormControl style={{ display: 'block' }}>
          <FormLabel>Choose your Group</FormLabel>
          <RadioGroup
            aria-label='category'
            name='category'
            value={notes.category}
            onChange={handleNote}>
            <FormControlLabel
              value='travel-blogger'
              control={<Radio />}
              label='Travel Blogger'
            />
            <FormControlLabel
              value='food-blogger'
              control={<Radio />}
              label='Food Blogger'
            />
            <FormControlLabel
              value='tech-blogger'
              control={<Radio />}
              label='Tech Blogger'
            />

            <FormControlLabel value='other' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={handleSubmit}
          type='submit'
          variant='contained'
          color='primary'
          size='medium'>
          submit
        </Button>
      </form>
    </div>
  )
}
