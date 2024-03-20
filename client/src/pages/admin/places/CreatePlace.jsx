import React, { useState } from 'react';
import './createplace.css';
import { Input, Form, Select, notification } from 'antd';
import axios from 'axios';
import ImageUploader from '../../../components/ImageUploader';
import UserFooter from '../../../components/footer/UserFooter';

function CreatePlace() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [imageurls, setImageurls] = useState(Array(7).fill(''));

    const onImageUpload = (index, imageFile) => {
        setImageurls((prevImageurls) => {
            const newImageurls = [...prevImageurls];
            newImageurls[index] = imageFile;
            console.log(`Image at index ${index}:`, imageFile);
            return newImageurls;
        });
    };

    const { Option } = Select;

    const [selectedCategory, setSelectedCategory] = useState('');

    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [googlemaplink, setgooglemaplink] = useState('')
    const [openingtime, setopeningtime] = useState('')
    const [closingtime, setclosingtime] = useState('')
    const [city, setcity] = useState('')



    const categories = [
        'Do',
        'Eat',
        'Stay',

    ];

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    async function createblog() {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", selectedCategory);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("googlemaplink", googlemaplink);
        formData.append("openingtime", openingtime);
        formData.append("closingtime", closingtime);
        formData.append("city", city);




        imageurls.forEach((image, index) => {
            if (image) {
                formData.append("images", image, `${user._id}-${index}.jpg`);
            }
        });

        console.log('imageurls:', imageurls);


        try {
            const response = await axios.post("/api/places/addplace", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.status);

            notification.success({
                message: "Success",
                description: "Place Added Successfully!",
            });

            setTimeout(() => {
                window.location.href = "/admin/places";
            }, 1000);


        } catch (error) {
            if (error.response) {
                console.log("Error1:");
            } else {
                console.log("Error2:");
            }
        }
    }


    return (
        <div>

            <div className='slide2'>
                <div className="crb-slide2-content-wrapper">

                    <div className="crb-s2-header">
                        <h1>Upload your images:</h1>
                    </div>
                    <div className="crb-s2-images-upload">
                        <div className="scrb-s2-iu-wrapper">
                            {Array(7)
                                .fill(0)
                                .map((_, index) => (
                                    <ImageUploader key={index} index={index} onImageUpload={onImageUpload} />
                                ))}
                        </div>
                    </div>


                    <Form>
                        <div className="">
                            <div className='categort-align'>
                                <Form.Item
                                    className='-conatiner-p'
                                    label="Category:"
                                    name="category"
                                    rules={[{ required: true, message: 'Please input your Title!' }]}>
                                    <Select
                                        className="createblog-category-select"
                                        placeholder="Category"
                                        style={{ width: '175px', marginLeft: '30px' }}
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        {categories.map(category => (
                                            <Option key={category}>
                                                {category}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="align-set">

                                <div className="aligh-items-cplaces">
                                    <div className="-container">
                                        <Form.Item
                                            className='-conatiner-p'
                                            label="Title:"
                                            name="title"
                                            rules={[{ required: true, message: 'Please input your Title!' }]}
                                        >
                                            <Input className="createblog-dis-custom-input"
                                                value={title}
                                                onChange={(e) => { settitle(e.target.value) }}
                                                maxLength={85}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="userp-help-messagebox">
                                    <div className="userp-help-namebox-container">
                                        <Form.Item
                                            className='userp-help-namebox-conatiner-p'
                                            label="Discription :"
                                            name="description"
                                            rules={[{ required: true, message: 'Please input your blog discription!' }]}
                                        >
                                            <Input.TextArea style={{ height: "245px", width: "626px" }} maxLength={1300} className="userp-helpmsg-custom-input"
                                                value={description}
                                                onChange={(e) => { setdescription(e.target.value) }} />
                                        </Form.Item>


                                    </div>
                                </div>

                                <div className="-container">
                                    <Form.Item
                                        className='-conatiner-p'
                                        label="Phone Number:"
                                        name="phone"
                                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                                    >
                                        <Input className="createblog-dis-custom-input "
                                            value={phone}
                                            onChange={(e) => { setphone(e.target.value) }}
                                            maxLength={85}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="-container">
                                    <Form.Item
                                        className='-conatiner-p'
                                        label="City"
                                        name="city"
                                        rules={[{ required: true, message: 'Please input your Address!' }]}
                                    >
                                        <Input className="createblog-dis-custom-input"
                                            value={city}
                                            onChange={(e) => { setcity(e.target.value) }}
                                            maxLength={85}
                                        />
                                    </Form.Item>
                                </div>


                                <div className="-container">
                                    <Form.Item
                                        className='-conatiner-p'
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Please input your Address!' }]}
                                    >
                                        <Input className="createblog-dis-custom-input"
                                            value={address}
                                            onChange={(e) => { setaddress(e.target.value) }}
                                            maxLength={85}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="-container">
                                    <Form.Item
                                        className='-conatiner-p'
                                        label="Google Map Link"
                                        name="googlemaplink"
                                        rules={[{ required: true, message: 'Please input your Google Map Link!' }]}
                                    >
                                        <Input className="createblog-dis-custom-input"
                                            value={googlemaplink}
                                            onChange={(e) => { setgooglemaplink(e.target.value) }}
                                            maxLength={85}
                                        />
                                    </Form.Item>
                                </div>


                                <div className="-container">
                                    <Form.Item
                                        className='-conatiner-p'
                                        label="Opening time"
                                        name="openingtime"
                                        rules={[{ required: true, message: 'Please input Opening time!' }]}
                                    >
                                        <Input className="createblog-dis-custom-input"
                                            value={openingtime}
                                            onChange={(e) => { setopeningtime(e.target.value) }}
                                            maxLength={85}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="-container">
                                    <Form.Item
                                        className='-conatiner-p'
                                        label="Closing time"
                                        name="closingtime"
                                        rules={[{ required: true, message: 'Please input Closing time!' }]}
                                    >
                                        <Input className="createblog-dis-custom-input"
                                            value={closingtime}
                                            onChange={(e) => { setclosingtime(e.target.value) }}
                                            maxLength={85}
                                        />
                                    </Form.Item>
                                </div>
                            </div>


                        </div>
                    </Form>
                    <div className="crb-s2-blog-create-btn">
                        <button className='crb-slide1-roomslect-down-btn' onClick={createblog}>Create</button>
                    </div>
                </div>

            </div>
            <UserFooter />
        </div>
    )
}

export default CreatePlace