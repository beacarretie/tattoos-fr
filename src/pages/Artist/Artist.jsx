import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringProfile } from "../../services/apiCalls";
import { IsInputError } from "../../utils/validators";
import ModalArtist from "../../components/ModalArtist/ModalArtist";
import ModalAppointment from "../../components/ModalAppointment/ModalAppointment";
import ModalAppointmentUpdate from "../../components/ModalAppointmentUpdate/ModalAppointmentUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedAmount, getUserData } from "../../app/slices/userSlice";
import "./Artist.css";
import Header from "../../components/Header/Header";
import { bringArtistsAppointmentsById, deleteAppointmentById} from "../../services/apiCalls";

import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';


export const Artist = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    style: "",
    area: "",
    role: "",
  });

  // const [appointmentData, setAppointmentData] = useState({
  //   id: "",
  //   day_date: "",
  //   description: "",
  //   price: "",
  // });


  const [Appointments, setAppointments] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch()

  const veces = useSelector(getLoggedAmount)
  const myPassport = useSelector(getUserData)

  const token = myPassport.token;

  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const logedClient = await bringArtistsAppointmentsById(token);
      setAppointments(logedClient);
    };
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    const res = await deleteAppointmentById(id, token);
    console.log(res);
  };

  // Función que inicia el borrado del appointment y muestra u oculta el botón de confirmación
  const deleteAppointmentStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };


  const updateProfileHandler = () => {
    if (
      !IsInputError(profileData.firstName, "name") ||
      !IsInputError(profileData.email, "email")
    ) {
      console.log("nombre o email no válidos");
      setErrorMessage("No se pueden actualizar los datos");
      return;
    }
    try {
      updateProfile(profileData, token);
    } catch (err) {
      console.log(err);
    }
  };

  const resetLoggedCount = () => {
    console.log(veces)
  }

  return (
    <><Header /><div className="profileElementsDesign">
      <>
        <h1 className="title">MIS DATOS PERSONALES</h1>
        <h2 className="description">Desde aquí podrás actualizar siempre tus datos.</h2>
        <CustomInput
          typeProp="text"
          nameProp="firstName"
          placeholderProp="first name"
          value={profileData.firstName}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="text"
          nameProp="lastName"
          placeholderProp="last name"
          value={profileData.lastName}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="email"
          nameProp="email"
          placeholderProp="email"
          value={profileData.email}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="phone"
          nameProp="phone"
          placeholderProp="phone"
          value={profileData.phone}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="password"
          nameProp="password"
          placeholderProp="*****"
          value={profileData.password}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="text"
          nameProp="style"
          placeholderProp="style"
          value={profileData.style}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="text"
          nameProp="area"
          placeholderProp="area"
          value={profileData.area}
          isDisabled={!isEditing}
          handlerProp={inputHandler} />
        <CustomInput
          typeProp="text"
          nameProp="role"
          placeholderProp="role"
          value={profileData.role.name}
          isDisabled="disabled"
          handlerProp={inputHandler} />
        <>
          <ModalArtist
            profileData={profileData}
            inputHandler={inputHandler}
            token={token} />
        </>
      </>
    </div>
      <div className="admin-area">
        {Appointments.length > 0 
        ? (
          <ul>
            {Appointments.map((Appointment, User) => {
              return (
                <MDBTable>
                  <MDBTableBody>
                    <tr>
                      <td>
                        <p className='text-muted mb-0'> {Appointment.id} </p>
                      </td>
                      <td>
                        <p className='text-muted mb-0'> {Appointment.day_date} </p>
                      </td>
                      <p className='text-muted mb-0'> {Appointment.price}€</p>
                      <td>
                        <div className="delete-button" onClick={() => deleteAppointmentStepOne(Appointment.id)} ></div>
                        <div className={
                          // botón de confirmación de borrado que comprueba si el useState que lleva el registro de qué usuario
                          // se está borrando es el suyo, en cuyo caso se muestra.
                          areYouDeletingMe === Appointment.id
                            ? "delete-button confirm-delete "
                            : "delete-button confirm-delete display-none"
                        }
                          onClick={() => deleteAppointment(Appointment.id)}
                        ></div>
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              );
            })}
            <>
         
              <ModalAppointment
                profileData={profileData}
                token={token} />

                <ModalAppointmentUpdate
                // appointmentData={appointmentData}
                token={token} />
            </>
          </ul>
        ) 
        : <>
          <ModalAppointment
            profileData={profileData}
            token={token} />
         </>
        }

      </div>
    </>
  );
};