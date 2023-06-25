const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
const pets = await petPromise.json();

const template = document.querySelector("#animal-card");
const wrapper = document.createElement("div");

pets.forEach((pet) => {
	const clone = template.content.cloneNode(true);
	
	clone.querySelector("h3").textContent = pet.name;

	const img = clone.querySelector("img");
	img.src = pet.photo;
	img.alt = `A ${pet.species} named ${pet.name}`;

	const age = new Date().getFullYear() - pet.birthYear;
	clone.querySelector(".age").textContent = decideAgeText(age);

	clone.querySelector(".species").textContent = pet.species;
	clone.querySelector(".description").textContent = pet.description;
	
	const primaryBtn = clone.querySelector(".primary-btn");
	primaryBtn.textContent = `Adopt ${pet.species}`;
	primaryBtn.href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}`;
	
	wrapper.appendChild(clone);
});

document.querySelector(".animals").appendChild(wrapper);

function decideAgeText(age) {
	if (!age) {
		return "Less than a year old";
	}
	return age > 1 ? `${age} years old` : "1 year old";
}
