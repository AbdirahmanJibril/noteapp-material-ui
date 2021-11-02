import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import { teal, yellow, red, blue } from '@material-ui/core/colors';
import { BorderAllOutlined, SportsRugbySharp } from '@material-ui/icons';

const useStyles = makeStyles((theme, note) => {
  return {
    root: {
      flexGrow: 1,
      marginTop: 50,
    },
    avatar: {
      backgroundColor: (note) => {
        if (note.category == 'travel-blogger') {
          return red[700];
        }
        if (note.category == 'food-blogger') {
          return yellow[500];
        }
        if (note.category == 'tech-blogger') {
          return teal[500];
        } else return blue[500];
      },
    },

    Card: {
      height: 250,
      width: 250,
    },

    buttonColor: {
      color: teal[500],
    },
    title: {
      padding: theme.spacing(3),
    },
  };
});

export default function CardNot({ note, deleteItem }) {
  function handleClick() {
    deleteItem(note.id);
  }
  const classes = useStyles(note);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        title={note.title}
        className={classes.title}
        // action={
        //   <Button onClick={handleClick}>
        //     <DeleteForever className={classes.buttonColor} />
        //   </Button>
        // }
      />
      <CardContent>
        <Typography variant='body2'>{note.note}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={handleClick}>
          <DeleteForever className={classes.buttonColor} />
        </Button>
        <Typography>{note.category}</Typography>
      </CardActions>
    </Card>
  );
}
