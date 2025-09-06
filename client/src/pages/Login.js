import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [userID, setUserID] = useState("");
    const [hasOnboarding, setHasOnboarding] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Both email and password are required.");
            setSuccess(false);
        } else {
            setError("");
            try {
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    setSuccess(true);
                    setUserID(data.userID);
                    localStorage.setItem('userID', data.userID);

                    // Check if onboarding exists for this user
                    const onboardingRes = await fetch('http://localhost:5000/api/onboarding/check', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userID: data.userID })
                    });
                    if (onboardingRes.ok) {
                        const onboardingData = await onboardingRes.json();
                        if (onboardingData.onboarding_progress === "Complete") {
                            setTimeout(() => {
                                window.location.href = "/dashboard";
                            }, 1000);
                            return;
                        }
                        setHasOnboarding(true);
                    } else {
                        setHasOnboarding(false);
                    }
                } else {
                    setError(data.error || "Login failed");
                    setSuccess(false);
                }
            } catch (err) {
                console.error(err);
                setError("Server error");
                setSuccess(false);
            }
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
                <h2 className="mb-4 text-center">Project DomuIQ</h2>
                {success ? (
                    <div className="text-center" style={{ position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, right: 0, fontSize: "0.9rem", color: "#888" }}>
                            UserID: {userID}
                        </div>
                        <div className="alert alert-success text-center">Login successful!</div>
                        {hasOnboarding ? (
                            <>
                                <div className="mb-3">
                                    Looks like you have already started onboarding. Please continue using the button below.
                                </div>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => navigate('/onboarding')}
                                >
                                    Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    Next, you will be presented with a questionnaire for the onboarding process.
                                </div>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => navigate('/onboarding')}
                                >
                                    Start
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
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
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="remember"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="remember">
                                    Remember me
                                </label>
                            </div>
                            {error && <div className="alert alert-danger py-1">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                        </form>
                        <div className="text-center">
                            <span className="small">Don't have an account? </span>
                            <NavLink to="/register" className="small">Register</NavLink>
                        </div>
                        <div className="text-center">
                            <span className="small">Forgot password? </span>
                            <NavLink to="#" className="small">Reset</NavLink>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;