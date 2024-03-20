import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/MainNavbar";
import Slider from "react-slick";
import Slider01 from "../components/Slider";
import "../css/palnTrip.css";
import { Card, Col, Button, Modal, Input, Form } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserFooter from "../components/footer/UserFooter";
import ImageUploader1 from "../components/ImageUploader1";

const contentStyle = {
	background: "red",
};
const { Meta } = Card;

function Place({ place }) {
	return (
		<div>

			<Card
				hoverable={false}
				cover={<img className='palce-card-image' src={`/uploads/${place._id}-0.jpg`} alt={place.name} />}
			>
				<div className='place-card-p plan-trip-card '>
					<p>{place.name}</p>
					<Button onClick={() => window.open(`/place/${place._id}`, '_blank')}>View</Button>
				</div>
			</Card>

		</div>
	);
}



function PlanTrip() {

	const user = JSON.parse(localStorage.getItem("currentUser"));

	const [doplace, setDo] = useState([]);
	const [eatplace, setEat] = useState([]);
	const [stayplace, setStay] = useState([]);

	const [doselectedplace, setDoSelectedPlace] = useState([]);
	const [eatselectedplace, setEatSelectedPlace] = useState([]);
	const [stayselectedplace, setStaySelectedPlace] = useState([]);

	const [tripName, setTripName] = useState("");
	const [tripNote, setTripNote] = useState("");
	const [tripDays, setTripDays] = useState("");
	const [tripBudget, setTripBudget] = useState("");

	const [isModalVisible, setIsModalVisible] = useState(false);

	const [imageurl, setImageurl] = useState('');
	const [preferences, setPreferences] = useState([]);
	const [loading, setLoading] = useState(true);




	const onImageUpload = (imageFile) => {
		setImageurl(imageFile);
		console.log("Selected Image:", imageFile);
	};


	const handlePlaceSelect = (placeId, category) => {
		switch (category) {
			case 'Do':
				setDoSelectedPlace((prevSelected) =>
					prevSelected.includes(placeId)
						? prevSelected.filter((id) => id !== placeId)
						: [...prevSelected, placeId]
				);
				break;
			case 'Eat':
				setEatSelectedPlace((prevSelected) =>
					prevSelected.includes(placeId)
						? prevSelected.filter((id) => id !== placeId)
						: [...prevSelected, placeId]
				);
				break;
			case 'Stay':
				setStaySelectedPlace((prevSelected) =>
					prevSelected.includes(placeId)
						? prevSelected.filter((id) => id !== placeId)
						: [...prevSelected, placeId]
				);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {

				const response1 = await axios.post("/api/users/getuserbyid", {
					userid: user._id,
				});
				const data1 = response1.data[0];
				const flatPreferences = data1.favhotles.flat();
				setPreferences(flatPreferences);


				const response = await axios.get('/api/places/getallplaces');
				const data = response.data;
				const doPlaces = data.places.filter(place => place.category === 'Do' && place.city.toLowerCase().includes(searchValue.toLowerCase()));
				const eatPlaces = data.places.filter(place => place.category === 'Eat' && place.city.toLowerCase().includes(searchValue.toLowerCase()));
				const stayPlaces = data.places.filter(place => place.category === 'Stay' && place.city.toLowerCase().includes(searchValue.toLowerCase()));


				// Helper function to check if the place name contains any word from preferences
				const containsPreference = (placeName) => {
					const lowerCasePlaceName = placeName.toLowerCase();
					return preferences.some(preference => lowerCasePlaceName.includes(preference.toLowerCase()));
				};

				// Sort places based on whether their names match the preferences or not
				const sortPlacesByPreferences = (places) => {
					const matchingPlaces = places.filter(place => containsPreference(place.name));
					const remainingPlaces = places.filter(place => !containsPreference(place.name));
					return [...matchingPlaces, ...remainingPlaces];
				};

				// Sort and set the state for doPlaces, eatPlaces, and stayPlaces
				setDo(sortPlacesByPreferences(doPlaces));
				setEat(sortPlacesByPreferences(eatPlaces));
				setStay(sortPlacesByPreferences(stayPlaces));

				setLoading(false);

				console.log("Do Places:", doPlaces);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [preferences]);




	async function plan() {
		console.log(imageurl);

		const formData = new FormData();
		formData.append("image", imageurl);
		formData.append("userid", user._id);
		formData.append("tripname", tripName);
		formData.append("doselectedplace", JSON.stringify(doselectedplace));
		formData.append("eatselectedplace", JSON.stringify(eatselectedplace));
		formData.append("stayselectedplace", JSON.stringify(stayselectedplace));
		formData.append("tripnote", tripNote);
		formData.append("tripdays", tripDays);
		formData.append("tripbudget", tripBudget);

		try {
			const result = await axios.post("/api/trips/createtrip", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			console.log("Trip created:", result.data);
			window.location.href = "/trips";
		} catch (error) {
			console.log("Error creating trip:", error);
		}
	}


	const location = useLocation();
	const searchValue = location.state?.search || "";




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

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleModalCancel = () => {
		setIsModalVisible(false);
	};

	const handleModalOk = () => {
		setIsModalVisible(false);
		console.log("Trip Name:", tripName);
		plan();
	};




	return (
		<div className="Home">
			<Navbar></Navbar>
			<Slider01></Slider01>
			<div className="container plantrip">
				<h3>Do</h3>
				<Slider {...settings}>
					{doplace.map((place) => (
						<Col
							key={place._id}
							className={` location-card  ant-card  ${doselectedplace.includes(place._id) ? 'selected' : ''
								}`}
							onClick={() => handlePlaceSelect(place._id, 'Do')}
						>
							<Place place={place} />
						</Col>
					))}
				</Slider>

				<h3 className="h3placetrip">Eat</h3>
				<Slider {...settings}>
					{eatplace.map((place) => (
						<Col
							key={place._id}
							className={`location-card ant-card  ${eatselectedplace.includes(place._id) ? 'selected' : ''
								}`}
							onClick={() => handlePlaceSelect(place._id, 'Eat')}
						>
							<Place place={place} />
						</Col>
					))}
				</Slider>

				<h3 className="h3placetrip">Stay</h3>
				<Slider {...settings}>
					{stayplace.map((place) => (
						<Col
							key={place._id}
							className={`location-card ant-card ${stayselectedplace.includes(place._id) ? 'selected' : ''
								}`}
							onClick={() => handlePlaceSelect(place._id, 'Stay')}
						>
							<Place place={place} />
						</Col>
					))}
				</Slider>
				<div className="pt-create-btn">
					<Button onClick={showModal}>
						<h4>Plan Trip</h4>
					</Button>
				</div>
			</div>



			<Modal
				visible={isModalVisible}
				onOk={handleModalOk}
				onCancel={handleModalCancel}
			>
				<div className="trip-modal-label">Setup Your Trip</div>
				<Form.Item
					className="trip-modal-upload">
					<ImageUploader1 onImageUpload={onImageUpload} />

				</Form.Item>

				<Form.Item>
					<Input
						placeholder="What is your trip name?"
						value={tripName}
						maxLength={40}
						onChange={(e) => setTripName(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Input
						placeholder="Make a note for your trip"
						value={tripNote}
						maxLength={95}
						onChange={(e) => setTripNote(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Input
						placeholder="How many days?"
						value={tripDays}
						onChange={(e) => setTripDays(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Input
						placeholder="How much you want to spend?"
						value={tripBudget}
						onChange={(e) => setTripBudget(e.target.value)}
					/>
				</Form.Item>
			</Modal>

			<UserFooter />

		</div>
	);
}

export default PlanTrip;