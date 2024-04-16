import style from './home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
export default function Home(){
    const navigate = useNavigate();
    const [uname,setUname] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/api/v1/user/signin",{uName:uname,uPass:password})
        .then((res)=>{
            console.log(res);
            if(res.data.User.role === 'Admin'){
                navigate('/admin',{state:{data:res.data.User}});
            }else if(res.data.User.role === 'ShopOwner'){
                navigate('/shop',{state:{data:res.data.User}})
            }else if(res.data.User.role === 'Customer'){
                navigate('/user',{state:{data:res.data.User}});
            }
        }).catch((err)=>{console.log(err)});
    }
    return(


        <div className={style.container}>
            <div className={style.form_container}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input type="text" placeholder='UserName' value={uname} onChange={(e)=>{setUname(e.target.value)}} required className={style.input} />
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required className={style.input} />
                    <input type="submit" value="Signin" className={style.button} />
                </form>
                <div className={style.signup}>
                    
                    New user? Create a new account <Link to="/Signup">Sign up</Link>
                    
                </div>
            </div>
        </div>
    )
}
