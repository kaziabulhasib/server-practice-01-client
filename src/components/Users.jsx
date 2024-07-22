import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

// pagination related import
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons"; // for customizing icons
import { useEffect, useState } from "react"; // useState for storing data and useEffect for changing data on click
import "./styles.css"; // stylesheet

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  // pagination related state
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const n = 5;

  useEffect(() => {
    setFilterData(users.slice(page * n, (page + 1) * n));
  }, [users, page]);

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
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        });
      }
    });
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      <h1 className='text-3xl my-8 underline '>Users: {users.length}</h1>
      <div className='lg:h-[500px] h-[90vh]'>
        {filterData.map((user, index) => (
          <div
            className='flex gap-8 justify-center items-center my-8'
            key={user._id}>
            <h1>{page * n + index + 1}.</h1>
            <h1 className='w-1/5 '>{user.name} </h1>
            <h1 className='w-1/5'> {user.email}</h1>
            <button
              className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80'
              onClick={() => handleDelete(user._id)}>
              Delete
            </button>
            <Link to={`/users/${user._id}`}>
              <button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
                Details
              </button>
            </Link>
            <Link to={`/update/${user._id}`}>
              <button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
                Update
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className=' flex justify-center '>
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(users.length / n)}
          breakLabel='...'
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    </div>
  );
};

export default Users;
