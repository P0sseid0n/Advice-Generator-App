let fetching = false
const buttonFetch = document.querySelector('section button')

async function getAdvice() {
	const idText = document.querySelector('section p span')
	const adviceText = document.querySelector('section h2')

	if (fetching) return
	fetching = true
	buttonFetch.disabled = true
	fetch('https://api.adviceslip.com/advice')
		.then(response => response.json())
		.then(({ slip }) => {
			idText.innerHTML = slip.id
			adviceText.innerHTML = '"' + slip.advice + '"'
		})
		.catch(error => {
			console.error(error)
		})
		.finally(() => {
			fetching = false
			buttonFetch.disabled = false
		})
}

buttonFetch.addEventListener('click', getAdvice)

getAdvice()
