const quitDateInfo = document.querySelector('#quitDateInfo');
const elapsed = document.querySelector('#elapsed');
const noCigarNumber = document.querySelector('#no-cigar-number');
const moneySaved = document.querySelector('#money-saved');

const dateInput = document.querySelector('#date');
const numCigarsInput = document.querySelector('#num-cigars');
const pricePerPack = document.querySelector('#price-per-pack');

const saveBtn = document.querySelector('#saveBtn');

initApp();

saveBtn.addEventListener('click', saveData);

function saveData() {
	let qd = moment(dateInput.value).format();
	let ppp = pricePerPack.value;
	let noc = numCigarsInput.value;

	localStorage.newQuitDate = qd;
	localStorage.pricePerPack = ppp;
	localStorage.numberOfCigars = noc;

	displayQuitDate();
	displayLastCigarette();
	displayCigaretteNotSmoked();
	displayMoneySaved();
}

function displayQuitDate() {
	quitDateInfo.innerHTML = moment(localStorage.newQuitDate).format('LLL');
}

function displayLastCigarette() {
	elapsed.innerHTML = moment(localStorage.newQuitDate).fromNow();
}

function displayCigaretteNotSmoked() {
	let cigarPerMinute = parseInt(localStorage.numberOfCigars) / 24 / 60;
	let qd = moment(localStorage.newQuitDate);
	let now = moment();
	let minutes = now.diff(qd, 'minutes');
	noCigarNumber.innerHTML = (cigarPerMinute * minutes).toFixed(0);
}

function displayMoneySaved() {
	let priceOfOneCigar = parseInt(localStorage.pricePerPack) / 20;
	let qd = moment(localStorage.newQuitDate);
	let now = moment();
	let minutes = now.diff(qd, 'minutes');
	let hourSaved =
		(priceOfOneCigar * parseInt(localStorage.numberOfCigars)) / 24;
	let minutesSaved = hourSaved / 60;

	moneySaved.innerHTML = (minutesSaved * minutes).toFixed(3);
}

function initApp() {
	if (localStorage.newQuitDate) {
		displayQuitDate();
		displayLastCigarette();
		displayCigaretteNotSmoked();
		displayMoneySaved();

		let loop = setInterval(displayLastCigarette, 10000);
		let loop2 = setInterval(displayCigaretteNotSmoked, 1000);
		let loop3 = setInterval(displayMoneySaved, 6000);
	}
}
