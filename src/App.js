import { useState } from 'react'

const api = {
  key: "5ce478d2872bf881543bcbd8a66cbe3f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [feels, setFeels] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(res => {
          setQuery('')
          setTemp(res.main.temp)
          setFeels(res.main.feels_like)
          setMin(res.main.temp_min)
          setMax(res.main.temp_max)
          setCity(res.name)
          setWeather(res.weather[0].main)
          console.log(res)
        })
        .catch((res) => {
          alert(`There is no ${query} City`)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`
  }

  return (
    <div className={(weather !== "") ?
      ((weather === 'Clouds') ? 'app cloud' :
        (weather === 'Rain') ? 'app rain' :
          (weather === 'Snow') ? 'app snow' :
            (weather === 'Clear') ? 'app clear' :
              (weather === 'Mist') ? 'app mist' : 'app') : 'app'}>
      <div className="app-wrap">
        <header>
          <input className="input" type="text" placeholder="Search The City" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
          {/* <div className="date">{new Date().getHours()} <span>:</span> {new Date().getMinutes()}</div> */}
        </header>
        {
          (weather !== "") ? (
            <div className="container">
              <div className="content">
                <h4>{city}</h4>
                <h6>{dateBuilder(new Date())}</h6>
                <h1>{Math.round(temp)}<span>º</span></h1>
                <div className="icon">
                  {(weather === 'Clouds' ? <i className="fas fa-cloud"></i> : '')}
                  {(weather === 'Rain' ? <i className="fas fa-cloud-showers-heavy"></i> : '')}
                  {(weather === 'Snow' ? <i className="far fa-snowflake"></i> : '')}
                  {(weather === 'Clear' ? <i className="fas fa-sun"></i> : '')}
                  {(weather === 'Mist' ? <i className="fas fa-tint"></i> : '')}
                </div>
                <h2>{weather}</h2>
              </div>
              <div className="sub-content">
                <div className="fade01">
                  <p className="title">Discomfort</p>
                  <p>{feels}</p>
                </div>
                <div className="fade02">
                  <p className="title">Min</p>
                  <p>{min}º</p>
                </div>
                <div className="fade03">
                  <p className="title">Max</p>
                  <p>{max}º</p>
                </div>
              </div>
            </div>
          ) : ('')
        }
      </div>
    </div >
  );
}

export default App;
