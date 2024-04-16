import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
export default function Completeprofile(){
    const navigate = useNavigate();
    const data = Cookies.get("UserId");
    const [formData, setFormData] = useState({
        shopName: "",
        ownerId: data,
        shopNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        gstNumber: "",
        shopImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, shopImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post(
                "http://localhost:3001/api/v1/shop/register",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response.data.flag) {
                navigate("/shop-owner");
            } else {
                alert("Shop exists! Register a new shop.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error - show a user-friendly message
            alert("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Shop Name"
                required
            />
            <input
                type="text"
                name="shopNumber"
                value={formData.shopNumber}
                onChange={handleChange}
                placeholder="Shop Number"
                required
            />
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
            />
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
            />
            <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
            />
            <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                required
            />
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
            />
            <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="GST Number"
                required
            />
            <input type="file" name="shopImage" onChange={handleFileChange} required />
            <input type="submit" value="Complete Profile" />
        </form>
    )
}