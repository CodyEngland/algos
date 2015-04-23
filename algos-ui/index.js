/*
 * Quick and dirty web server for testing.
 * Doesn't require any third party modules.
 * Doesn't call any other code.
 */
var http = require('http');
var fs = require('fs');
var URL = require('url');
var exec = require('child_process').exec;
var BASE = "/app/public";

var mime = {
    'js': 'application/javascript',
    'html': 'text/html',
    'json': 'application/json',
    'csv': 'text/csv',
    'css': 'text/css',
    'less': 'text/less'
};

var server = http.createServer(function(req, res) {
    var url = URL.parse(req.url);

    console.log('%s - %s - %s', new Date(), BASE + url.pathname, url.query);

    if (url.pathname === "/" || url.pathname === "") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        return res.end(fs.readFileSync(BASE + '/index.html'));
    }

    var ext = url.pathname.match(/\.(\w+)$/);
    ext = (ext && ext.length) ? mime[ext.pop()] || 'text/plain' : 'text/plain';

    //var ext = mime[url.pathname.match(/\.(\w+)$/).pop()]||'text/plain'
    //console.log('%s - %s - %s',new Date(),BASE+url.pathname,url.query);

    if (fs.existsSync(BASE + url.pathname)) {
        try {
            var file = fs.readFileSync(BASE + url.pathname);
            res.writeHead(200, {
                'Content-Type': ext
            });
            return res.end(file);
        } catch (e) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            return res.end('500 Internal server Error: ' + JSON.stringify(e));
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        return res.end('404 could not find page: ' + BASE + url.pathname);
    }
});

server.listen(8080);
