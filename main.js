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

const filterBtns = document.querySelectorAll("nav a");
filterBtns.forEach(btn => {
	btn.addEventListener("click", e => handleFilterClick(e));
});

function handleFilterClick(e) {
	e.preventDefault();
	let target = e.target;

	filterBtns.forEach(btn => btn.classList.remove("active"));
	target.classList.add("active");

	filterPets(target.dataset.filter);
}

function filterPets(species) {
	const allPets = document.querySelectorAll(".animal-card");
	if (species === "all") {
		allPets.forEach(pet => {
			pet.style.display = "";
		});
	} else {
		allPets.forEach(pet => {
			if (pet.querySelector(".species").textContent == species) {
				pet.style.display = "";
			} else {
				pet.style.display = "none";
			}
		});
	}
}
