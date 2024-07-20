import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./App.css";
// import axios from "axios";
import axios from "axios";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    axios.post("http://localhost:8000/users", user).then((res) => {
      console.log(res.data);
      if (res.data) {
        Swal.fire("User added successfully.");
        form.reset();
      }
    });
  };
  return (
    <>
      <div className='flex justify-center gap-8'>
        <h1 style={{ color: "red" }}>Simple Crud operation</h1>
        <Link to='/users'>Users</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className='  mt-2 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700  '
          type='text'
          name='name'
          placeholder='Name'
          id=''
        />{" "}
        <br />
        <input
          className='  mt-2 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700  '
          type='text'
          name='email'
          placeholder='Email'
          id=''
        />{" "}
        <br />
        <input
          className=' my-6 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'
          type='submit'
          value='Submit'
        />{" "}
      </form>
    </>
  );
}

export default App;
