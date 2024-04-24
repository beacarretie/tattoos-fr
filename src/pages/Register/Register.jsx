import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { registerNewUserCall } from "../../services/apiCalls";
import "./Register.css";
import { IsInputError } from "../../utils/validators";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    firstName: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    //genero la función que bindea

    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerMe = async () => {
    if (!IsInputError(credentials.password, "password") && !IsInputError(credentials.email, "email")) {
      const answer = await registerNewUserCall(credentials);
      console.log(answer)
      setMsg(answer.data.message);

      if (answer.data.email) {
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    }
    else {
      console.log(credentials)
      console.log("credenciales incorrectas, algún campo no está bien introducido")
    }
  };

  return (
    <div className="register-container registerElementsDesign">
      {msg === "" ? (
        <>
          <h1 className="title">CREA UNA CUENTA</h1>
          <h2 className="description">¿Eres nuevo? Regístrate y reserva tu primera cita.</h2>
          <CustomInput
            typeProp={"text"}
            nameProp={"firstName"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Tu nombre*"}
          />
          <CustomInput
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Tu email*"}
          />

          <CustomInput
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Tu contraseña*"}
          />

          <ButtonC
            title={"REGISTRARME"}
            className={"regularButtonClass"}
            functionEmit={registerMe}
          />
        </>
      ) : (
        <div>{msg}</div>
      )}
      {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
    </div>
  );
};