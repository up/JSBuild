##Build

run `sh build.sh`

###build.sh

	src="example/src"
	dist="example/dist/"

	# Render HTML Templates
	jsc modules/render/html.js -- "`cat $src/head.htm`" "`cat $src/body.htm`" > $dist/index.htm

	# Create Bookmarklet
	jsc modules/create/bookmarklet.js -- "`cat $src/bookmarklet.source.js`" > $dist/bookmarklet.js

	# Create Documentation
	jsc modules/create/documentation.js -- "`cat $src/bookmarklet.source.js`" "test doc"> $dist/documentation.htm
	
###render.html.js

	load('example/src/data.js');
	
	var head = arguments[0].replace(
	  '{{title}}', 'Hello Horld!'
	);

	var body = arguments[1].replace(
	  '{{header}}', 'Welcome,'
	).replace(
	  '{{para}}', 'on earth!'
	);

	print('<html>');
	print(head); 
	print(body);
	print('</html>');
	
###data.js

	var data = {
	  title : "My Title",
	  header : "My Header",
	  para : "My Text"
	}
	
###JSC

You need JSC, which is Webkit's JavaScriptCore, comes with Macs.

JSC is well hidden in

	/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc

Check it out, and make a "shortcut":

	$ sudo ln /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc /bin/jsc

####Usage

See [http://trac.webkit.org/wiki/JSC](http://trac.webkit.org/wiki/JSC)