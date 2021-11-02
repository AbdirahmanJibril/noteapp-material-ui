import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CardNote from '../components/CardNot'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import { Button } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))
export const FetchedNotes = () => {
  const [memos, setMemos] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setisLoading] = useState(true)
  const classes = useStyle()
  const history = useHistory()

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch for that resource')
        }
        return res.json()
      })
      .then(data => {
        setMemos(data)
        setisLoading(false)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  const deleteItem = async id => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    })
    const newNotes = memos.filter(note => {
      return note.id != id
    })
    setMemos(newNotes)
  }

  return (
    <div>
      {isLoading && <Typography variant='h6'>Loading....</Typography>}
      <Typography>
        {error && (
          <Typography
            variant='h4'
            align='center'
            style={{
              marginTop: 200,
            }}>
            {error}
          </Typography>
        )}
      </Typography>
      {memos && (
        <Container>
          <Grid container className={classes.root} spacing={3}>
            {memos.map(note => {
              return (
                <Grid item key={note.id} xs={12} md={6} lg={4}>
                  {/* render only if there is data in memos container */}

                  <CardNote note={note} deleteItem={deleteItem} />
                </Grid>
              )
            })}
          </Grid>
        </Container>
      )}
    </div>
  )
}
