import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
import User from "../components/user/User";

function UserPage({ user }) {
  return (
    <Dashboard user={user}>
      <User user={user} />
    </Dashboard>
  );
}

export default UserPage;
