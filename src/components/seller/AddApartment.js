import React, { useState, useContext } from 'react';
import '../css/Dashboard.css'
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert'
import "../css/BackGround.css"
import AlertContext from '../context/AlertContext'

export default function UpdateProfile() {
    const host = "http://localhost:5000";

    //it is for handle the state of Adding apartment
    const [addApartment, setaddApartment] = useState({ address: "", area: "", bedrooms: "", size: "", price: "" });
    //context api for alert message
    const context = useContext(AlertContext);
    const { addAlert } = context;  //// Destructuring alert and addAlert  from context api
    //state to maintain apartment type 
    const [type, setType] = useState("");

    //to navigate page
    const navigate = useNavigate();

    //function to Add apartment when the user click on add button
    const handleAddApartment = async (e) => {
        //this is to do not reload our page
        e.preventDefault();
        //convert area into lowercase
        let areaNEW = addApartment.area.toLowerCase();
        //API call to add the apartment in database
        const response = await fetch(`${host}/api/apartment/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ address: addApartment.address, area: areaNEW, type: type, bedrooms: addApartment.bedrooms, size: addApartment.size, price: addApartment.price })
        });
        const json = await response.json();
        if (json.success) {
            addAlert({
                type: 'success',
                msg: 'Added apartment Successfully'
            })
            navigate('/seller/dashboard')
        }
        else {
            addAlert({
                type: 'danger',
                msg: json.error
            })
        }
    }

    const onChange = (e) => {
        setaddApartment({ ...addApartment, [e.target.name]: e.target.value })
    }

    const setApartmentType = (e) => {
        setType(e.target.value)
    }

    return (
        <div className='backGround'>
            <Alert />
            <form onSubmit={handleAddApartment}>
                <div className='update-container'>
                    <div className='update-top bg-primary text-white'>Add Apartment </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Enter address</label>
                        <input type="text" className="form-control" id="name" name='address' value={addApartment.address} onChange={onChange} required minLength={15} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Enter area</label>
                        <input type="text" pattern="[a-zA-Z]*" className="form-control" id="name" name='area' placeholder="e.g., Guwahati" value={addApartment.area} onChange={onChange} required minLength={3} />
                    </div>
                    <select className="mb-3 form-select" aria-label="Default select example" onChange={setApartmentType} required>
                        <option value="">Select Type</option>
                        <option value="Rent">Rent</option>
                        <option value="Sale">Sale</option>
                    </select>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Enter no of bedrooms</label>
                        <input type="text" pattern="^[1-9]+[0-9]*$" className="form-control" id="name" name='bedrooms' placeholder="e.g., 1" value={addApartment.bedrooms} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Enter size(sqft.)</label>
                        <input type="text" pattern="^[1-9]+[0-9]*$" className="form-control" id="name" name='size' placeholder="e.g., 100" value={addApartment.size} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Enter Price( ₹)</label>
                        <input type="text" pattern="^[1-9]+[0-9]*$" className="form-control" id="name" name='price' placeholder="e.g., 1500₹" value={addApartment.price} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-success" style={{ marginTop: '20px', marginLeft: '40%' }}>Add</button>
                </div>
            </form>
        </div>
    )
}
