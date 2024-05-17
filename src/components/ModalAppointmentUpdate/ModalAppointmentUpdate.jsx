import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateAppointment } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./ModalAppointmentUpdate.css";

function BootstrapModal({ token }) {
  const [show, setShow] = useState(false);

  const [appointmentDataUpdate, setAppointmentDataUpdate] = useState({
    appointment_id: "",
    day_date: "",
    description: "",
    price: ""
  });
  console.log(appointmentDataUpdate, "appointmentDataUpdate")

  const navigate = useNavigate();

  const handleClose = () => {
    // doble navigate para forzar a recargar el perfil en caso de no querer actualizar los datos,
    // para que llame de nuevo a la API y los recupere.
    //navigate("/");
    //  setTimeout(() => {
    //   navigate("/profile");
    //});

    console.log("close");
    setShow(false);
  };

  const handleUpdate = async () => {
    const data = {
      id: appointmentDataUpdate.appointment_id,
      day_date: appointmentDataUpdate.day_date,
      description: appointmentDataUpdate.description,
      price: appointmentDataUpdate.price,

    }
    try {
      await updateAppointment( data, token);
      console.log("cita actualizada");
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const inputHandler = (e) => {

    setAppointmentDataUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Button className="regularButtonClass" variant="primary" onClick={() => setShow(true)}>
        MODIFICAR
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualiza tu cita!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInput
            typeProp="number"
            nameProp="appointment_id"
            placeholderProp="appointment_id"
            value={appointmentDataUpdate.appointment_id}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="date"
            nameProp="day_date"
            placeholderProp="day_date"
            value={appointmentDataUpdate.day_date}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="description"
            placeholderProp="description"
            value={appointmentDataUpdate.description}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="number"
            nameProp="price"
            placeholderProp="price"
            value={appointmentDataUpdate.price}
            isDisabled=""
            handlerProp={inputHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="regularButtonClass" variant="secondary" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button className="regularButtonClass" variant="primary" onClick={handleUpdate}>
            GUARDAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;