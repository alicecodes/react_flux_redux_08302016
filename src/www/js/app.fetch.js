import 'bootstrap-loader';
import '../css/styles.scss';

// import React from 'react';
// import ReactDOM from 'react-dom';

// function ajax(options) {

// 	return new Promise(function(resolve, reject) {

// 		const xhr = new XMLHttpRequest();

// 		xhr.addEventListener('readystatechange', function() {
// 			if (xhr.readyState === 4 && xhr.status === 200) {
// 				resolve(JSON.parse(xhr.responseText));
// 			}
// 		});

// 		xhr.open(options.method, options.url);
// 		xhr.send();

// 	});

// }

// ajax({
// 	method: 'GET',
// 	url: '/api/widgets'
// }).then(function(results) {
// 	console.dir(results);
// });

fetch('/api/widgets')
	.then(res => res.json())
	.then(results => console.dir(results));






