import { FC } from "react";
import classes from "./black-hole.module.css";

const BlackHole: FC = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.tab}>
        <div className={classes.ring}></div>
        <div className={classes.ringdetail}></div>

        <div className={classes.ring2}></div>
        <div className={classes.ring2}></div>
        <div className={classes.ring2detail}></div>
        <div className={classes.ring2gloom}></div>

        <div className={classes.shape}></div>
      </div>
    </div>
  );
};

export default BlackHole;
