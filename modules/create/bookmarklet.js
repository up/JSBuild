/**
 * Original code from
 * http://chris.zarate.org/bookmarkleter
 * https://github.com/chriszarate/Bookmarkleter
 *
 * Comment removal code from:
 * http://james.padolsey.com/javascript/removing-comments-in-javascript/
 *
 * Modified by Uli Preuss
 */

(function(text) {

    var lines, len_lines, line, quotes, len_quotes, removeEmptyChars, removeComments, textLength, j, i;

    removeEmptyChars = function(text) {

    	return text.replace(
    	  / ?; ?/g, ';'
    	).replace(
    	  / ?: ?/g, ':'
    	).replace(
    	  / ?, ?/g, ','
    	).replace(
    	  / ?= ?/g, '='
    	).replace(
    	  / ?% ?/g, '%'
    	).replace(
    	  / ?\+ ?/g, '+'
    	).replace(
    	  / ?\* ?/g, '*'
    	).replace(
    	  / ?\? ?/g, '?'
    	).replace(
    	  / ?\{ ?/g, '{'
    	).replace(
    	  / ?\} ?/g, '}'
    	).replace(
    	  / ?\[ ?/g, '['
    	).replace(
    	  / ?\] ?/g, ']'
    	).replace(
    	  / ?\( ?/g, '('
    	).replace(
    	  / ?\) ?/g, ')'
    	);

    };

    removeComments = function(str) {

        var i = 0,
            len = str.length,
            mode = {
                singleQuote: false,
                doubleQuote: false,
                regex: false,
                blockComment: false,
                lineComment: false,
                condComp: false
            };

        str = ('__' + str + '__').split('');

        for (; i < len; i++) {

            if (mode.regex) {
                if (str[i] === '/' && str[i - 1] !== '\\') {
                    mode.regex = false;
                }
                continue;
            }

            if (mode.singleQuote) {
                if (str[i] === "'" && str[i - 1] !== '\\') {
                    mode.singleQuote = false;
                }
                continue;
            }

            if (mode.doubleQuote) {
                if (str[i] === '"' && str[i - 1] !== '\\') {
                    mode.doubleQuote = false;
                }
                continue;
            }

            if (mode.blockComment) {
                if (str[i] === '*' && str[i + 1] === '/') {
                    str[i + 1] = '';
                    mode.blockComment = false;
                }
                str[i] = '';
                continue;
            }

            if (mode.lineComment) {
                if (str[i + 1] === '\n' || str[i + 1] === '\r') {
                    mode.lineComment = false;
                }
                str[i] = '';
                continue;
            }

            if (mode.condComp) {
                if (str[i - 2] === '@' && str[i - 1] === '*' && str[i] === '/') {
                    mode.condComp = false;
                }
                continue;
            }

            mode.doubleQuote = str[i] === '"';
            mode.singleQuote = str[i] === "'";

            if (str[i] === '/') {

                if (str[i + 1] === '*' && str[i + 2] === '@') {
                    mode.condComp = true;
                    continue;
                }
                if (str[i + 1] === '*') {
                    str[i] = '';
                    mode.blockComment = true;
                    continue;
                }
                if (str[i + 1] === '/') {
                    str[i] = '';
                    mode.lineComment = true;
                    continue;
                }
                mode.regex = true;

            }

        }
        return str.join('').slice(2, -2);
    };

    // Remove comments
    text = removeComments(text);

    text = text.replace(
      /\r/g, '\n'          // Standardize newlines
    ).replace(
      /[\t ]+/g, ' '       // No multiple spaces
    ).replace(
      /'/g, '"<$<$<$<$<$<' // Hack to avoid replacing inside literal strings
    );

    // Replace line-by-line
    lines = text.split('\n');
    len_lines = lines.length;

    for (i = 0; i < len_lines; i++) {

        // Trim each line
        line = lines[i].replace(
          /^[\t ]+/g, '' // Left
        ).replace(
          /[\t ]+$/g, '' // Right
        );

        quotes = line.split('"');
        len_quotes = quotes.length;

        for (j = 0; j < len_quotes; j++) {
            if ((j % 2) === 0) {
                quotes[j] = removeEmptyChars(quotes[j]);
            }
        }

        lines[i] = quotes.join('"');

    }

    text = lines.join('');

    text = text.replace(/"<\$<\$<\$<\$<\$</g, "'" // Restore single quotes
    );

  	// Escape special characters
  	text = text.replace(
  	  /%/g, '%25'
  	).replace(
  	  /"/g, '%22'
  	).replace(
  	  /</g, '%3C'
  	).replace(
  	  />/g, '%3E'
  	).replace(
  	  /#/g, '%23'
  	).replace(
  	  /@/g, '%40'
  	).replace(
  	  / /g, '%20'
  	).replace(
  	  /\&/g, '%26'
  	).replace(
  	  /\?/g, '%3F'
  	);

    if (text.substring(0, 11) === 'javascript:') {
        text = text.substring(11);
    }
    textLength = text.length;

    if ((text.substring(0, 12) + text.substring(textLength - 5)) !== '(function(){})();') {
        text = '(function(){' + text + '})();';
    }
    text = 'javascript:' + text;

    print(text);

}(arguments[0]));