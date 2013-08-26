var config = require('./package.json').config;
var express = require('express');
var fs = require('fs');
var jade = require('jade');
var log = require('./log');
var md = require('marked');
var moment = require('moment');
var rss = require('rss');

var app = express();

app.listen(config.web.port);
log.info("Listening on port " + config.web.port);

log.info("Starting up!");

var postsdir = 'posts';

app.get("/", function(req, res){
    var posts = getPosts();
    res.send(jade.renderFile("views/main.jade",{posts:posts,config:config}));
});

app.get("/rss", function(req, res){
    log.info("Rendering RSS");
    var posts = getPosts();
    var feed = new rss({
        title: config.web.header,
        description: config.web.description,
        feed_url: config.web.url + '/rss',
        site_url: config.web.url
    });
    posts.forEach(function(post){
        feed.item({
            date: post.date,
            description: post.content,
            title: post.content.substr(0, post.content.indexOf('\n')).replace(/<(?:.|\n)*?>/gm, '')
        });
    });
    res.send(feed.xml(true));
});

function getPosts(){
    var posts = [];
    var files = fs.readdirSync(postsdir);
    files.reverse();
    files.forEach(function(file){
        if((file.substring(file.lastIndexOf('.')+1)) == "md"){
            content = md(fs.readFileSync(postsdir+'/'+file,{'encoding':'utf-8'}));
            var stat = fs.statSync(postsdir+'/'+file);
            log.info("Rendering " + file);
            var post = {
                content: content,
                date: moment(stat.mtime).fromNow(),
                vdate: stat.mtime
            };
            posts.push(post);
        } else {
            log.info("Skipping " + file + " (not Markdown)");
        }
    });
    return posts;
}
