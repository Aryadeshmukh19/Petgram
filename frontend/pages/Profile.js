import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Fetch user details when the page loads (assuming user ID is 1 for now)
    fetch("http://127.0.0.1:8000/user/1")
      .then((res) => res.json())
      .then((data) => setUser({ name: data.name, email: data.email, password: "" }))
      .catch((err) => console.error("Error fetching user details:", err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/update-profile/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Profile Updated Successfully! 🎉");
      } else {
        alert("Profile update failed! ❌");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" placeholder="New Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
