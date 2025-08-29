import React from 'react';

function Home() {
    return (
        <div className="container mt-4">
            <div className="container mt-3">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <img src="images/logo.png" width="400" />
                    </div>

                    <div className="col">
                        <nav className="nav justify-content-end py-3 px-3 rounded">
                            <a className="nav-link active" href="/">HOME</a>
                            <a className="nav-link" href="#">SERVICES</a>
                            <a className="nav-link" href="/about">ABOUT US</a>
                            <a className="nav-link" href="/contact">CONTACT US</a>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row g-4 mt-5">
                    {/* Mission Card */}
                    <div className="col">
                        <div className="card h-100 border-0 mission-card">
                            <div className="card-body">
                                <h5 className="card-title">MISSION</h5>
                                <p className="card-text">Our mission is to empower residents, property managers, and businesses
                                    through innovative software and strategic marketing solutions that drive measurable results.
                                    We are committed to creating trust through transparency, streamlining operations with
                                    intuitive technology, and fostering sustainable growth for every partner we serve. By
                                    combining innovation, data-driven insights, and exceptional service, we aim to not only meet
                                    industry demands but redefine how properties and businesses connect with their communities
                                    and customers.</p>
                            </div>
                        </div>
                    </div>
                    {/* Vision Card */}
                    <div className="col">
                        <div className="card h-100 border-0 vision-card">
                            <div className="card-body">
                                <h5 className="card-title">VISION</h5>
                                <p className="card-text">Our vision is to become the leading force where technology and marketing
                                    intersect, shaping the future of property and business management with smarter, faster, and
                                    stronger solutions. We envision a world where seamless digital experiences create stronger
                                    relationships, greater efficiency, and lasting success for all stakeholders, from residents
                                    and property managers to enterprise clients. At Yvette Software, we don't just power
                                    business—we power transformation, growth, and innovation that inspires an entire industry to
                                    reach new heights.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;