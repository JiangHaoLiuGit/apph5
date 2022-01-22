function setFontSize() {
	var html = document.getElementsByTagName('html')[0]
	var width = document.body.clientWidth  //网页正文全文宽
	var fontSize = 100 / 375 * width
    html.style.fontSize = fontSize + 'px'
    console.log(fontSize)
}
const remFN = function () {
	setFontSize()
	window.onresize = function () {
		setFontSize()
	}
}

export default remFN