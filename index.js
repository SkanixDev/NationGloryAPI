const fetch = require('node-fetch')
const jsdom = require('jsdom')
const moment = require('moment')

/**
* 		@param {string} player - Player Name.
* 		@param {string} dimension - Dimension of image (max: 100px, min: 16).
*/

async function fetchPlayer(player) {
	var pagePlater = await fetch('https://nationsglory.fr/profile/' + player)
	var response = await pagePlater.text()
	return response = new jsdom.JSDOM(response)
}

exports.fetchSkinPlayer = async (player, dimension) => {
	if (dimension > 100 || dimension < 16) return Error("Dimension must be between 16 and 100"); 
	return `https://skins.nationsglory.fr/face/${player}/${dimension}`
}

exports.getInfosServer = async (player) => {
	var playerPage = await fetchPlayer(player)
	var document = playerPage.window.document;
	if (document.querySelector("h2.h1.section-title.mb-2")) return Error("Player was not found.")
	var values = []
	document.querySelectorAll('div.card.server-tab.d-none').forEach(ele => {
		var alreadyConnect = ele.querySelector('h3').textContent !== "Oups...";
		var lastConnect = alreadyConnect ? ele.children[0].textContent.split("\n")[11].split(" ") : null;
		values.push({
			server: ele.getAttribute('data-server'),
			playing_time: alreadyConnect ? moment(`${lastConnect[0]}:${lastConnect[2]}:${lastConnect[4]}`, "HH:mm:ss").format("HH:mm:ss") : null,
			rank: alreadyConnect ? ele.children[0].textContent.split("\n")[15] : null,
			reputation: alreadyConnect ? ele.children[0].textContent.split("\n")[19] : null,
			country: alreadyConnect ? ele.children[0].textContent.split("\n")[25] : null,
			country_rank: alreadyConnect ? ele.children[0].textContent.split("\n")[29] : null,
			powers: alreadyConnect ? ele.children[0].textContent.split("\n")[33] : null,
		});
	})
	return values;
}

exports.getPlayer = async (player) => {
	var playerPage = await fetchPlayer(player)
	var document = playerPage.window.document;
	if(document.querySelector("h2.h1.section-title.mb-2")) return Error("Player was not found.")
	return {
		name: player,
		description: document.querySelector("p.lead") === null ? "No description" : document.querySelector("p.lead").innerHTML,
		skin: await fetchSkinPlayer(player, 16),
		servers: await getInfosServer(player)
	}
}



