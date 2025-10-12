import UserList from "@/components/users/UserList";
import { useGetAllUsersQuery } from "@/redux/features/userAPi";

const User = () => {
  return (
    <UserList
      title="All Users"
      subtitlePrefix="Manage user accounts and permissions"
      fetchHook={useGetAllUsersQuery}
      emptyStateMessage="No users found"
      emptyStateSubMessage={() => "Try adjusting your search or filters"}
    />
  );
};

export default User;
