const Weather = require('./data_model');

const add_weather = (req, res, next) => {
   let new_weather= Weather({
       
       time: req.body.time,
       city: req.body.city,
       deg:  req.body.deg,
       wind: req.body.wind
   });
   new_weather.save().then(()=>{
   console.log('saved');     
   }
)};
  
const remove_weather = (req, res) => { 
  const weather_to_delete = req.body.weather_id;
  Weather.findByIdAndRemove(weather_to_delete).then(() => {
    res.redirect('http://localhost:3000/history');
  });
};

   const get_weather = (req, res) => {
   Weather.find((err, weathers) => {
  if (err) return res.json({ success: false, error: err });
  return res.json({ weathers});
   });

   };
   
  module.exports.add_weather = add_weather;
  module.exports.remove_weather = remove_weather;

  module.exports.get_weather = get_weather;
  