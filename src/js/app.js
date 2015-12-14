var HomeWindow = require('home');
var SelectionWindow = require('selection');
var CameraSettings = require('camera_settings');
var config = require('config');

var run = function() {
    var aperture, iso, ev;
    var home = new HomeWindow();
    home.draw();
    
    home.window.on('click', 'up', function(e) {
        home.moveToNext();
    });

    home.window.on('click', 'down', function(e) {
        home.moveToPrev();
    });

    home.window.on('click', 'select', function(e) {
        var status = home.curStatus;
        if (status === config.statuses.ISO) {
            if (!iso) {
                iso = new SelectionWindow(config.isos, 'ISO ', CameraSettings.iso());
                iso.window.on('select', function(e) {
                    var index = e.itemIndex;
                    CameraSettings.iso(config.isos[index]);
                    iso.window.hide();
                });
            }
            iso.draw();
        } else if (status === config.statuses.EV) {
            if (!ev) {
                ev = new SelectionWindow(config.evs, 'EV ', CameraSettings.ev(), config.evReferences);
                ev.window.on('select', function(e) {
                    var index = e.itemIndex;
                    CameraSettings.ev(config.evs[index]);
                    ev.window.hide();
                });
            }
            ev.draw();

        } else if (status === config.statuses.APERTURE) {
            if (!aperture) {
                aperture = new SelectionWindow(config.apertures, 'f/', CameraSettings.aperture());
                aperture.window.on('select', function(e) {
                    var index = e.itemIndex;
                    CameraSettings.aperture(config.apertures[index]);
                    aperture.window.hide();
                });
            }
            aperture.draw();
        }
    });

    CameraSettings.on('settingsChanged', function() {
        home.updateData();
    });
};

run();
