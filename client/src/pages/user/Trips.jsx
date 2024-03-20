import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/MainNavbar'
import UserFooter from '../../components/footer/UserFooter'
import axios from 'axios';
import { Button, Card, Col, Empty, Pagination, Row, Tooltip } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';




function Place({ trip }) {

    const handleDelete = async (tripid) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {
            window.location.href = "/login";
            return;
        }

        try {
            await axios.post("/api/trips/deletetrip", { _id: tripid });
            window.location.href = "/trips";

        } catch (error) {
            console.error("Error remove trip:", error);
        }
    };

    const doArray = JSON.parse(trip.do[0]);
    const eatArray = JSON.parse(trip.eat[0]);
    const stayArray = JSON.parse(trip.stay[0]);

    return (
        <div>

            <Card
                cover={<span >
                    <Tooltip title="Delete Trip" placement="right">
                        <DeleteOutlined style={{ position: 'absolute', right: '0', marginTop: '10px', marginRight: '10px', fontSize: '18px', color: '#fff' }} onClick={() => handleDelete(trip._id)} />

                    </Tooltip>
                    <img className='palce-card-image' src={`/uploads/${trip._id}.jpg`} alt={trip.tripname} />
                </span>}
                hoverable={false}

            >
                <div className='place-card-p plan-trip-card '>
                    <p>{trip.tripname}</p>
                    <div className='trip-card-note'>{trip.tripnote}</div>
                    <div className='trip-card-footer'>
                        <div className='trip-card-footer-item'>
                            <div className='trip-card-footer-item-txt'>{trip.tripdays} Days</div>
                        </div>

                        <div className='trip-card-footer-item'>
                            <div className='trip-card-footer-item-txt'>{trip.tripbudget}</div>
                        </div>

                        <div className='trip-card-footer-item'>
                            <div className='trip-card-footer-item-txt'>{doArray.length + eatArray.length + stayArray.length}  Sights</div>
                        </div>

                    </div>


                    <Button onClick={() => window.open(`/trip/${trip._id}`, '_blank')}>View</Button>
                </div>
            </Card>

        </div>
    );
}


function Trips() {

    const currentUser = localStorage.getItem("currentUser");

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]); const placesPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('currentUser'));

            if (user) {
                const userId = user._id;
                try {
                    const response = await axios.get(`/api/trips/getalltrips?userId=${userId}`);
                    const data = response.data;



                    setTrips(data);
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
        <div>

            <div className='location-page'>
                <Navbar />
                <div className="location-p-content">
                    {trips.length === 0 ? (
                        <div className="no-favorite-locations">
                            <Empty
                                image={<SearchOutlined />}
                                imageStyle={{ height: 60 }}
                                description={
                                    <span>
                                        <h6>Here are 4 simple steps to plan your trip:</h6>
                                        <div className="location-step-txt"> 1. Search for a location to plan your trip</div>
                                        <div className="location-step-txt">2. Select the Places you desired from Do,Eat,Stay</div>
                                        <div className="location-step-txt">3.Setup the Trip by enter the details</div>
                                        <div className="location-step-txt">4. You'll find everything you've saved here</div>
                                    </span>
                                }
                            >
                                <Button type="primary" onClick={() => window.location.href = "/home"}>Start Searching</Button>
                            </Empty>
                        </div>
                    ) : (
                        <Row gutter={[16, 16]}>
                            {trips
                                .slice((currentPage - 1) * placesPerPage, currentPage * placesPerPage)
                                .map(trip => (
                                    <Col key={trip.id} span={6} className='place-card'>
                                        <Place trip={trip} />
                                    </Col>
                                ))}
                        </Row>
                    )}
                    <div className="pagnition">
                        <Pagination
                            current={currentPage}
                            pageSize={placesPerPage}
                            total={trips.length}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            showQuickJumper
                        />
                    </div>



                </div>
                <UserFooter />
            </div>
        </div>
    )
}

export default Trips