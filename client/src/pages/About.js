import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
    return (
        <div className="container mt-3">
            <div className="row align-items-center">
                <div className="col-auto">
                    <img src="/images/logo.png" width="400" alt="Logo" />
                </div>
                <div className="col">
                    <nav className="nav justify-content-end py-3 px-4 rounded">
                        <a className="nav-link" href="/">HOME</a>
                        <a className="nav-link" href="#">SERVICES</a>
                        <a className="nav-link active" href="/about">ABOUT US</a>
                        <a className="nav-link" href="/contact">CONTACT US</a>
                    </nav>
                </div>
            </div>

            <div className="container d-flex flex-column align-items-center justify-content-center">
                <h1>Meet the Visionaries Behind Yvette</h1>
                {/* Team Section */}
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <div id="teamCarousel" className="carousel slide" data-bs-ride="carousel">
                                {/* Team Member 1 */}
                                <div className="carousel-item active">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/isaiah.jpeg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Isaiah Irwin</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Founder, CEO & Visionary</h6>
                                            <p className="card-text">Driving Innovation & Vision from Real-World Property
                                                Experience.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Team Member 2 */}
                                <div className="carousel-item">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/nat.jpeg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Nathaniel Irwin</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Co-Founder, CEO & Executive Management
                                            </h6>
                                            <p className="card-text">Orchestrating Execution Operations and Team Alignment.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Team Member 3 */}
                                <div className="carousel-item">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/lucas.jpeg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Lucas Mireles</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Co-Founder & Chief Revenue Officer
                                            </h6>
                                            <p className="card-text">Building Partnerships & Bringing Products/Services to the
                                                Market.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Team Member 4 */}
                                <div className="carousel-item">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/colton.jpeg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Colton French</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Co-Founder & Chief Operating Officer
                                            </h6>
                                            <p className="card-text">Orchestrating Execution & Maintaining Efficiency Company
                                                Wide.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Team Member 5 */}
                                <div className="carousel-item">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/zavier.jpeg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Zavier Vann</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Director of Customer Success</h6>
                                            <p className="card-text">Turning Engagement Into Long-Term Loyalty & Value.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Team Member 6 */}
                                <div className="carousel-item">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/talin.jpeg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Talin Kemp</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Co-Director of Customer Success</h6>
                                            <p className="card-text">Building Trust & Growth Through Resident-Centered
                                                Solutions.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Team Member 7 */}
                                <div className="carousel-item">
                                    <div className="card text-center shadow-lg team-card">
                                        <img src="images/team/rohit.jpg"
                                            className="team-card-img mx-auto d-block mt-3 rounded-circle" />
                                        <div className="card-body">
                                            <h5 className="card-title">Rohit Reddy Somireddy</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Chief Technology Officer & Lead
                                                Developer</h6>
                                            <p className="card-text">Leading Software Development with Passion & Precision.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Carousel controls */}
                                <button className="carousel-control-prev" role="button" data-bs-target="#teamCarousel"
                                    data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
                                </button>
                                <button className="carousel-control-next" role="button" data-bs-target="#teamCarousel"
                                    data-bs-slide="next">
                                    <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="lead text-center mb-4">
                    Discover our mission, vision, and team - watch our story unfold in the video below!
                </p>
                <div className="ratio ratio-16x9 mb-4" style={{ maxWidth: 800, width: '100%' }}>
                    <video controls>
                        <source src="/images/about.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <a href="/" className="btn btn-primary mb-4">Back to Home</a>
            </div>
        </div>
    );
}

export default About;