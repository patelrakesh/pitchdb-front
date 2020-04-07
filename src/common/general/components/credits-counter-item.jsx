import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import './credits-counter-item.css';

const styles = theme => ({
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`
  }
});


const CreditsCounterItem = props => {
  const { classes } = props;

  return (
    <div className={"CreditsCounterItem" + (props.remaining === 0 ? " badge-none" : (props.remaining > 5 ? " badge-plenty" : " badge-few"))}>
      <span onClick={props.onClick}>
        <Badge badgeContent={props.remaining} color={"default"}
          classes={{ badge: classes.badge }}>
          <i className="fas fa-credit-card"></i>
        </Badge>
      </span>
    </div>
  );
};

export default withStyles(styles)(CreditsCounterItem);
