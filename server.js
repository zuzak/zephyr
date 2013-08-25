var log = require('./log');
var fs = require('fs');
var md = require('marked');
var config = require('./package.json').config;
var moment = require('moment');
var express = require('express');
var jade = require('jade');

var app = express();
app.listen(config.web.port);
log.info("Listening on port " + config.web.port);

log.info("Starting up!");

var postsdir = 'posts';

app.get("/", function(req, res){
    var posts = [];
    fs.readdir(postsdir,function(err, files){
        if(err){
            log.error("Unable to read posts directory!");
        } else {
            files.reverse();
            files.forEach(function(file){
                if((file.substring(file.lastIndexOf('.')+1)) == "md"){
                    content = md(fs.readFileSync(postsdir+'/'+file,{'encoding':'utf-8'}));
                    var stat = fs.statSync(postsdir+'/'+file);
                    log.info("Rendering " + file);
                    posts.push({
                        content: content,
                        date: moment(stat.mtime).fromNow(),
                        vdate: stat.mtime
                    });
                } else {
                    log.info("Skipping " + file + " (not Markdown)");
                }
            });
        }
        res.send(jade.renderFile("views/main.jade",{posts:posts,config:config}));
    });
});
