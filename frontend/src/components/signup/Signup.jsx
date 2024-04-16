import { useState } from "react";
import style from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const body = {
            Name:name,
            Username:username,
            Password:password,
            Email:email,
            Role:role
        }
        axios.post("http://localhost:3001/api/v1/user/signup",body)
        .then((res)=>{
            if(!res.data.flag){
                if(res.data.User.role==='ShopOwner'){
                    Cookies.set("UserId",res.data.User._id,{ expires: 2 });
                    navigate('/complete-profile');
                } else {
                    navigate('/');
                }
                // You can add a success message here if needed
            } else {
                setError('User already exists. Please change the details.');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (


        <div className={style.container}>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input type="text" placeholder="Name" required value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" placeholder="Username" required value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type="email" placeholder="Email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="ShopOwner">Shop Owner</option>
                    <option value="Customer">Customer</option>
                </select>
                <input type="submit" value="Sign Up" />
            </form>
            {error && <p className={style.error}>{error}</p>}
        </div>
    )
}
