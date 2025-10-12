import { useGetAllUsersQuery } from "@/redux/features/userAPi";

const User = () => {

    const {data, isLoading, error} = useGetAllUsersQuery(undefined)
    console.log(data);


  return (
    <div>
      <h1>This is User component</h1>
    </div>
  );
};

export default User;
