import { useLoaderData } from "react-router-dom";

const UserDetails = () => {
  const user = useLoaderData();
  return (
    <div>
      <h1 className='text-2xl'>This is Details of : {user.name}</h1>
    </div>
  );
};

export default UserDetails;
