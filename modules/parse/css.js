
/*
@media print {
    #test {
        border: 1px solid blue;
        font-family: Verdana;
    } 
    a {
        padding: 0;
    }
}
*/

var cssparse = {
    
    parse: function(cssstring) {


        // split into [0] selector [1] rules..
        var parts = cssstring.replace(/{/g, '}').split('}'); 
        
        for (var i = 0, max = parts.length; i < max; i++) {
            if (i % 2) { // rules
                parts[i] = '{' + this.sortRules(parts[i]) + '}';
            } else { // trim selector
                parts[i] = this.trim(parts[i]); 
            }
        }
        
        return parts.join('');
    },
    
    sortRules: function(rules) {
        var rawrules = rules.split(';'),
            ret = [], 
            line;
        for (var i = 0, max = rawrules.length; i < max; i++) {
            rawrules[i] = this.trim(rawrules[i]);
            if (rawrules[i]) {
                line = rawrules[i];
                line = line.split(':');
                if (line[0] && line[1]) {
                    line[0] = this.trim(line[0]);
                    line[1] = this.trim(line[1]).split(' ').sort().join(' ');
                }
                ret.push(line.join(':'));
            }
        }
        ret.sort();
        return ret.join(';') + ';';
    }, 
    
    trim: function(s) {
        return s.replace(/^\s+|\s+$/g, "");
    }
    
    
};

// call from jsc
// print(cssparse.parse(arguments[0]));
