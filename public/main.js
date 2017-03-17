// main.js

var updates = document.getElementsByClassName('update');

[].forEach.call(updates, update => {
	update.addEventListener('click', (e) => {
		var text = e.target.parentElement.getElementsByClassName('content')[0].textContent;
		e.target.parentElement.getElementsByClassName('content')[0].innerHTML = '<input type="text" placeholder="Input content to change" value="' + text + '"/>';
		
		e.target.parentElement.getElementsByTagName('input')[0].addEventListener('change', (input) => {
			fetch('quotes', {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: e.target.parentElement.getElementsByClassName('name')[0].textContent,
					quote: input.currentTarget.value
				})
			}).then(res => {
				if(res.ok) return res.json();
			}).then(data => {
				console.log(data);
				window.location.reload();
			});
		});

		e.preventDefault();
	});
});


//DELETE

var deletes = document.getElementsByClassName('delete');

[].forEach.call(deletes, (del) => {
	del.addEventListener('click', (e) => {
	
		fetch('quotes', {
			method: 'delete',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				id: e.target.getAttribute('href')
			})
		})
		.then(res => {
			if(res.ok) return res.json();
		})
		.then(data => {
			console.log(data);
			window.location.reload(true);
		});
		
		e.preventDefault();
	});
});
