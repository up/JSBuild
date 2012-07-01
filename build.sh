src="example/src"
dist="example/dist/"

# Render HTML Templates
jsc modules/render/html.js -- "`cat $src/head.htm`" "`cat $src/body.htm`" > $dist/index.htm

# Create Bookmarklet
jsc modules/create/bookmarklet.js -- "`cat $src/bookmarklet.source.js`" > $dist/bookmarklet.js

# Create Documentation
jsc modules/create/documentation.js -- "`cat $src/bookmarklet.source.js`" "test doc"> $dist/documentation.htm

