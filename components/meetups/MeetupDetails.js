import {Fragment} from "react";
import classes from './MeetupDetails.module.css'
const MeetupDetails=(props)=>{
    return(
        <Fragment >
            <section className={classes.details}>
            <img src={props.image} alt='the first meetup' />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
            </section>
        </Fragment>
    );
}
export default MeetupDetails;