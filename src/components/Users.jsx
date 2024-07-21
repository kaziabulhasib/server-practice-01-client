import axios from "axios";
import { useState } from "react";
// import { toast } from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const notify = () => toast("Wow so easy!");
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your file has been deleted.",
            //   icon: "success",
            // });
            toast.success("🦄 Wow so easy!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        });
      }
    });
  };

  // // handle details
  // const handleDetails = (id) => {
  //   console.log(id);
  // };

  // handle update
  const handleUpdate = (id) => {
    console.log(id);
  };
  return (
    <div>
      <Link to='/'>Home</Link>
      <h1 className='text-3xl my-8 underline '>Users:{users.length}</h1>
      {users.map((user) => (
        <div
          className='flex gap-8 justify-center  items-center my-8'
          key={user._id}>
          <h1>{user.name} </h1>

          <h1> {user.email}</h1>
          <button
            className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80'
            onClick={() => handleDelete(user._id)}>
            Delete
          </button>
          <Link to={`/users/${user._id}`}>
            {" "}
            <button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
              Details
            </button>
          </Link>
          <button
            onClick={() => handleUpdate(user._id)}
            className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
            Update
          </button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </div>
      ))}
    </div>
  );
};

export default Users;
