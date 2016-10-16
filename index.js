'use strict';
const popute = require('popute');
const shuffle = require('array-shuffle');
const each = require('each-series');
const spawn = require('execa').spawn;
const termImg = require('term-img');
const getImage = require('manga-life-win-4').getImage;

function isInstall(args) {
	return args[0] === 'i' || args[0] === 'install';
}

function npm(args) {
	return spawn('npm', args, {
		cwd: process.cwd(),
		stdio: isInstall(args) ? 'ignore' : 'inherit'
	});
}

function displayImage() {
	popute().then(urls => {
		each(shuffle(urls), (url, i, done) => {
			getImage(url).then(img => {
				termImg(img, {height: '90%'});
				setTimeout(done, 5000);
			});
		});
	});
}

module.exports = args => {
	const ps = npm(args);
	ps.on('exit', code => {
		process.exit(code); // eslint-disable-line unicorn/no-process-exit
	});

	if (isInstall(args)) {
		displayImage();
	}
};
