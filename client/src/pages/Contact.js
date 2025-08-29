import React from 'react';

function Contact() {
    return (
        <div className="container mt-4">
            <div className="container mt-3">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <img src="images/logo.png" width="400" />
                    </div>

                    <div className="col">
                        <nav className="nav justify-content-end py-3 px-4 rounded">
                            <a className="nav-link" href="/">HOME</a>
                            <a className="nav-link" href="#">SERVICES</a>
                            <a className="nav-link" href="/about">ABOUT US</a>
                            <a className="nav-link active" href="/contact">CONTACT US</a>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h1>Get in Touch</h1>
                        <p className="lead">We'd love to hear from you! Reach out with any questions about our services or to discuss how we can work together.</p>
                    </div>
                </div>

                <div className="card shadow-lg contact-card">
                    <div className="card-body">
                        <div className="row text-center">
                            <div className="col">
                                <i className="bi bi-geo-alt-fill fs-1" style={{color: '#1A26A4;'}}></i>
                                <h5 className="mt-3">Address</h5>
                                <p className="mb-0">1528 E 97th St<br />Kansas City, MO 64131</p>
                            </div>
                            <div className="col">
                                <i className="bi bi-envelope-fill fs-1" style={{color: '#1A26A4;'}}></i>
                                <h5 className="mt-3">Email</h5>
                                <p className="mb-0"><a href="mailto:isaiahirwin59@gmail.com">Isaiahirwin59@gmail.com</a></p>
                            </div>
                            <div className="col">
                                <i className="bi bi-telephone-fill fs-1" style={{color: '#1A26A4;'}}></i>
                                <h5 className="mt-3">Phone</h5>
                                <p className="mb-0"><a href="tel:+13144637922">+1 (314) 463-7922</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;