import "./BookAppointment.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ClinicHeader from "../../components/ClinicHeader/ClinicHeader";
import ClinicFooter from "../../components/ClinicFooter/ClinicFooter";

function BookAppointment() {
  const { slug } = useParams();

  const clinic = {
    name: slug.replace("-", " ").toUpperCase(),
  };

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Appointment request submitted!");
  }

  return (
    <>
      <ClinicHeader clinic={clinic} />

      <div className="book-container">
        <h2>Book Appointment at {clinic.name}</h2>

        <form className="book-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Phone Number" required />
          <input type="date" required />
          <input type="time" required />
          <textarea placeholder="Reason for visit"></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

      <ClinicFooter clinic={clinic}/>
    </>
  );
}

export default BookAppointment;
