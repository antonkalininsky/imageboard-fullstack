import React from 'react'
import classes from './post.module.css'

export default function Post(props) {
  return (
    <div className={classes.post}>{props.text}</div>
  )
}
