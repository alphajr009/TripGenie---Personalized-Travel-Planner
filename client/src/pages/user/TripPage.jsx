import React, { useEffect, useState } from "react";
import UserFooter from "../../components/footer/UserFooter";
import Navbar from "../../components/navbar/MainNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col } from "antd";
import Slider from "react-slick";
import { FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import Logo from "../../assets/logoT.png"; 



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

    const logoImgData = await fetch(Logo).then(response => response.blob());
    const logoBase64Img = await blobToBase64(logoImgData);
    doc.addImage(logoBase64Img, 'JPEG', 15, 10, 50, 20);

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16);
    doc.text(20, 38, `${trips.tripname}`);

    // Add cover page
    const coverImgData = await fetch(`/uploads/${params.tripid}.jpg`).then(response => response.blob());
    const coverBase64Img = await blobToBase64(coverImgData);
    doc.addImage(coverBase64Img, 'JPEG', 20, 42, 170, 110);
    
    // Add trip details to the PDF
    let yPosition = 158; 
    const addSection = async (title, places) => { 
      doc.setFont("georgia" ,'bold'); 
        doc.setFontSize(14);
        doc.text(15, yPosition, title);
        yPosition += 2; // Increase y-position for space after title
        for (let index = 0; index < places.length; index++) {
            if (yPosition > 250) { 
                doc.addPage();
                yPosition = 20; 
            }
            const place = places[index];
            const imgData = await fetch(`/uploads/${place._id}-0.jpg`).then(response => response.blob());
            const base64Img = await blobToBase64(imgData);
            doc.addImage(base64Img, 'JPEG', 20, yPosition, 70, 50);
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal')
            doc.text(`${place.name}`, 110, yPosition + 20);
            doc.setFont('helvetica', 'normal')
            doc.text('Address: ', 110, yPosition + 26);
            const lines = doc.splitTextToSize(place.address, 75); // Break address into multiple lines
            for (let i = 0; i < lines.length; i++) {
                doc.text(lines[i], 128, yPosition + 26 + (i * 6)); // Adjust the increment value (6) as needed for spacing between lines
            }
            
            yPosition += 60; 
        }
        yPosition += 3; // Increase y-position for space after section
    };
    
    await addSection("Do", doPlaces);
    await addSection("Eat", eatPlaces); 
    await addSection("Stay", stayPlaces); 
    
    // Save the PDF with a filename
    doc.save(`${trips.tripname}.pdf`);
}



// Function to convert blob to Base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
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
            <Button onClick={() => downloadReceipt()}>
              <FilePdfOutlined />
              Download
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
