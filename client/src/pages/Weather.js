import React from 'react';


const weather = (props)=> {
    return(
         
        <div className="weather">

          {props.time} | {props.city} | {props.deg} | {props.wind}  {props.children}

        </div>)

}

export default weather;