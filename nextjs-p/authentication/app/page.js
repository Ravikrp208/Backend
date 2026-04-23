import React, { Suspense } from "react";
import Login from "./login/login"; // correct path & capital letter

const Page = () => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    //   <Login />
    // </Suspense>
    <div>
      <Login/>
    </div>
  );
};

export default Page;
