//viiden päivän sää

import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fi'; //päivämäärä suomen viikonpäiväksi
import FadeIn from 'react-fade-in'; //häivytysefekti

import './Five.css';

const KEY=process.env.REACT_APP_API_KEY; //haetaan apin avain ympäristömuuttujasta

class Five extends Component {
    
 constructor(props) {
    
    super();
    this.state = {
    
    date1: '',
    date2: '',
    date3: '',
    date4: '',
    date5: '',
    city:'',
    deg1: '',
    deg2: '',
    deg3: '',
    deg4: '',
    deg5: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    wind1: '',
    wind2: '',
    wind3: '',
    wind4: '',
    wind5: '',
    place:'', //apu
    show: true //tallenna-napin näkyvyys
   
    };  
  
 }


 componentDidMount() { //kun sivu ladataan haetaan oletuksena Seinäjoen tiedot
    this.place = 'Seinajoki';
    this.onClick(); 
}

handleChange = (e) => { 
        this.place = e.target.value; 
        this.setState({place: this.place});
         
    }

handleInput = e => { //pikavalintojen kaupunkien haku
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
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q='+this.place+'&units=metric&appid='+KEY+'&lang=fi')
        .then(response => {
            this.setState({
            city: response.data.city.name, 
            date1: response.data.list[0].dt_txt,
            date2: response.data.list[8].dt_txt,
            date3: response.data.list[16].dt_txt,
            date4: response.data.list[24].dt_txt,
            date5: response.data.list[32].dt_txt,
            deg1: response.data.list[0].main.temp+"\u00B0",
            deg2: response.data.list[8].main.temp+"\u00B0", 
            deg3: response.data.list[16].main.temp+"\u00B0", 
            deg4: response.data.list[24].main.temp+"\u00B0", 
            deg5: response.data.list[32].main.temp+"\u00B0",  
            img1: "https://openweathermap.org/img/wn/"+response.data.list[0].weather[0].icon+"@2x.png",
            img2: "https://openweathermap.org/img/wn/"+response.data.list[8].weather[0].icon+"@2x.png",
            img3: "https://openweathermap.org/img/wn/"+response.data.list[16].weather[0].icon+"@2x.png",
            img4: "https://openweathermap.org/img/wn/"+response.data.list[24].weather[0].icon+"@2x.png",
            img5: "https://openweathermap.org/img/wn/"+response.data.list[32].weather[0].icon+"@2x.png",
            
            wind1: "Tuuli: "+response.data.list[0].wind.speed+" m/s",
            wind2: "Tuuli: "+response.data.list[8].wind.speed+" m/s",
            wind3: "Tuuli: "+response.data.list[16].wind.speed+" m/s",
            wind4: "Tuuli: "+response.data.list[24].wind.speed+" m/s",
            wind5: "Tuuli: "+response.data.list[32].wind.speed+" m/s"});
        })
        .catch(error => {
            console.log(error);
            this.setState({
            city:"placea ei löydy!",
            deg1: "",
            deg2: "", 
            deg3: "", 
            deg4: "", 
            deg5: "",  
            img1: "",
            img2: "",
            img3: "",
            img4: "",
            img5: "",         
            wind1: "",
            wind2: "",
            wind3: "",
            wind4: "",
            wind5: "",
            show: false
            })
    
        });
    }

    render() {
       //pikavalintanappien tyyli
        const style = {
            color: 'black',
            background: 'transparent',
            font: '16',
            cursor: 'pointer',
            border: '0px solid black'
        
        };
        const city = this.state.city;
       
        //muunnetaan päivämäärä viikonpäiväksi
        const date1 = moment(this.state.date1).format("dddd");
        
        const date2 = moment(this.state.date2).format("dddd");
        const date3 = moment(this.state.date3).format("dddd");
        const date4 = moment(this.state.date4).format("dddd");
        const date5 = moment(this.state.date5).format("dddd");

        const deg1 = this.state.deg1;
        const deg2 = this.state.deg2;
        const deg3 = this.state.deg3;
        const deg4 = this.state.deg4;
        const deg5 = this.state.deg5;

        const img1 = this.state.img1;
        const img2 = this.state.img2;
        const img3 = this.state.img3;
        const img4 = this.state.img4;
        const img5 = this.state.img5;

        const wind1 = this.state.wind1;
        const wind2 = this.state.wind2;
        const wind3 = this.state.wind3;
        const wind4 = this.state.wind4;
        const wind5 = this.state.wind5;

       
      
        

    return (
    <div className="Main">
    <div>
   
    <h1>Viiden päivän ennuste</h1> <br />

    <button style={style} onClick={this.handleInput} value="kauhajoki">Kauhajoki</button>
    <button style={style} onClick={this.handleInput} value="turku">Turku</button>
    <button style={style} onClick={this.handleInput} value="tampere">Tampere</button>
    <button style={style} onClick={this.handleInput} value="helsinki">Helsinki</button>
    <button style={style} onClick={this.handleInput} value="oulu">Oulu</button>
    
    <br/><br/><br/>
    <input type="text" onChange={this.handleChange} onKeyPress={this.onKeyUP} placeholder="Anna kaupungin nimi"/>
    <button type="button" onClick={this.onClick}>Hae</button><br/><br/>

    <br /> 
    
    </div>

    <h2>{city} </h2>
    
    <br />

    <FadeIn>
    <div className="Weather">

    <div>
     {date1}  <br /> <br />{deg1} <br /> <br /> <img src={img1} alt=""/> <br /> {wind1} 
    </div>
    <div >
    {date2}<br /> <br />{deg2} <br /> <br /><img src={img2} alt=""/> <br /> {wind2} 
    </div>
    <div>
    {date3} <br />  <br />{deg3} <br />  <br /><img src={img3} alt=""/> <br /> {wind3} 
    </div>
    <div>
    {date4}<br />  <br />{deg4} <br />  <br /><img src={img4} alt=""/> <br /> {wind4} 
    </div>
    <div>
    {date5}<br />  <br />{deg5} <br />  <br /><img src={img5} alt=""/> <br /> {wind5} 
    </div>
   
    </div>
    </FadeIn>

    </div> );

    }

}
export default Five;