import React, { useEffect, useState } from 'react'
import './places.css'
import axios from 'axios';
import { Table, Modal, Form, Input } from 'antd';
import CreatePlace from './CreatePlace';
import Swal from 'sweetalert2'
import UserFooter from '../../../components/footer/UserFooter';

function Place() {

    const [activeTab, setActiveTab] = useState('create blog');
    const [places, setplaces] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()


    const [description, setdescription] = useState('')


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [PlaceToEdit, setPlaceToEdit] = useState(null);
    const [form] = Form.useForm();
    const [updatedBlogTitle, setUpdatedBlogTitle] = useState('');


    const [updatedPhonenumber, setUpdatedPhonenumber] = useState('');
    const [updatedCity, setUpdatedCity] = useState('');

    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedGoogleMaplink, setUpdatedGoogleMapLink] = useState('');

    const openEditModal = (place) => {
        setPlaceToEdit(place);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);

    };

    async function updatePlace(place) {
        openEditModal(place);
    }

    const handleEditSubmit = async () => {
        await editPlace(PlaceToEdit._id, updatedBlogTitle, updatedPhonenumber, updatedCity, updatedAddress, updatedGoogleMaplink);
        closeModal();
    };



    const columns = [


        {
            title: ' ID',
            dataIndex: '_id',
            key: '_id',
        },

        {
            title: 'Place Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: '9%',
            key: 'x',
            render: (_, places) => {
                return (
                    <button
                        className="btn-edit-places-by-seller"
                        onClick={() => updatePlace(places)}
                    >
                        Edit
                    </button>
                );
            }



        },
        {
            title: 'Delete',
            dataIndex: ' ',
            width: '9%',
            key: 'x',
            render: (_, places) => (
                <button className='btn-delete-places-by-seller' onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "Do you want to delete the place",
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        confirmButtonColor: '#4444AA',
                        cancelButtonColor: '#B8252A',
                        confirmButtonText: 'Yes, Place is Deleted!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deletePlace(places._id)
                            Swal.fire(
                                'Deleted!',
                                'Place has been deleted.',
                                'success'
                            ).then(result => {
                                window.location.href = 'http://localhost:3000/admin/places';
                            })
                        }
                    })
                }}>Delete</button>
            )

        }

    ];


    useEffect(() => {
        (async () => {

            try {

                setloading(true)
                const data = (await axios.get("/api/places/getallplaces")).data
                setplaces(data.places)

                setloading(false)


            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        })();
    }, []);


    async function editPlace(_id, updatedBlogTitle, updatedPhonenumber, updatedCity, updatedAddress, updatedGoogleMaplink) {
        try {
            await axios.patch('/api/places/editblog', {
                _id,
                title: updatedBlogTitle,
                description: description,
                phonenumber: updatedPhonenumber,
                city: updatedCity,
                address: updatedAddress,
                googlemaplink: updatedGoogleMaplink,



            });
            console.log("Place Updated Successfully");

            const data = (await axios.get("/api/places/getallplaces")).data;
            setplaces(data.places);
        } catch (error) {
            console.log(error);
        }
    }



    async function deletePlace(_id) {
        try {
            const res = (await axios.patch('/api/places/deleteplace', { _id })).data;
            console.log("Place Deleted Successfully");
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        (async () => {

            try {

                setloading(true)
                const data = (await axios.get("/api/places/getallplaces")).data
                setplaces(data.places)
                setloading(false)


            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        })();
    }, []);
    return (
        <div className='seller-central-places'>
            <div className='seller-central-places-container'>

                <div className="seller-central-places-tab">

                    <div
                        className={`seller-central-create-blog-tab-container ${activeTab === 'create blog' ? 'active' : ''}`}
                        onClick={() => setActiveTab('create blog')}
                    >
                        <span className='seller-central-tab-text-create-blog'>Create Place</span>
                    </div>

                    <div
                        className={`seller-central-places-tab-container ${activeTab === 'blog' ? 'active' : ''}`}
                        onClick={() => setActiveTab('blog')}
                    >
                        <span className='seller-central-tab--text-places'>Places</span>
                    </div>
                </div>
                {activeTab === 'create blog' && (
                    <div className='seller-central-create-places-sellers'>
                        <CreatePlace />
                    </div>
                )}
                {activeTab === 'blog' && (
                    <div className='seller-central-table-places-sellers'>
                        <Table
                            columns={columns}
                            dataSource={places}
                            className='seller-cental-table-for-blog'
                            rowKey="_id"
                            footer={() => <div className="no-of-places">{`Total  ${places.length} places `}</div>} />
                    </div>
                )}
            </div>
            <Modal

                visible={isModalVisible}
                onCancel={closeModal}
                onOk={handleEditSubmit}
                wrapClassName='editblogmodal'
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Blog Title"
                        name="blogTitle"
                        initialValue={PlaceToEdit ? PlaceToEdit.name : ''}
                    >
                        <Input
                            onChange={(e) => setUpdatedBlogTitle(e.target.value)}
                            placeholder="Enter Place title"
                        />
                    </Form.Item>

                    <Form.Item
                        className='userp-help-namebox-conatiner-p'
                        label="Discription:"
                        name="description"
                        initialValue={PlaceToEdit ? PlaceToEdit.description : ''}
                    >
                        <Input.TextArea showCount maxLength={1200} className="userp-helpmsg-custom-input"
                            value={description}
                            onChange={(e) => { setdescription(e.target.value) }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phonenumber"
                        initialValue={PlaceToEdit ? PlaceToEdit.phonenumber : ''}
                    >
                        <Input
                            onChange={(e) => setUpdatedPhonenumber(e.target.value)}
                            placeholder="Enter Phone Number"
                        />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        initialValue={PlaceToEdit ? PlaceToEdit.city : ''}
                    >
                        <Input
                            onChange={(e) => setUpdatedCity(e.target.value)}
                            placeholder="Enter Place title"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        initialValue={PlaceToEdit ? PlaceToEdit.address : ''}
                    >
                        <Input
                            onChange={(e) => setUpdatedAddress(e.target.value)}
                            placeholder="Enter Address"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Google Map Link"
                        name="googlemaplink"
                        initialValue={PlaceToEdit ? PlaceToEdit.googlemaplink : ''}
                    >
                        <Input
                            onChange={(e) => setUpdatedGoogleMapLink(e.target.value)}
                            placeholder="Enter Google Map Link"
                        />
                    </Form.Item>


                </Form>
            </Modal>
            <UserFooter />
        </div>
    )
}

export default Place
