src="builder/example/src"
dist="builder/example/dist/"

# Render HTML Templates
#jsc builder/modules/render/html.js -- "`cat $src/head.htm`" "`cat $src/body.htm`" > $dist/index.htm

# Create Bookmarklet
#jsc builder/modules/create/bookmarklet.js -- "`cat $src/bookmarklet.source.js`" > $dist/bookmarklet.js

# Create Documentation
jsc builder/modules/create/documentation.js -- "`cat $src/bookmarklet.source.js`" "test doc"> $dist/documentation.htm

