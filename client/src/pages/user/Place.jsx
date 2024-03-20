import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/MainNavbar";
import "../../css/palnTrip.css";
import "../../css/place.css";
import { Col, Modal, Button, Rate, Form, Input } from "antd";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import weather1 from "../../assets/cloud.png";
import Map from "../../assets/map.png";
import Save from "../../assets/save.png";
import Cloud from "../../assets/clouds.png";
import Clear from "../../assets/clear.png";
import Rain from "../../assets/rain.png";
import Drizzle from "../../assets/drizzle.png";
import Mist from "../../assets/mist.png";
import humidity from "../../assets/humidity.png";
import Windy from "../../assets/windx.png";
import { HeartOutlined, HeartFilled, FireOutlined, FireFilled } from "@ant-design/icons";
import UserFooter from '../../components/footer/UserFooter';
import Slider from "react-slick";
import { faAngellist } from '@fortawesome/free-brands-svg-icons';




function Place() {

  const user = JSON.parse(localStorage.getItem("currentUser"));



  let params = useParams();
  const [place, setPlace] = useState({})
  const [image, setImage] = useState('')

  const [isModalVisible, setIsModalVisible] = useState(false);

  const api = {
    key: "73ca22a9518c8d51001d8e5302826917",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);



  useEffect(() => {

    (async () => {



      try {
        const data = (await axios.post("/api/places/getplacebyid", { placeid: params.placeid })).data
        setPlace(data.place[0]);
        setSearch(data.place[0].city)




      } catch (error) {
        console.log('error')

      }
    })();
  }, [params.placeid]);


  useEffect(() => {

    (async () => {

      try {
        const data = (await axios.post("/api/reviews/getreviewbyid", { placeid: params.placeid })).data
        setReviews(data.review);


      } catch (error) {
        console.log('error')

      }
    })();
  }, [params.placeid]);



  useEffect(() => {
    if (search) {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [search]);


  useEffect(() => {
    if (weather && weather.weather && weather.weather.length > 0) {
      let imagePath = '';
      if (weather.weather[0].main === "Clouds") {
        imagePath = Cloud;
      } else if (weather.weather[0].main === "Clear") {
        imagePath = Clear;
      } else if (weather.weather[0].main === "Rain") {
        imagePath = Rain;
      } else if (weather.weather[0].main === "Drizzle") {
        imagePath = Drizzle;
      } else if (weather.weather[0].main === "Mist") {
        imagePath = Mist;
      } else {
        imagePath = Clear;
      }
      setImage(imagePath);
    }
  }, [weather]);


  useEffect(() => {

    const checkSavedStatus = async () => {
      const user = JSON.parse(localStorage.getItem('currentUser'));

      if (user) {
        const userId = user._id;
        try {
          const { data: { hasSaved } } = await axios.post('/api/users/check-save', { placeId: params.placeid, userId });
          setSaved(hasSaved);
        } catch (error) {
          console.error('Error checking saved status:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    const checkLikedStatus = async () => {
      const user = JSON.parse(localStorage.getItem('currentUser'));

      if (user) {
        const userId = user._id;
        try {
          const { data: { hasLiked } } = await axios.post('/api/places/check-like', { placeId: params.placeid, userId });
          setLiked(hasLiked);
        } catch (error) {
          console.error('Error checking liked status:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };


    checkSavedStatus();
    checkLikedStatus();
  }, [params.placeid]);


  useEffect(() => {
    const checkSavedStatus = async () => {
      const user = JSON.parse(localStorage.getItem('currentUser'));

      if (user) {
        const userId = user._id;
        try {
          const { data: { hasSaved } } = await axios.post('/api/users/check-save', { placeId: params.placeid, userId });
          setSaved(hasSaved);
        } catch (error) {
          console.error('Error checking saved status:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    const fetchDataAndCheckSavedStatus = async () => {
      try {

        const data = await axios.post('/api/users/getuserbyid', { userid: user._id });
        setPlace(data.place[0]);
        setSearch(data.place[0].city);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        checkSavedStatus();
      }
    };

    fetchDataAndCheckSavedStatus();
  }, [user._id, params.placeid]);





  const handleModalOpen = () => {
    setIsModalVisible(true);
  };


  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  let likes = place.likes;

  const handleLikeButtonClick = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const userId = user._id;
      if (liked) {
        await axios.post("/api/places/unlike", { placeId: params.placeid, userId });
        setPlace((prevPlace) => ({ ...prevPlace, likes: Math.max(prevPlace.likes - 1, 0) }));
      } else {
        await axios.post("/api/places/like", { placeId: params.placeid, userId });
        setPlace((prevPlace) => ({ ...prevPlace, likes: prevPlace.likes + 1 }));
      }
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error("Error liking/unliking place:", error);
    }
  };


  const handleSaveButtonClick = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const userId = user._id;
      if (saved) {
        console.log("Not Saved")
        await axios.post("/api/users/unsave", { placeId: params.placeid, userId });
      } else {
        console.log("Saved")
        await axios.post("/api/users/save", { placeId: params.placeid, userId });
      }
      setSaved((prevSaved) => !prevSaved);
    } catch (error) {
      console.error("Error saving/unsaving place:", error);
    }
  };


  const likedColor = "#e4264e";


  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const [value, setValue] = useState();
  const [name, setName] = useState('');
  const [reviewd, setReview] = useState('');
  const [age, setAge] = useState('');


  async function sendReview() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const userId = user._id;
      await axios.post("/api/reviews/review", { placeId: params.placeid, name, reviewd, value,age });
      // window.location.reload();
    } catch (error) {
      console.error("Error sending review:", error);
    }

  }


  return (


    <div className='place-page'>
      <Navbar></Navbar>

      <div>
        <div>
          <img className="place-cover" src={`/uploads/${params.placeid}-0.jpg`} alt="" />
        </div>


        <div className="place-cover-save">

          <a onClick={() => handleSaveButtonClick()}>
            {saved ? <FireFilled className="saved-fire" /> : <FireOutlined className="size-fire" />}

          </a>


        </div>


        <div className="place-cover-details">
          <h1>Welcome to {place.name}</h1>
          <p>Enjoy your vacation here</p>
          <div>
            <img className="fuction-icons " src={weather1} alt="" onClick={handleModalOpen} />
            <a href={place.googlemaplink} target="_blank" rel="noopener noreferrer">
              <img className="fuction-icons" src={Map} alt="" />
            </a>
            <div className="like-button-container">
              <Button
                icon={liked ? <HeartFilled className="liked-heart" /> : <HeartOutlined />}
                onClick={() => handleLikeButtonClick()}
              >
                <span style={{ color: liked ? likedColor : "inherit" }}>
                  {likes} Likes
                </span>
              </Button>

            </div>
          </div>
        </div>
        <div className="place-page-content">
          <Col span={12}>
            <h1>{place.name}</h1>
            <p>
              {place.description}
            </p>
          </Col>

          <div>
            <div className="frameDiv">
              <div className='group'>
                <img className='icon1' alt="" src={`/uploads/${params.placeid}-0.jpg`} />
                <img className='icon2' alt="" src={`/uploads/${params.placeid}-1.jpg`} />
                <img className='icon3' alt="" src={`/uploads/${params.placeid}-2.jpg`} />
              </div>
              <img className='icon4' alt="" src={`/uploads/${params.placeid}-3.jpg`} />
              <img className='icon5' alt="" src={`/uploads/${params.placeid}-4.jpg`} />
              <img className='icon6' alt="" src={`/uploads/${params.placeid}-5.jpg`} />
              <img className='icon7' alt="" src={`/uploads/${params.placeid}-6.jpg`} />


            </div>
          </div>

        </div>
        <div className='place-reviews'>
          <h1> Reviews</h1>



          <Slider {...settings}>
            {reviews.map((review) => (
              <div className='review-cc-card' key={review._id}>
                <div className='review-card-slide'>
                  <div className='review-card'>
                    <div className='review-card-header'>
                      <div style={{ marginTop: '2px', width: '145px' }}>{review.name}</div>
                      <div className='ratepoint'>
                        <Rate style={{ fontSize: '18px' }} value={review.value} />
                      </div>
                    </div>
                    <div className='review-dis'>{review.reviewd}</div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <h3 className='right-text'>Write a review</h3>


          <div className="review-card-write">

            <Form.Item
              name="rate"
            >
              <Rate style={{ fontSize: '25px' }} onChange={setValue} value={value} />
            </Form.Item>

            <Form.Item
              label=" Name:"
              name="name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input className="createblog-dis-custom-inputx "
                maxLength={19}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label=" Age:"
              name="age"
              rules={[{ required: true, message: 'Please input your Age!' }]}
            >
              <Input className="createblog-dis-custom-inputx "
                maxLength={19}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Item>


            <Form.Item
              label=" Review:"
              name="review"
              rules={[{ required: true, message: 'Please input your Review!' }]}
            >
              <Input.TextArea className="createblog-dis-custom-inputx "
                value={reviewd}
                maxLength={442}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Item>

            


            <Button onClick={sendReview}>Send</Button>

          </div>

        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {typeof weather.main !== "undefined" ? (
          <div className='containerz'>


            <div className="weather3">
              <div className="winfo">
                <img src={image} alt="" className='icon' />
                <h1>{Math.round(weather.main.temp)}°c</h1>
                <h2>{weather.name}</h2>
                <div className="details">
                  <div className="col">
                    <img src={humidity} alt="" />
                    <div className='humidity'>
                      <p>{Math.round(weather.main.humidity)}%</p>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="col">
                    <img src={Windy} alt="" />
                    <div className='wind'>
                      <p>{Math.round(weather.wind.speed)} km/h</p>
                      <p>Wind</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        ) : (
          ""
        )}
      </Modal>
      <UserFooter />
    </div>


  )
}

export default Place