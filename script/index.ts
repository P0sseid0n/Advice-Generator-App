let fetching = false
const buttonFetch = document.querySelector('section button') as HTMLButtonElement

interface ISlip {
	id: Number
	advice: string
}

async function getAdvice() {
	const idText = document.querySelector('section p #AdviceID') as HTMLSpanElement
	const adviceText = document.querySelector('section #AdviceText') as HTMLHeadingElement

	fetching = fetching || buttonFetch.disabled

	if (fetching) return
	fetching = true
	buttonFetch.disabled = true

	fetch('https://api.adviceslip.com/advice')
		.then(response => response.json())
		.then(response => {
			const slip: ISlip = response.slip

			idText.innerHTML = String(slip.id)
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
