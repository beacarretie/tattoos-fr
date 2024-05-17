import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { createAppointment } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./ModalAppointment.css";
import { decodeToken } from "react-jwt";


function BootstrapModal({ profileData, token }) {
  const [show, setShow] = useState(false);

const uDecodificado = decodeToken(token);


  const artist_id = profileData.id;
  console.log("artist",artist_id,uDecodificado)
  
  const [appointmentData, setAppointmentData] = useState({
    day_date: "",
    description: "",
    artist: uDecodificado.userId,
    client: "",
    price: ""
  });

  console.log(appointmentData)
  const inputHandler = (e) => {
    setAppointmentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
    try {      
      console.log("cita creada", appointmentData);
      await createAppointment(appointmentData, token);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button className="regularButtonClass" variant="primary" onClick={() => setShow(true)}>
        CREAR CITA
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea tu cita!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInput
            typeProp="date"
            nameProp="day_date"
            placeholderProp="day_date"
            value={appointmentData.day_date}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="number"
            nameProp="artist_id"
            placeholderProp="artist_id"
            value={appointmentData.artist || ""}
            isDisabled="disabled"
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="number"
            nameProp="client"
            placeholderProp="ID client"
            value={appointmentData.client || ""}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="description"
            placeholderProp="description"
            value={appointmentData.description || ""}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="number"
            nameProp="price"
            placeholderProp="price"
            value={appointmentData.price || ""}
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