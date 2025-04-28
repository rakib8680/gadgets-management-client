import { Outlet } from "react-router-dom";

const Main = () => {
  return (
     <div>
        {/* sidebar here  */}
         <Outlet/>
         {/* main content here  */}
     </div>
  )
};

export default Main;