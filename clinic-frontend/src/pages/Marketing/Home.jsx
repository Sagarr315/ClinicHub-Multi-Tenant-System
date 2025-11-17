import "./Home.css";
import { Link } from "react-router-dom";
import { HiOfficeBuilding } from "react-icons/hi";
import { BsShieldLockFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import Particles from "../../Animation/Particles"; // Import your custom Particles component

function Home() {
  return (
    <>
      {/* Hero Section with Particles */}
      <div
        className="home-banner d-flex flex-column justify-content-center text-center"
        style={{ position: "relative" }}
      >
        {/* Use Particles exactly as shown on website */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={800}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* Your Content */}
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 className="fw-bold display-5 text-white">
            Next-Generation Clinic Management SaaS
          </h1>
          <p className="text-light fs-5 mt-3">
            Multi-tenant, scalable & powerful healthcare software.
          </p>
          <Link to="/clinics" className="btn explore-btn mt-4">
            Explore Clinics
          </Link>
        </div>
      </div>
      {/* System Overview */}
      <section className="system-overview py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3" style={{ color: "#4a9eff" }}>
            All-in-one Clinic Platform
          </h2>
          <p className="lead text-white mx-auto" style={{ maxWidth: 900 }}>
            Our cloud-native, multi-tenant clinic platform handles appointments,
            automated billing, patient records, digital prescriptions and
            real-time analytics — all secured with role-based access and
            clinic-level isolation.
          </p>
        </div>
      </section>
      {/* Features Section */}
      <div className="features py-5 text-center">
        <div className="container">
          <h1 className="fw-bold mb-5 " style={{ color: " #4a9eff" }}>
            Why Choose Our Platform?
          </h1>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="plan-card p-4 rounded-3">
                <h3 className="fw-bold text-white">
                  <HiOfficeBuilding size={25} color="#6ab9ff" /> Multi-Tenant
                  Architecture
                </h3>
                <p className="mt-2">
                  Each clinic gets isolated data, custom branding, and its own
                  management portal.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-card p-4 rounded-3">
                <h3 className="fw-bold text-white">
                  <BsShieldLockFill size={25} color="#6ab9ff" /> Secure &
                  Compliant
                </h3>
                <p className="mt-2">
                  Built with enterprise-grade encryption + privacy standards for
                  healthcare.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-card p-4 rounded-3">
                <h3 className="fw-bold text-white">
                  <FiTrendingUp size={25} color="#6ab9ff" /> Automation &
                  Analytics
                </h3>
                <p className="mt-2">
                  Appointment reminders, invoicing, and smart analytics
                  dashboards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <section className="faq py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center" style={{ color: "#4a9eff" }}>
            Frequently asked questions
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="faq-card p-4 rounded-4">
                <div className="faq-item">
                  <h5>
                    <span>1.</span> Is my clinic data secure?
                  </h5>
                  <p>
                    Yes. We use JWT authentication, encrypted transport and
                    strict clinic-level data isolation so data never mixes
                    between clinics.
                  </p>
                </div>

                <div className="faq-item">
                  <h5>
                    <span>2.</span> Can I add multiple clinics?
                  </h5>
                  <p>
                    Yes — the platform is built as multi-tenant and supports
                    multiple isolated clinics under one account.
                  </p>
                </div>

                <div className="faq-item">
                  <h5>
                    <span>3.</span> Can my staff use it?
                  </h5>
                  <p>
                    Absolutely. Role-based access ensures doctors, receptionists
                    and admins each have appropriate permissions.
                  </p>
                </div>

                <div className="faq-item">
                  <h5>
                    <span>4.</span> Do I need installation?
                  </h5>
                  <p>
                    No installation — the system is fully cloud-hosted and works
                    through any modern browser.
                  </p>
                </div>

                <div className="faq-item">
                  <h5>
                    <span>5.</span> How do patients book appointments?
                  </h5>
                  <p>
                    Patients can book via reception or through a self-service
                    booking interface (optional). Automated reminders and
                    confirmations are sent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section  */}
      <div className="pricing py-5">
        <div className="container">
          <h1 className="fw-bold mb-6" style={{ color: " #4a9eff" }}>
            Choose Your Subscription Plan
          </h1>

          <div className="row g-4 justify-content-center mt-4">
            {/* Starter */}
            <div className="col-md-4">
              <div className="plan-card p-4 rounded-4 position-relative text-start">
                <h3 className="fw-bold text-white">Starter</h3>
                <p className="price fw-semibold">$19/mo</p>

                <ul className="ps-3">
                  <li>1 Clinic</li>
                  <li>Up to 3 Staff</li>
                  <li>Basic Appointment System</li>
                  <li>Email Support</li>
                </ul>
                <Link to="/contact">
                  <button className="btn w-100 plan-btn mt-3 fw-bold">
                    Start Starter
                  </button>
                </Link>
              </div>
            </div>

            {/* Professional (FEATURED) */}
            <div className="col-md-4">
              <div className="plan-card p-4 rounded-4 position-relative text-start">
                <div className="featured-tag">Most Popular</div>

                <h3 className="fw-bold text-white">Professional</h3>
                <p className="price fw-semibold">$49/mo</p>

                <ul className="ps-3">
                  <li> 5 Clinics</li>
                  <li> Unlimited Staff</li>
                  <li> Full EMR + Billing</li>
                  <li> SMS Reminders</li>
                  <li> Analytics Dashboard</li>
                </ul>
                <Link to="/contact">
                  <button className="btn w-100 plan-btn mt-3 fw-bold">
                    Get Professional
                  </button>
                </Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="col-md-4">
              <div className="plan-card p-4 rounded-4 position-relative text-start">
                <h3 className="fw-bold text-white">Enterprise</h3>
                <p className="price fw-semibold">Custom</p>

                <ul className="ps-3">
                  <li> Unlimited Clinics</li>
                  <li> Advanced Role Management</li>
                  <li> API + Integrations</li>
                  <li> Dedicated Support</li>
                </ul>
                <Link to="/contact">
                  <button className="btn w-100 plan-btn mt-3 fw-bold">
                    Contact Sales
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
