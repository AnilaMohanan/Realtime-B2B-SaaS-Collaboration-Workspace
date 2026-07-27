import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>

      {user ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            width: "350px",
          }}
        >
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          {user.role && (
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          )}
        </div>
      ) : (
        <p>No user found. Please login.</p>
      )}
    </div>
  );
};

export default Profile;