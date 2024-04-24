import { useEffect, useState } from "react";
import { bringAllCharacters,bringCharacterById,} from "../../services/apiCalls";
import "./Characters.css";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import Avatar from 'react-avatar';

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filter, setFilter] = useState("");
  const bringCharacters = /*async*/ () => {
    // const apiResponse = await bringAllCharacters()
    // lógica que me convenga usar

    bringAllCharacters()
      .then((res) => {
        console.log(res)
        setCharacters(res);
      })
      .catch((error) => {
        console.log(error, "ups");
      });
  };

  const characterCardClickHandler = (char) => {
    bringCharacterById(char.id).then((res) => {
      console.log(res);
    });
  };

  // handler del buscador de personajes
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  useEffect(bringCharacters,[])

  console.log("Filtered",filteredCharacters)
  console.log("characters",characters)
  return (
    <div className="characters-design">
      <ol>
        
        {characters.map((char) => {
            return (
              <>
                <Avatar name={char.user.firstName}/>
                <p>{char.user.firstName}</p>
                <p>{char.user.phone}</p>
                <p>{char.user.email}</p>
              </>
            );
          })
        }
        
      </ol>
    </div>
  );
};