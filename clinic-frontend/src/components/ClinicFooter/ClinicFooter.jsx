import "./ClinicFooter.css";

function ClinicFooter({ clinic }) {
  return (
    <footer className="clinic-footer">
      <p>© {new Date().getFullYear()} {clinic.name} — Powered by MyClinic SaaS</p>
    </footer>
  );
}

export default ClinicFooter;
