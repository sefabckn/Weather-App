import { Container, Row, Col, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { Weather } from '../types/Weather'
import '../index.css'


const Home = () => {

    const api = {
        key: "6f223a8c048584a34e278daf1ed40695",
        baseURL: "https://api.openweathermap.org/data/2.5/"
    }

    const [query, setQuery] = useState('')
    const [weatherdata, setWeatherdata] = useState<Weather>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
            if (response.ok) {
                const data = await response.json();
                setWeatherdata(data);
                console.log(weatherdata)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const dateBuilder = (d: any) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <>
            <Container>
                <div className ={(typeof weatherdata.main != "undefined") ? ((weatherdata.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
                    <Row>
                        <Col xs={10} className="mx-auto my-3">
                            <h1>Weather App</h1>
                        </Col>
                        <Col xs={10} className="search-box mx-auto">
                            <Form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                                <Form.Control
                                    type="search"
                                    value={query}
                                    onChange={handleChange}
                                    placeholder="type and press Enter"
                                    className="search-bar"
                                />
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {
                            weatherdata.map(weather => (typeof weather.main !== 'undefined') ? (
                                <div>
                                    <div className="location-box">
                                        <div className="location">{weather.name}, {weather.sys.country}</div>
                                        <div className="date">{dateBuilder(new Date())}</div>
                                    </div>
                                    <div className="weather-box">
                                        <div className="temp">
                                            {Math.round(weather.main.temp)}°c
                                        </div>
                                        <div className="weather">{weather.weather[0].main}</div>
                                    </div>
                                </div>
                            ) : (''))
                        }
                    </Row>
            </Container>
        </>
    )
}
export default Home;