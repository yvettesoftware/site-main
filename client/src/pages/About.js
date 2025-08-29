import Navigation from '../components/Navigation';
import Carousel from 'react-bootstrap/Carousel'

const teamMembers = [
    {
        name: "Isaiah Irwin",
        title: "Founder, CEO & Visionary",
        desc: "Driving Innovation & Vision from Real-World Property Experience.",
        img: "/images/team/isaiah.jpeg"
    },
    {
        name: "Nathaniel Irwin",
        title: "Co-Founder, CEO & Executive Management",
        desc: "Orchestrating Execution Operations and Team Alignment.",
        img: "/images/team/nat.jpeg"
    },
    {
        name: "Lucas Mireles",
        title: "Co-Founder & Chief Revenue Officer",
        desc: "Building Partnerships & Bringing Products/Services to the Market.",
        img: "/images/team/lucas.jpeg"
    },
    {
        name: "Colton French",
        title: "Co-Founder & Chief Operating Officer",
        desc: "Orchestrating Execution & Maintaining Efficiency Company Wide.",
        img: "/images/team/colton.jpeg"
    },
    {
        name: "Zavier Vann",
        title: "Director of Customer Success",
        desc: "Turning Engagement Into Long-Term Loyalty & Value.",
        img: "/images/team/zavier.jpeg"
    },
    {
        name: "Talin Kemp",
        title: "Co-Director of Customer Success",
        desc: "Building Trust & Growth Through Resident-Centered Solutions.",
        img: "/images/team/talin.jpeg"
    },
    {
        name: "Rohit Reddy Somireddy",
        title: "Chief Technology Officer & Lead Developer",
        desc: "Leading Software Development with Passion & Precision.",
        img: "/images/team/rohit.jpg"
    }
];

function About() {
    return (
        <div className="bg-main-background">
            <Navigation />
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <h1 className="m-4">Meet the Visionaries Behind Yvette</h1>
                {/* Team Carousel */}
                <div style={{ maxWidth: 500 }}>
                    <Carousel>
                        {teamMembers.map((member, idx) => (
                            <Carousel.Item key={idx}>
                                <div className="card text-center team-card">
                                    <img
                                        src={member.img}
                                        className="team-card-img mx-auto d-block mt-3 rounded-circle"
                                        alt={member.name}
                                        style={{ width: 200, height: 200, objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{member.name}</h5>
                                        <h6 className="card-subtitle text-muted">{member.title}</h6>
                                        <p className="card-text mb-3">{member.desc}</p>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <p className="lead text-center m-4">
                    Discover our mission, vision, and team - watch our story unfold in the video below!
                </p>
                <div className="ratio ratio-16x9 mb-4" style={{ maxWidth: 800, width: '100%' }}>
                    <video controls className="rounded-4">
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