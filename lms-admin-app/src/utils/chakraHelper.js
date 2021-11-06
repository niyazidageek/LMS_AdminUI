
String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

class ChakraHelper{

    chars = {
        '<ul>':'<UnorderedList>',
        '</ul>':'</UnorderedList>',
        '<ol>':'<OrderedList>',
        '</ol>':'</OrderedList>'
    }
  
    convertToChakra(htmlString){
        let result = htmlString.allReplace(this.chars)
        return result;
    }
  
  }
  
  export const chakraHelper = new ChakraHelper();