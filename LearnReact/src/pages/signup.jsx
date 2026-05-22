import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }

            )
            const data = await response.json();
            alert(data.message || "signup success...!");
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex justify-center">

            <form action="" onSubmit={handleSubmit}>
                <h1 className="mb-5 justify-center">Sign up</h1>
                <input name="name" type="text" onChange={handleChange} placeholder="Enter You Name" className="border rounded mb-4 p-1" /> <br />
                <input name="email" type="email" onChange={handleChange} placeholder="Enter You Email" className="border rounded mb-4 p-1" /> <br />
                <input name="password" type="password" onChange={handleChange} placeholder="Enter You Password" className="border rounded mb-4 p-1" /> <br />

                <button className="border rounded p-1">sign up</button>
                <p className="mt-2">you Already have an accont ?
                    <Link to={"/"} >login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;