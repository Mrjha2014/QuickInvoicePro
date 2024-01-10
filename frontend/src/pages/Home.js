import { useAuth } from "../auth/AuthContext";
const Home = () => {
  const { user,isSuperUser } = useAuth();

  return (
    <div>
      Home Page
      <pre>{JSON.stringify(user, null, 2)}</pre>{" "}
      {/* Pretty print the user object */}
           <h3>Super User Status: {isSuperUser ? 'Yes' : 'No'}</h3>

    </div>
  );
};

export default Home;
