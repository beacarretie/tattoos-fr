import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringProfile } from "../../services/apiCalls";
import { IsInputError } from "../../utils/validators";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedAmount, getUserData } from "../../app/slices/userSlice";

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

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

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

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
    <>
      <CustomInput
        typeProp="text"
        nameProp="First name"
        placeholderProp="first name"
        value={profileData.firstName}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="text"
        nameProp="Last name"
        placeholderProp="last name"
        value={profileData.lastName}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="email"
        nameProp="email"
        placeholderProp="email"
        value={profileData.email}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="phone"
        nameProp="phone"
        placeholderProp="phone"
        value={profileData.phone}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
       <CustomInput
        typeProp="password"
        nameProp="password"
        placeholderProp="*****"
        value={profileData.password}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="text"
        nameProp="role"
        placeholderProp="role"
        value={profileData.role.name}
        isDisabled="disabled"
        handlerProp={inputHandler}
      />
      {isEditing ? (
        <div className="button-container">
          <button onClick={() => updateProfileHandler()}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <BootstrapModal 
          profileData={profileData}
          inputHandler={inputHandler}
          token={token}/>
        </>
      )}
    </>
  );
};
