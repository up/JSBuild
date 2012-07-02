/**
 * Vanilla Inline Documentation Generator
 * @author Uli Preuss
 */

(function(script, title) {

    if (typeof String.prototype.trim === "undefined") {
        String.prototype.trim = function() {
            return this.replace(/\s+$/, "").replace(/^\s+/, "");
        };
    }
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    print('<html>');
    print('<head>');
    print('<title>' + title + '</title>');
    print('<link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">');
    print('<link rel="stylesheet" href="documentation.css" />');
    print('</head>');
    print('<body>');

    print('<h1>');
    print('  ' + title);
    print('</h1>');
    var comments = script.match(/\/\*\*(.|\n)+?\*\//g),
        clen = comments.length,
        example, example_parts, example_str, comment, i = 0,
        lines, j, llen, line, comment_parts;

    for (; i < clen; i++) {
        print('<div>');
        comment = comments[i];
        if (/@example/.test(comment)) {
            comment_parts = comment.split('@example');
            example_str = comment_parts[1];
            example_parts = example_str.split('*/')
            example_str = example_parts[0];
            comment = comment.replace(example_str, '*/') + example_parts[1];
            example_str = example_str.replace(/\*/g, '');
        }
        lines = comment.split('\n');
        llen = lines.length;
        for (j = 1; j < llen - 1; j++) {
            line = lines[j].trim().replace('* ', '');
            if (/@name/.test(comment) === false) {
                debug('Error on comment no. ' + (i + 1));
                debug('@name at the top of the comment is required!');
                quit();
            }
            if (/@/.test(example_str)) {
                debug('Error on comment no. ' + (i + 1));
                debug('Please move @example to the bottom of the comment!');
                quit();
            }
            if (/@/.test(line)) {
                line = line.replace('@', '');
                space = line.indexOf(" ");
                tagname = line.substring(0, space);
                tagvalue = line.substring(space + 1, line.length);
                if (tagname === 'name') {
                    print('<h3>');
                    print('  ' + tagvalue);
                    print('</h3>');
                } else {
                    print('<p>');
                    print('  <span class="tag-name">' + tagname.capitalize() + ':</span>');
                    print('  <span class="tag-value">' + tagvalue + '</span>');
                    print('</p>');
                }
            } else {
                print('<p>' + line + '</p>');
            }
            //print(line);
            if (j === llen - 2) {
                print('<code><pre>');
                print(example_str);
                print('</pre></code>');
                //comment_arr
            }
        }
        print('</div>');
    }

    print('</body>');
    print('</html>');

}(arguments[0], arguments[1]));