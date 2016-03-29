var fs = require('fs')

var pre = new Date(2013, 0, 1)
var now = new Date()
var outList = new Array()
while(pre < now) 
{
    var last = new Date(pre.getFullYear(), pre.getMonth()+1, pre.getDate())
    var out = 
    {
        start: pre.valueOf(),
        end: last.valueOf(),
        datetime: pre.toLocaleDateString() + '-' + last.toLocaleDateString(),
    };
    outList.push(out);
    pre = last;
}
fs.writeFile('./dateList.json', JSON.stringify(outList), function(err) 
{
    if(err) 
    {
        console.log(err);
    }
    else 
    {
        console.log('success write file');
    }
})
//console.log(+new Date(2013,12,1))