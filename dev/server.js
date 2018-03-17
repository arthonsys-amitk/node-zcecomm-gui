"use strict";

var express = require('express'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3011;

app.use(express.static('public'));

// If no route is matched by now, it must be a 404

app.use(function(req, res, next) {
  // If no route is matched by now, it must be a 404
  if (!req.route)
  {
    res.status(404).sendFile(path.join(__dirname + '/404.html'));
  }
});

var server = app.listen(port, function(){
  var portInUse = server.address().port;
  console.log('zenColor Administrator UI Server listening on port %s', portInUse);
});

module.exports = server;
