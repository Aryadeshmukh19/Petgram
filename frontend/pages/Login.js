import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Updated fancy styles

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/home");
            } else {
                throw new Error(data.detail || "Login failed");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            {/* Left panel */}
            <div className="left-panel">
                <h1>🐾 PetGram</h1>
                <p>Where pets shine bright and tails never stop wagging 🐶✨</p>
            </div>

            {/* Right panel (login form) */}
            <div className="right-panel">
                <div className="form-box">
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit">Login</button>
                    </form>
                    <div className="form-footer">
                        Don't have an account?{" "}
                        <span onClick={() => navigate("/register")}>
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
