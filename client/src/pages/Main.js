//tämänhetkinen sää / oletussivu

import React, { Component } from 'react';
import axios from 'axios';
import getTime from '../scripts/Time'; //tämänhetkisen ajan haku
import FadeIn from 'react-fade-in'; //häivytysefekti
import Radium from 'radium';

import './Main.css';


const KEY=process.env.REACT_APP_API_KEY; //haetaan apin avain ympäristömuuttujasta

class Main extends Component {

 constructor(props) {
    super();
    this.state = {
    data: [],
    city:'',
    time: '',
    deg: '',
    img: '',
    wind: '',
    place:'', //apu
    showButton: true, //tallenna-napin näkyvyys
    };  
 }


 componentDidMount() { //kun sivu ladataan haetaan oletuksena Seinäjoen tiedot
  
    this.place='seinajoki';
    this.onClick();  
    
    }

   
 handleChange = (e) => { 
    this.place = e.target.value; 
    this.setState({place: this.place});
    
}

//pikavalintojen kaupunkien haku
handleInput = (e) => { 
    this.place = e.target.value;
    this.setState({place: this.place});  
    this.onClick();
}

//enterin painallus
 onKeyUP= (e) => {
        if (e.key === "Enter"){
            this.onClick();
        }
    }

 onClick = () => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+this.place+'&units=metric&appid='+KEY+'&lang=fi') //haetaan tiedot apista
        .then(response => {
            this.setState({
            time: getTime(), //haetaan tämänhetkinen päiväys
            city: response.data.name, 
            deg: response.data.main.temp+"\u00B0", 
            img: "https://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png",
            wind: response.data.wind.speed+" m/s",
            showButton:true
            
            },
            );
        })
        .catch(error => {
            console.log(error);
            this.setState({
                city: "paikkaa ei löydy!", 
                deg : "", 
                img: "",
                wind: "",
                showButton:false
            });
        });
    }

    onSubmit = () => {
        this.setState({showButton:false});
        axios.post('/putData',{ //viedään data tietokantaan
            time: this.state.time,
            city: this.state.city,
            deg: this.state.deg,
            wind: this.state.wind
            
        })
        .then (response => {console.log(response);
               
        })
        .catch(error => {
            console.log(error);
        }); 
        
    }

    render() {
        //pikavalintanappien tyyli
        const style = {
            color: 'black',
            background: 'transparent',
            cursor: 'pointer',
            font: '16',
            border: '0px',
            ':hover': {
                color: 'red',
              } 


        };
       
        const city = this.state.city;
        const deg = this.state.deg;
        const img = this.state.img;
        const wind = this.state.wind;
      

    return (
    <div className="Main">
 
    <h1>Päivän sää</h1> <br />
    <button key={1} style={style} onClick={this.handleInput} value="kauhajoki">Kauhajoki</button>
    <button key={2} style={style} onClick={this.handleInput} value="turku">Turku</button>
    <button key={3} style={style} onClick={this.handleInput} value="tampere">Tampere</button>
    <button key={4} style={style} onClick={this.handleInput} value="helsinki">Helsinki</button>
    <button key={5} style={style} onClick={this.handleInput} value="oulu">Oulu</button>
    
   
    <br /><br /><br />
    <input type="text" name="deg" onChange={this.handleChange} onKeyPress={this.onKeyUP} placeholder="Anna kaupungin nimi"/> 
    <button onClick={this.onClick}>Hae</button>

    <br /><br />
    <FadeIn>
    <div className="Card">
    <h2>{city}</h2>
    <br /><br />
    {deg} <img src={img} alt=""/> {wind}<br /> 
    <br />
  
    </div><br />
    </FadeIn>
    {this.state.showButton ? <button onClick={this.onSubmit} type="submit">Tallenna</button> : <button disabled>Tallennettu</button>} 
    <br />
    </div>);

    }

}

export default Radium(Main);