import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Col, Pagination, Row } from 'antd';
import { ScaleLoader } from 'react-spinners';
import '../css/Categories.css';

function Place({ place }) {
    return (
        <div>
            <Link to={`/place/${place._id}`}>
                <Card
                    span={6}
                    hoverable
                    cover={<img className='palce-card-image' src={`/uploads/${place._id}-0.jpg`} alt={place.name} />}
                >
                    <div className='place-card-p'>
                        <p>{place.name}</p>
                    </div>
                </Card>
            </Link>
        </div>
    );
}

function Stay() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);

    const placesPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/places/getallplaces');
                const data = response.data;
                const stayPlaces = data.places.filter(place => place.category === 'Stay');
                setPlaces(stayPlaces);
                setFilteredPlaces(stayPlaces);
                setTimeout(() => {
                    setIsLoading(false);
                    setShowSpinner(false);
                }, 1500);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setShowSpinner(false);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {showSpinner ? (
                <div className="spinner-container">
                    <ScaleLoader color="#2e96d6" />
                </div>
            ) : (
                <div className="blogscreen-content">
                    <Row >
                        {filteredPlaces
                            .slice((currentPage - 1) * placesPerPage, currentPage * placesPerPage)
                            .map(place => (
                                <Col key={place.id} span={6} className='palce-card' >
                                    <Place place={place} />
                                </Col>
                            ))}
                    </Row>
                </div>
            )}

            <div className="pagnition">
                <Pagination
                    current={currentPage}
                    pageSize={placesPerPage}
                    total={filteredPlaces.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}

export default Stay;
