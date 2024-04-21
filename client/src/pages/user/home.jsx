import React , {useState} from "react";
import { Col, Row, } from "antd";
import "../../css/Home.css";
import "../../index.css";
import Navbar from "../../components/navbar/MainNavbar";
import Slider from "../../components/Slider";
import PlaceCard from "../../components/PlaceCard";
import Categories from "../../components/CategoriesCard";
import ExploreSlider from "../../components/ExploreSlider";
import UserFooter from "../../components/footer/UserFooter";
import { useTranslation } from "react-i18next";

function Home() {
	const {t} =  useTranslation()
	const [isIncreased, setIsIncreased] = useState(false);
	const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamilyIndex, setFontFamilyIndex] = useState(0);
	const [highlightLinks, setHighlightLinks] = useState(false); 

	return (
		<div className="Home">
			<Navbar></Navbar>
			<Slider></Slider>
			<h2 className="text-align-center">{t("greeting")}</h2>
			<Row className="main-container-padding">


				<Col className="location-card" span={22} >
					<ExploreSlider />
				</Col>

			</Row>
			<h2 className="text-align-center">{t("Categories")}</h2>
			<Categories></Categories>
			<UserFooter />
		</div>
	);
}

export default Home;
