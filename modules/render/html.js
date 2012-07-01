/*
if (!arguments[0]) {
    print('usage:\n $ jsc builder/build.js "`cat src/head.htm`" "`cat src/body.htm`"');
    quit();
}
*/

load('builder/example/src/data.js');

var head = arguments[0].replace(
  '{{title}}', data.title
);

var body = arguments[1].replace(
  '{{header}}', data.header
).replace(
  '{{para}}', data.para
);

print('<html>');
print(head); 
print(body);
print('</html>');
