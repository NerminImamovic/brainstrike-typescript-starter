import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card as CardType } from '../../generated/graphql';
import { CardForm } from './CardForm';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    fabFav: {
      marginLeft: 'auto',
    },
  }),
);

interface SimpleCardProps {
  card: CardType;
}

interface MyFormValues {
  number?: number | null;
  label?: string | null;
  description?: string | null;
}

const CardLayout: React.FC<SimpleCardProps> = (
  props: SimpleCardProps,
): React.ReactElement => {
  const { number, label, description } = props.card;
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        # {number} {label}
      </Typography>
      <Typography>{description}</Typography>
    </div>
  );
};

export const SimpleCard: React.FC<SimpleCardProps> = (
  props: SimpleCardProps,
): React.ReactElement => {
  const classes = useStyles();
  const [updating, setUpdating] = React.useState(false);
  const { created } = props.card;

  const handleEditClick = (): void => {
    setUpdating(!updating);
  };

  return (
    <Card>
      <CardContent>
        {updating ? (
          <CardForm card={props.card} />
        ) : (
          <CardLayout card={props.card} />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" size="small" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="like" size="small">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>

        <span className={classes.fabFav}>
          {new Date(created).toDateString()}
        </span>
      </CardActions>
    </Card>
  );
};
