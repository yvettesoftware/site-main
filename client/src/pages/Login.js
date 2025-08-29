import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Username and password are required.");
        } else {
            setError("");
            // Proceed with login logic here
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
                <h2 className="mb-4 text-center">Project DomuIQ</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
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
                    {error && <div className="alert alert-danger py-1">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                </form>
                <div className="d-flex justify-content-between">
                    <a href="#" className="small">Don't have an account?</a>
                    <a href="#" className="small">Forgot password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;