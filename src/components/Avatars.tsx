import * as React from "react";

import Avatar from "@material-ui/core/Avatar";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  bigAvatar: {
    alignSelf: "center",
    height: 100,
    width: 100
  },
  smallAvatar: {
    alignSelf: "center",
    height: 75,
    width: 75
  },
  tinyAvatar: {
    alignSelf: "center",
    height: 50,
    width: 50
  }
};

export const BigAvatar = withStyles(styles)(
  ({ src, classes }: { src?: string; classes: any }) => (
    <Avatar
      alt="resident"
      src={src || "https://placeimg.com/180/180/any"}
      className={classes.bigAvatar}
    />
  )
);

export const SmallAvatar = withStyles(styles)(
  ({ src, classes }: { src?: string; classes: any }) => (
    <Avatar
      alt="resident"
      src={src || "https://placeimg.com/180/180/any"}
      className={classes.smallAvatar}
    />
  )
);

export const LetterAvatar = withStyles(styles)(
  ({ letter, classes }: { letter?: string; classes?: any }) => (
    <Avatar alt="resident" className={classes.smallAvatar}>
      {letter || "Aa"}
    </Avatar>
  )
);

export const TinyAvatar = withStyles(styles)(
  ({ src, classes }: { src?: string; classes: any }) => (
    <Avatar
      alt="resident"
      src={src || "https://placeimg.com/180/180/any"}
      className={classes.tinyAvatar}
    />
  )
);
