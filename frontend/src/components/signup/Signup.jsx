import { useState } from "react";
import style from "./signup.module.css";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [role,setRole] = useState("");
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
                    navigate('/complete-profile',{state:{data:res.data.User._id}});
                }else{
                    navigate('/');
                }
            }else{
                alert('User Already Exists please change the details');
                setUsername("");
                setPassword("");
                setEmail("");
                setName("");
                setRole("");
            }
        }).catch((err)=>{
            console.log(err);
        })
        
    }
    return (
        <div>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input type="text" placeholder="Name" required value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" placeholder="Username" reqiuired value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <input type="password" placeholder="Password" reqiuired value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type="email" placeholder="Email" reqiuired value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <select value={role} onChange={(e) => setRole(e.target.value)} required="required" >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="ShopOwner">Shop Owner</option>
                    <option value="Customer">Customer</option>
                </select>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}