import { useEffect, useState } from "react";
import { bringAllCharacters, bringCharacterById, } from "../../services/apiCalls";
import "./Characters.css";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";


export const Characters = () => {
	const [characters, setCharacters] = useState([]);
	const bringCharacters = /*async*/ () => {
		// const apiResponse = await bringAllCharacters()
		// lógica que me convenga usar

		bringAllCharacters()
			.then((res) => {
				setCharacters(res);
			})
			.catch((error) => {
				console.log(error, "ups");
			});
	};

	useEffect(bringCharacters, [])

	return ( 
	<><Header /><div className="charactersDesign">
			<ol>
				{characters.map((char) => {
					return (
						<>
							<div className="cardCharacter">
								<Avatar size={50} round="50px" name={char.user.firstName} />
								<div className="contactDesign">
									<div className="contactName">
										<p className="firstName">{char.user.firstName}</p>
									</div>
									<div className="contactData">
										<p className="phone">{char.user.phone}</p>
										<p className="email">{char.user.email}</p>
									</div>
								</div>
							</div>
						</>
					);
				})}

			</ol>
		</div></>
);
};