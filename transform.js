var FeedParser = require('feedparser')
  , fs = require('fs')
  , walk = require('walk');

  // colorful logging
var log = function(msg) {
    console.log(msg); 
};

var logerr = function(msg) {
    console.error(msg); 
};

var items = [];

  var readFile = function(root, name, next) {
    // adding categories
    log('reading file ' + name);

    currentFeed = name.split('.')[0];
    
    fs.createReadStream(root + '/' + name)
        .on('error', function (error) {
            logerr(error);
        })
        .pipe(new FeedParser())
        .on('error', function (error) {
            logerr(error);
        })
        .on('readable', function() {
            var stream = this, item;
            while (item = stream.read()) {
                items.push({
                    'date' : new Date(item.pubDate),
                    'title' : item.title,
                    'link' : item.link,
                    'description' : item.description
                });
            }
        })
        .on('end', function() {
            next();
        });
};

var walker = walk.walk("./feed.rss", {followLinks : false});
walker.on('file', function(root, stat, next){
    readFile(root, stat.name, next);
});

walker.on('end', function() {
    items.sort(function(a , b) {
        return b.date - a.date;
    });
    writeFile();
});

var writeFile = function() {
    log("writing to file ./dist/news.json");
    var min = Math.min(3,items.length);
    fs.writeFile("./dist/news.json", JSON.stringify({'item' : items.slice(0,min)}), (err) => {
        if (err) throw err;
        log('It\'s saved to ' + "./dist/news.json" + '!');
    });
};