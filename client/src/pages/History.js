import React from 'react';
import axios from 'axios';
import Weather from "./Weather";
import FadeIn from 'react-fade-in'; //häivytysefekti

import './History.css';


class History extends React.Component {

  constructor(props){

      super();
        
        this.state = {
        weathers: [],
        show: false,
        
        };     
        this.buttonShow = this.buttonShow.bind(this);
  }

      componentDidMount = () => {
        
        this.getDataFromDb();
      };


      getDataFromDb = () => {
        axios.get('/getData/').then((response)=>
    
            {            
                  const data = response.data.weathers
                  
                  console.log(data)

                
                  const weathers = data.map( weather => {
                   return (
                      
                    <div key={weather._id} className="div">
                   
                  <Weather
                    time={weather.time}
                    city={weather.city}
                    deg={weather.deg}
                    wind={weather.wind}>
                             
                    <form action="/removeData/" method="POST" className="form">
                    <input type="hidden" name="weather_id" value={weather._id} />
                  
                    {this.state.show ?<button type="submit" className="button" >X</button> :null}

                    </form>
                    
                    </Weather>

                    </div>
                    );
                    })
                    this.setState({
                      weathers
                      
                    })

            })
            .catch(error => {
                console.log(error);
               
            });  
            

            
        }
        sortValues = () => {
         this.setState({
          weathers: [...this.state.weathers].reverse()
        })}

        buttonShow = () =>{ //poistoruksin näyttäminen
          this.getDataFromDb();
          this.setState({
            show: !this.state.show
            
          });
          
         
         
        }

 render() {
    return (
     
<div className="History" >

    <h1>Säähistoria</h1>

<br />
<button onClick={this.sortValues}>Järjestä</button>
<button onClick={this.buttonShow}>Poista</button>

<br /><br />
<FadeIn>
<div>
{this.state.weathers}
</div>
</FadeIn>
</div>
);


}

}

export default History;