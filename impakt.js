// Format incident data into categories
function getMetrics(data){
	let metrics = {}
	data.assessment_set.map((assessment) => {
		let metricName = assessment.metric.text
		if(!metrics[metricName]){
			metrics[metricName] = []
		}
		let imageUrl = assessment.metric.negative_image
		imageUrl = imageUrl ? imageUrl.replace("http://", "https://") : ""
		let justification = assessment.justification ? assessment.justification : ""
		if(!justification || justification == 'nan'){
			justification = `One of Impakt's data partners has expressed concern about <span class='bold'>${data.name}</span> within our system for issues pertaining to <span class='bold'>${metricName}</span>.`
		}
		justification += `<div class='justificationNotice'>If you believe this assessment has been made in error, <a href='https://impakt.app/corrections/?assessment=${assessment.id}' target='_blank'>let us know</a>.</div>`
		metrics[metricName].push({
			imageUrl,
			source: assessment.data_source,
			justification: justification,
		})
	})
	return metrics
}

function showImpaktInfo(data, domElement){
	let metrics = getMetrics(data)
	let impaktContent = ''
	for(key in metrics){
		let assessments = ''
		metrics[key].map((assessment) => {
			let img = assessment.imageUrl ? `<img src='${assessment.imageUrl}'/>` : ''
			assessments += `
				<div class='assessment'>
					${img}
					<div class='assessmentText'>
						<h2>${key}</h2>
						<div class='justification'>${assessment.justification}</div>
					</div>
				</div>
			`
		})
		impaktContent += `
			<div class='metric'>
				<div class='assessments'>${assessments}</div>
			</div>
		`
	}

	let tab = `
		<div class='impaktWindow'>
			<div class='impaktOverlay'></div>
			<div class='impaktHeader'>
				<div class='impaktTitle'>${data.name}</div>
				<div class='impaktOptions'>
					<button type='button' class='closeImpaktBtn'>
						<img src='${chrome.extension.getURL('images/close.png')}'/>
					</button>
				</div>
			</div>
			<div class='impaktContent'>${impaktContent}</div>
		</div>
	`
	domElement.innerHTML += tab

	document.querySelector('.closeImpaktBtn').addEventListener('click', () => {
		document.querySelector('.impaktWindow').remove();
	})
	document.querySelector('.impaktOverlay').addEventListener('click', () => {
		document.querySelector('.impaktWindow').remove();
	})
}

