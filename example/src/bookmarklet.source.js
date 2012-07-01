// http://aktuell.de.selfhtml.org/artikel/javascript/bookmarklets/#bsp_cookie_ed

/**
 * @name myFunction
 * Bookmarklet: Show Cookies
 * @author Uli Preuss
 * @example
 *   var x = foo("test"); //it will show "test" message
 *   alert(x);
 */
 
if (document.cookie) {
/**
 * @name myVar
 * @author Uli Preuss
 * @example
 *   alert('xxx');
*/
  
	var k = document.cookie.split('; '),
		w = window.open('about:blank', '_self'),
		i;

	for (i = 0; i < k.length; ++i) {
		w.document.write('<input type="text" value="' + k[i] + '" size="50">');
	}

	w.document.write('<button type="button" onclick="' + 'var ins=document.getElementsByTagName(\'input\');' + 'for(i=0;i<ins.length;++i)document.cookie=ins[i].value;' + 'location.href=\'' + location.href + '\'">Speichern und zur&uuml;ck</button>');
} else {
	alert('Sie haben keine Cookies von dieser Seite.');
}
