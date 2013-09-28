function roman(n, s) {
	var r = '';
	var d;
	var rn = new Array('IIII', 'V', 'XXXX', 'L', 'CCCC', 'D', 'MMMM');
	for (var i = 0; i < rn.length; i++) {
		var x = rn[i].length + 1;
		var d = n % x;
		r = rn[i].substr(0, d) + r;
		n = (n - d) / x;
	}
	if (s) {
		r = r.replace(/DCCCC/g, 'CM');
		r = r.replace(/CCCC/g, 'CD');
		r = r.replace(/LXXXX/g, 'XC');
		r = r.replace(/XXXX/g, 'XL');
		r = r.replace(/VIIII/g, 'IX');
		r = r.replace(/IIII/g, 'IV');
	}
	return r;
}
// console.log(roman(99,true))
exports.roman = roman;