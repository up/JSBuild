##Build

run `sh builder/build.sh`

###build.sh

	src="builder/example/src"
	dist="builder/example/dist/"

	jsc builder/render.html.js -- "`cat $src/head.htm`" "`cat $src/body.htm`" > $dist/index.htm
	
###render.html.js

	load('builder/example/src/data.js');
	
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
	  title : "Das ist der Titel",
	  header : "Das ist der Header",
	  para : "Das ist der Text"
	}

###JSC

you need JSC, which is Webkit's JavaScriptCore, comes with Macs.

JSC is well hidden in

	/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc

Check it out, and make a "shortcut":

	$ sudo ln /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc /bin/jsc

####Usage

	$ jsc -h
	Usage: jsc [options] [files] [-- arguments]
	  -d         Dumps bytecode (debug builds only)
	  -e         Evaluate argument as script code
	  -f         Specifies a source file (deprecated)
	  -h|--help  Prints this help message
	  -i         Enables interactive mode (default if no files are specified)
	  -s         Installs signal handlers that exit on a crash (Unix platforms only)