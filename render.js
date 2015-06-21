var Handlebars = require('handlebars');
var fs = require('fs');

var outputFile = 'index.html';
var templateFile = 'template.hbs';
var dataFile = 'design.json';

/*var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);
 
var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

var result = template(data);
*/

var template;
var result;
var data;

fs.readFile(templateFile, 'utf-8', function (err, source) {
    if (err) throw err;
        
    template = Handlebars.compile(source);
    
    fs.readFile(dataFile, 'utf-8', function (err, d) {
        if (err) throw err;
        
        data = JSON.parse(d);
        
        result = template(data);
        fs.writeFile(outputFile, result, function (err) {
            if (err) throw err;
        });
    });
});