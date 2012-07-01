##Build

run `sh build.sh`

##JSC

You need JSC, which is Webkit's JavaScriptCore, comes with Macs.

JSC is well hidden in

	/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc

Check it out, and make a "shortcut":

	$ sudo ln /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc /bin/jsc

###Usage and Options

See [http://trac.webkit.org/wiki/JSC](http://trac.webkit.org/wiki/JSC)