import "../landing.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <header className="navbar">
        <div className="logo">AaraDen</div>
        <nav>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-text">
          <p className="soon">Record. Review. Improve.</p>
          <h1>Dental Calls Done Right.<br /><span>Empower Your Front Desk</span></h1>
              <Link to="/login" className="btn">Visit AaraDen</Link>
                        <div className="ratings">
            ⭐ Loved by Dental Teams • Data-Driven Staff Training • Real Results from Real Calls
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
