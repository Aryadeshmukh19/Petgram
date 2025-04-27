import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { username, email, password };

        try {
            const response = await fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                navigate("/"); // ✅ This takes you back to Login
            } else {
                throw new Error(data.detail || "Registration failed");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Your PetGram Account</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p className="login-link">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
