import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import './App.css'
import Login from './pages/login';
import Signup from './pages/signup';
import { useState } from "react";

function App() {
 


  return (
    // <div className="max-w-5xl mx-auto p-5">
    //   <Signup />
    //   <Login/>

    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// const [users, setUser] = useState([]);
// const [search, setSearch] = useState("");

// useEffect(() => {
//   const fetchUser = async () => {
//     // try{
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await response.json();
//     console.log("infinit")
//     setUser(data);
//     // }

//   }
//   fetchUser();
// }, []);

// const filteredUser = users.filter((user) =>
//   user.name.toLowerCase().includes(search.toLocaleLowerCase())
// );
{/* <h1 className="text-3xl font-bold mb-5 text-center">user list</h1>
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border p-2 rounded-lg w-full mb-5'

      />
      <div className="grid md:grid-cols-2 gap-4">
        {filteredUser.map((user) => (
          <div key={user.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>{user.email}</p>
            <p className="text-gray-600">{user.company.name}</p>
          </div>
        ))}
      </div> */}