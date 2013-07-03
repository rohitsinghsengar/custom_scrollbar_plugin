custom_scrollbar_plugin
=======================

A jQuery based custom scrollbar plugin.

This is a demo page for scrollbar plugin developed by Rohit Sengar, https://www.linkedin.com/in/rohitsengar

Plugin Details

    Plugin name: Scrollr
    Version: 0.9 beta
    Complied version: "jquery.scrollr.js"
    Readable version: "jquery.scrollr.js"
    Dependencies: jquery 1.x.x only
    Browsers support: All major browsers Firefox, chrome, opera, safari & IE (IE8 onwards)

How to use
Very Simple, add jquery and scrollr plugin in head of the html file
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.scrollr.min.js"></script>

Initialize plugin on window load or any other event(as per requirement). You can also set couple of options(will increase in future) provided.

window.onload = function() {
  $('#example').scrollbar({
		color : 'red', // color of you choice, black by default
		rounded : false, // if you want to use rounded corners for scrollbar, true by default
		opacity : 0.7 //opacity of scrollbar
	});
	$('#example1').scrollbar({
		width : 20,
		rounded : true,
		opacity : 0.3
	});
};

That's it, enjoy scrolling! you can add this scrollbar to multiple divs in one page
Known issues and future scope

    Problems in nested scrollbar
    Scrollbar positioning bug when element has padding.
    Touch devices not supported //todo
