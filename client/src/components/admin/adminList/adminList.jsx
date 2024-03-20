import React from 'react';
import './adminList.css';
import { faHotel, faUsers, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function adminList({ setActiveTab, activeTab }) {
    return (
        <div className='list_container'>
            <div className="listitem">

                <div
                    className={`adminlistItem ${activeTab === 'places' ? 'active' : ''}`}
                    onClick={() => setActiveTab('places')}
                >
                    <FontAwesomeIcon icon={faHotel} />
                    <h5>Places</h5>
                </div>

                <div
                    className={`adminlistItem ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <FontAwesomeIcon icon={faUsers} />
                    <h5>Users</h5>
                </div>


            </div>
        </div>
    );
}

export default adminList;
