var HomeWindow = require('home');
var CameraSettings = require('camera_settings');
var config = require('config');

var run = function() {
    var home = new HomeWindow();
    home.draw();
    
    home.window.on('click', 'down', function(e) {
        home.selectNextValue();
    });

    home.window.on('click', 'up', function(e) {
        home.selectPrevValue();
    });

    home.window.on('click', 'select', function(e) {
        home.moveToNext();
    });

    CameraSettings.on('settingsChanged', function() {
        home.updateData();
    });
};

run();
