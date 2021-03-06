function trim(Str , Flag) {
	Str	= ""+Str;
	if( Flag == "l" || Flag == "L" )/*trim left side only*/
	{
		RegularExp	= /^\s+/gi;
		return Str.replace( RegularExp,"" );
	}
	else if( Flag == "r" || Flag == "R" )/*trim right side only*/
	{
		RegularExp	= /\s+$/gi;
		return Str.replace( RegularExp,"" );
	}
	else/*defautly, trim both left and right side*/
	{
		RegularExp	= /^\s+|\s+$/gi;
		return Str.replace( RegularExp,"" );
	}
}

function isEmpty(str){
	return (null==str) || (undefined==str) || (trim(str)=='') || (trim(str)=='null');
}
function isObject(obj){
	var hasProp = false;
	if (typeof obj === "object" ){  
		for (var prop in obj){  
			hasProp = true;  
			break;  
		}  
    }  
	return hasProp;
}
exports.isObject=isObject;
exports.isEmpty=isEmpty;