import { useState, useEffect } from "react";
import Navbar from '../../components/navbar/MainNavbar'
import UserFooter from '../../components/footer/UserFooter'
import "../../css/location.css"
import { Button, Card, Col, Empty, Pagination, Row, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
import { FireOutlined } from "@ant-design/icons";


function Place({ place }) {

    const handleDelete = async (placeid) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {
            window.location.href = "/login";
            return;
        }

        try {
            const userId = user._id;
            await axios.post("/api/users/unsave", { placeId: placeid, userId });
            window.location.href = "/locations";

        } catch (error) {
            console.error("Error remove favplace:", error);
        }
    };




    return (
        <div>

            <Card
                hoverable={false}
                cover={<span >
                    <Tooltip title="Remove Location" placement="right">
                        <DeleteOutlined style={{ position: 'absolute', right: '0', marginTop: '5px', marginRight: '10px', fontSize: '20px', color: '#fff' }} onClick={() => handleDelete(place._id)} />

                    </Tooltip>
                    <img className='palce-card-image' src={`/uploads/${place._id}-0.jpg`} alt={place.name} />
                </span>}
            >
                <div className='place-card-p plan-trip-card '>
                    <p>{place.name}</p>


                    <Button onClick={() => window.open(`/place/${place._id}`, '_blank')}>View</Button>
                </div>
            </Card>

        </div>
    );
}

function Location() {
    const currentUser = localStorage.getItem("currentUser");
    const [favoriteLocations, setFavoriteLocations] = useState([]);
    const placesPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('currentUser'));

            if (user) {
                const userId = user._id;
                try {
                    const response = await axios.get(`/api/users/getfavlocations?userId=${userId}`);
                    const data = response.data.favoriteLocations;
                    setFavoriteLocations(data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    return (
        <div className='location-page'>
            <Navbar />
            <div className="location-p-content">
                {favoriteLocations.length === 0 ? (
                    <div className="no-favorite-locations">
                        <Empty
                            image={<FireOutlined />}
                            imageStyle={{ height: 60 }}
                            description={
                                <span>
                                    <h6>Here are 3 simple steps to get you started:</h6>
                                    <div className="location-step-txt"> 1. Search for a location to plan your trip</div>
                                    <div className="location-step-txt">2. Tap the fire icon when you find a location you like</div>
                                    <div className="location-step-txt">3. You'll find everything you've saved here</div>
                                </span>
                            }
                        >
                            <Button type="primary" onClick={() => window.location.href = "/home"}>Start Searching</Button>
                        </Empty>
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {favoriteLocations
                            .slice((currentPage - 1) * placesPerPage, currentPage * placesPerPage)
                            .map(place => (
                                <Col key={place.id} span={6} className='place-card'>
                                    <Place place={place} />
                                </Col>
                            ))}
                    </Row>
                )}
                <div className="pagnition">
                    <Pagination
                        current={currentPage}
                        pageSize={placesPerPage}
                        total={favoriteLocations.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showQuickJumper
                    />
                </div>
            </div>
            <UserFooter />
        </div>
    )
}


export default Location