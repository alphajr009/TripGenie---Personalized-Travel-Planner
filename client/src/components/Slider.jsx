import { useEffect, useState } from "react";
import { Button, Carousel, Col, Tooltip } from "antd";
import { Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/slider.css";


const Slider = () => {

	const location = useLocation();
	const searchValue1 = location.state?.search || "";
	const {t} = useTranslation();

	useEffect(() => {
		setSearchValue(searchValue1);
	}, [searchValue1]);

	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");
	const [showHoverAlert, setShowHoverAlert] = useState(false);

	const handleSearch = () => {
		if (searchValue.trim() === "") {
			setShowHoverAlert(true);
		} else {
			setShowHoverAlert(false);
			navigate(`/plantrip`, { state: { search: searchValue } });
		}
	};

	return (
		<div>
			<Carousel
				autoplay
				autoplaySpeed={5500}
				speed={900}
				effect="scrollx"
			>
				<div className="slider-images-01">

				</div>

				<div className="slider-images-02">

				</div>

				<div className="slider-images-03">

				</div>
			</Carousel>

			<Col className="slider-content" span={8}>
				<h1 className="text-align-center">{t("header")}</h1>
				<p>
					{t("headerDescription")}
				</p>

				<div className="search-bar">
					<Tooltip
						visible={showHoverAlert}
						title="Please enter your destination"
						placement="bottom"
					>
						<Input
							className="search-input"
							placeholder="Where you want to go ?"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							onPressEnter={handleSearch}
						/>
					</Tooltip>
					<Button type="primary" size="large" onClick={handleSearch}>
						{t("Search")}
					</Button>
				</div>
			</Col>

		</div>
	);
};

export default Slider;
