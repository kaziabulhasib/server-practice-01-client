import axios from "axios";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const user = useLoaderData();
  // const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log("updated user", updatedUser);
    // console.log(user);
    axios
      .put(`http://localhost:8000/update/${user._id}`, updatedUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire("User Updated Successfully!");
          navigate("/users");
        }
      });
  };

  return (
    <div>
      <h1>Update user : {user.name}</h1>
      <form onSubmit={handleUpdate}>
        <input
          defaultValue={user.name}
          className='  mt-2 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700  '
          type='text'
          name='name'
          placeholder='Name'
          id=''
        />{" "}
        <br />
        <input
          defaultValue={user.email}
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
        <p>
          Back to{" "}
          <Link to='/users'>
            <span className='text-sm text-blue-400 underline'>Users Page </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UpdateUser;
