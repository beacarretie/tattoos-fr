import { useSelector } from "react-redux";
import { getUserData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { bringAllUsersCall, bringAllAppointmentsCall, deleteUserById, deleteAppointmentById } from "../../services/apiCalls";
import "./Admin.css";
import Header from "../../components/Header/Header";
import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';


export const Admin = () => {

  // Collapsable
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const toggleFirst = () => setShowFirst(!showFirst);
  const toggleSecond = () => setShowSecond(!showSecond);

  // useState para todos los usuarios, y el que queremos borrar
  const [users, setUsers] = useState([]);
  const [Appointments, setAppointments] = useState([]);

  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await bringAllUsersCall(token);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await bringAllAppointmentsCall(token);
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  const deleteUser = async (id) => {
    const res = await deleteUserById(id, token);
    console.log(res);
  };

  const deleteAppointment = async (id) => {
    const res = await deleteAppointmentById(id, token);
    console.log(res);
  };

  // Función que inicia el borrado del usuario y muestra u oculta el botón de confirmación
  const deleteUserStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };

  // Función que inicia el borrado del appointment y muestra u oculta el botón de confirmación
  const deleteAppointmentStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };

  return (
    <>
      <Header /><div className="profileElementsDesign"></div>
      <MDBBtn onClick={toggleFirst}>USUARIOS</MDBBtn>
      <MDBCollapse open={showFirst}>
        <div className="admin-area">
          {users.length > 0 ? (
            <ul>
              {users.map((user) => {
                return (
                  <MDBTable>
                    <MDBTableBody>
                      <tr>
                        <td>
                          <p className='text-muted mb-0'> {user.firstName} </p>
                        </td>
                        <td>
                          <p className='text-muted mb-0'> {user.email} </p>
                        </td>
                        <p className='text-muted mb-0'> {user.id}</p>
                        <td>
                          <div
                            className="delete-button"
                            onClick={() => deleteUserStepOne(user.id)}
                          ></div>
                          <div
                            className={
                              // botón de confirmación de borrado que comprueba si el useState que lleva el registro de qué usuario
                              // se está borrando es el suyo, en cuyo caso se muestra.
                              areYouDeletingMe === user.id
                                ? "delete-button confirm-delete "
                                : "delete-button confirm-delete display-none"
                            }
                            onClick={() => deleteUser(user.id)}
                          ></div>
                        </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                );
              })}
            </ul>
          ) : null}
        </div>
      </MDBCollapse>

      <MDBBtn onClick={toggleSecond}>CITAS</MDBBtn>
      <MDBCollapse open={showSecond}>
        <div className="admin-area">
          {Appointments.length > 0 ? (
            <ul>
              {Appointments.map((Appointment) => {
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
            </ul>
          ) : null}
        </div>
      </MDBCollapse>
    </>
  );
};