import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { green, purple } from '@material-ui/core/colors'
import { Children, useState } from 'react'
import { FetchedNotes } from './pages/FetchedNotes'
import { Navbar } from './pages/Navbar'
import ResponsiveDrawer from './components/Layout'
import Layout from './components/Layout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: purple[500],
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
})

const useStyles = makeStyles({
  mainColor: {
    color: theme.palette.primary.main,
  },
  secondColor: {
    color: theme.palette.secondary.light,
  },
})

function App() {
  const [notes, setNotes] = useState([])

  function addNote(newNotes) {
    setNotes(prevNotes => {
      return [...prevNotes, newNotes]
    })
  }

  // function itemDelete(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((currentNote, index) => {
  //       return index != id
  //     })
  //   })
  // }

  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Notes onAdd={addNote} />
              {/* {notes.map((noteItem, index) => {
                return (
                  <Create
                    key={index}
                    id={index}
                    title={noteItem.title}
                    note={noteItem.note}
                    category={noteItem.category}
                    deleteItem={itemDelete}
                  />
                )
              })} */}
            </Route>
            <Route path='/create'></Route>
            <Route path='/fetched'>
              <FetchedNotes />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
