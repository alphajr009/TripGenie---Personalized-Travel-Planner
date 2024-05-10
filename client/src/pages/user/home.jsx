import React , {useState} from "react";
import { Col, Row, } from "antd";
import "../../css/Home.css";
import "../../index.css";
import "../../css/font.css"
import Navbar from "../../components/navbar/MainNavbar";
import Slider from "../../components/Slider";
import PlaceCard from "../../components/PlaceCard";
import Categories from "../../components/CategoriesCard";
import ExploreSlider from "../../components/ExploreSlider";
import UserFooter from "../../components/footer/UserFooter";
import { useTranslation } from "react-i18next";
import Menu from "./Menu";

function Home() {
	const {t} =  useTranslation()
	const [isIncreased, setIsIncreased] = useState(false);
	const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamilyIndex, setFontFamilyIndex] = useState(0);
	const [highlightLinks, setHighlightLinks] = useState(false); 

	const fontFamiliesone = ['font1', 'font2'];
	const fontFamilietwo = ['font3', 'font2'];
	const fontFamiliethree = ['font4', 'font2'];

	const toggleTheme = () => {
		setIsBlackAndWhite(prevState => !prevState);
	  };
	
	  const toggleFontSize = () => {
		setIsIncreased(prevState => !prevState);
	  };
	
	  const toggleMenu = () => {
		setIsMenuOpen(prevState => !prevState);
	  };
	
	  const toggleFontFamily = () => {
		setFontFamilyIndex(prevIndex => (prevIndex + 1) % fontFamiliesone.length, fontFamilietwo.length);
	  };
	
	  const toggleHighlightLinks = () => {
		setHighlightLinks(prevState => !prevState);
	  };

	return (
		<div className="Home">
			<div className={`home ${isBlackAndWhite ? 'black-and-white' : ''}`}>
			<Menu
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
				toggleFontSize={toggleFontSize}
				isIncreased={isIncreased}
				toggleTheme={toggleTheme}
				isBlackAndWhite={isBlackAndWhite}
				toggleFontFamily={toggleFontFamily}
				fontFamiliesone={fontFamiliesone}
				fontFamilietwo={fontFamilietwo}
				toggleHighlightLinks={toggleHighlightLinks} 
			/>
					<Navbar isBlackAndWhite={isBlackAndWhite} toggleTheme={toggleTheme}></Navbar>
					<Slider toggleFontSize={toggleFontSize}
							isIncreased={isIncreased}
							toggleFontFamily={toggleFontFamily}
							fontFamilyIndex={fontFamilyIndex}
							toggleMenu={toggleMenu}></Slider>
					<h2 className="text-align-center" style={{ fontSize: isIncreased ? '40px' : '35px', fontFamily: fontFamilietwo[fontFamilyIndex] }}>
						{t("greeting")}
					</h2>
					<Row className="main-container-padding">


						<Col className="location-card" span={22} >
							<ExploreSlider />
						</Col>

					</Row>
					<h2 className="text-align-center" style={{ fontSize: isIncreased ? '40px' : '35px', fontFamily: fontFamilietwo[fontFamilyIndex] }}>{t("Categories")}</h2>
					<Categories></Categories>
					<UserFooter />
			</div>
		</div>
	);
}

export default Home;
