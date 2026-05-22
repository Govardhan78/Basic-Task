import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigation = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })
    }
    console.log(userData, "-------");
    const hanldeSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData)
                }

            )
            const data = await response.json();
            alert(data.message || "login success...!");
            navigation("/signup")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div style={{ justifyContent: "center", textAlign: "center" }} className="flex">
                <form onSubmit={hanldeSubmit} style={{ width: 500, border: "2px solid red" }}>
                    <h1 className="mb-2.5" >Login Page</h1>
                    <div>
                        <input type="text" name="email" onClick={handleChange} placeholder="Enter the Email" className="mb-2.5 border" /><br />
                        <input type="text" name="password" onClick={handleChange} placeholder="Enter the Password" className="mb-2.5 border" />
                    </div>
                    <button type="submit" className="mb-2.5 border">Submit</button>
                </form>
            </div>
        </>
    )
}
export default Login;