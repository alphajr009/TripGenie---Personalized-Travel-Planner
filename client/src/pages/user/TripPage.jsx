import React, { useEffect, useState } from "react";
import UserFooter from "../../components/footer/UserFooter";
import Navbar from "../../components/navbar/MainNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col } from "antd";
import Slider from "react-slick";
import { FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";

function Place({ place }) {
  return (
    <div>
      <Card
        hoverable={false}
        cover={
          <img
            className="palce-card-image"
            src={`/uploads/${place._id}-0.jpg`}
            alt={place.name}
          />
        }
      >
        <div className="place-card-p plan-trip-card ">
          <p>{place.name}</p>
          <Button onClick={() => window.open(`/place/${place._id}`, "_blank")}>
            View
          </Button>
        </div>
      </Card>
    </div>
  );
}

function TripPage() {
  let params = useParams();

  const [trips, setTrips] = useState([]);
  const [doPlaces, setDoPlaces] = useState([]);
  const [eatPlaces, setEatPlaces] = useState([]);
  const [stayPlaces, setStayPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (user) {
        const userId = user._id;
        try {
          const data = (
            await axios.post("/api/trips/gettripbyid", {
              tripid: params.tripid,
            })
          ).data;
          setTrips(data.trip[0]);

          const doIds = JSON.parse(data.trip[0].do);
          const eatIds = JSON.parse(data.trip[0].eat);
          const stayIds = JSON.parse(data.trip[0].stay);
          try {
            const doPlacesResponse = await axios.post("/api/places/getdo", {
              do: JSON.stringify(doIds),
            });
            setDoPlaces(doPlacesResponse.data.places);
          } catch (error) {
            console.log(error);
          }

          try {
            const eatPlacesResponse = await axios.post("/api/places/geteat", {
              eat: JSON.stringify(eatIds),
            });
            setEatPlaces(eatPlacesResponse.data.places);
          } catch (error) {
            console.log(error);
          }

          try {
            const stayPlacesResponse = await axios.post("/api/places/getstay", {
              stay: JSON.stringify(stayIds),
            });
            setStayPlaces(stayPlacesResponse.data.places);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    };

    fetchData();
  }, [params.tripid]);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function downloadReceipt() {
    const doc = new jsPDF();

    // doc.setFont("helvetica")
    // doc.setFontSize(17);
    doc.text(`${trips.tripname}`, 52, 85);
    // doc.text(`${booking._id}`, 52, 85);

    // doc.setFont("helvetica")
    // doc.setFontSize(14);
    // doc.text(`${booking.room}`, 49, 115.5);
    // doc.text(`${booking.fromdate}`, 49, 126.5);
    // doc.text(`${booking.todate}`, 49.7, 137.5);
    // doc.text(`0${booking.totaldays}`, 50, 148.7);
    // doc.text(`Rs. ${booking.totalamount}/-`, 50, 159.6);

    doc.save(`Invoice_${trips.tripname}.pdf`);
  }

  return (
    <div className="place-page">
      <Navbar></Navbar>

      <div>
        <div>
          <img
            className="place-cover"
            src={`/uploads/${params.tripid}.jpg`}
            alt=""
          />
        </div>

        <div className="place-cover-details">
          <h1>{trips.tripname}</h1>
          <p>You can manage your trip easily from here</p>

          <div className="download-button-container">
            <Button onClick={() => downloadReceipt}>
              <FilePdfOutlined />
              Downlaod
            </Button>
          </div>
        </div>

        <div className="tripplan-body-content">
          <h3>Do</h3>
          <Slider {...settings}>
            {doPlaces.map((place) => (
              <Col key={place._id} className="location-card ">
                <Place place={place} />
              </Col>
            ))}
          </Slider>

          <h3 className="h3placetrip">Eat</h3>
          <Slider {...settings}>
            {eatPlaces.map((place) => (
              <Col key={place._id} className="location-card ">
                <Place place={place} />
              </Col>
            ))}
          </Slider>

          <h3 className="h3placetrip">Stay</h3>
          <Slider {...settings}>
            {stayPlaces.map((place) => (
              <Col key={place._id} className="location-card ">
                <Place place={place} />
              </Col>
            ))}
          </Slider>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}

export default TripPage;
