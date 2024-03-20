import React from "react";
import "../css/Exploreslider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PlaceCard from "./PlaceCard";
import { Col } from "antd";

import Sigiriya from "../assets/sigiriya.png";
import Mirissa from "../assets/mirissa.png";
import Ella from "../assets/ella.png";
import Kandy from "../assets/kandy.png";
import Yala from "../assets/yala.png";
import Colombo from "../assets/colombo.png";
import { useNavigate } from "react-router-dom";

function ExploreSlider() {
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

	const navigate = useNavigate();

	const handleCardClick = (cardName) => {
		navigate(`/plantrip`, { state: { search: cardName } });
	};


	return (
		<div>
			<div>

				<div className="carousel">

					<Slider {...settings}>
						<Col className="location-card">
							<PlaceCard PlaceCardName="Colombo" src={Colombo}
								onClick={() => handleCardClick("Colombo")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Sigiriya" src={Sigiriya}
								onClick={() => handleCardClick("Sigiriya")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Ella" src={Ella}
								onClick={() => handleCardClick("Ella")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Mirissa" src={Mirissa}
								onClick={() => handleCardClick("Mirissa")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Kandy" src={Kandy}
								onClick={() => handleCardClick("Kandy")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Yala" src={Yala}
								onClick={() => handleCardClick("Yala")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Ella" src={Ella}
								onClick={() => handleCardClick("Ella")} />
						</Col>

						<Col className="location-card">
							<PlaceCard PlaceCardName="Kandy" src={Kandy}
								onClick={() => handleCardClick("Kandy")} />
						</Col>
					</Slider>
				</div>
			</div>
		</div>
	);
}

export default ExploreSlider;
