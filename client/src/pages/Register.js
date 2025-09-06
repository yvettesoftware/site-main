import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            setSuccess(false);
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setSuccess(false);
        } else {
            setError("");
            try {
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    setSuccess(true);
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setError(data.error || 'Registration failed');
                    setSuccess(false);
                }
            } catch (err) {
                console.error(err);
                setError('Server error');
                setSuccess(false);
            }
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
                <h2 className="mb-4 text-center">Register</h2>
                {success ? (<div className="alert alert-success text-center">
                    Registration successful! Redirecting to login... </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {error && <div className="alert alert-danger py-1">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
                        </form>
                        <div className="text-center">
                            <span className="small">Already have an account? </span>
                            <NavLink to="/login" className="small">Login</NavLink>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Register;