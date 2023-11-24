import React from 'react'
import classes from './threadblock.module.css'
import { Link } from 'react-router-dom'

export default function ThreadBlock(props) {
    return (
        <div className={classes.thread}>
            <div>{props.text}</div>
            <Link to={`thread`}>зайти</Link>
            {/* <button>Посмотреть</button> */}

        </div>
      )
}
