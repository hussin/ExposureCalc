var Event = require('event');
var config = require('config');

Math.log2 = Math.log2 || function(x) {
    return Math.log(x)/Math.log(2);
};

var CameraSettings = (function() {

    var self = {};

    var settings = {
        iso: 100,
        ev: 11,
        aperture: 2.8,
        shutter: 1
    };

    updateShutter = function() {
        settings.shutter = Math.pow(settings.aperture, 2)/Math.pow(2, settings.ev + Math.log2(settings.iso/100));
        saveSettings();
        self.fire('settingsChanged');
    };

    var saveSettings = function() {
        localStorage.setItem('settings', 'i:' + settings.iso + ',e:' + settings.ev + ',a:' + settings.aperture);
    };

    var loadSettings = function() {
        var settingsStr = localStorage.getItem('settings');
        var settings = {
            iso: 100,
            ev: 11,
            aperture: 2.8,
            shutter: 1
        };

        if (settingsStr) {
            var settingsArr = settingsStr.split(',');
            for (var item in settingsArr) {
                var setting = settingsArr[item].split(':');
                if (setting.length === 2) {
                    if (setting[0] === 'i') {
                        settings.iso = parseInt(setting[1], 10);
                    } else if (setting[0] === 'e') {
                        settings.ev = parseInt(setting[1], 10);
                    } else if (setting[0] === 'a') {
                        settings.aperture = parseFloat(setting[1]);
                    }
                }
            }
        }
        return settings;
    };

    self.formattedShutter = function() {
        var speed = settings.shutter;
        if (speed < 1) {
            var normSpeed = Math.round(1/speed);

            if (normSpeed === 1) {
                return normSpeed + 's';
            }

            return formatShortTimes(normSpeed);

        } else {
            return formatLongTimes(Math.round(speed));
        }
    };

    var formatShortTimes = function(time) {
        var lower = config.highShutterSpeeds[0];
        var higher = config.highShutterSpeeds[1];

        for (i = 1; i < config.highShutterSpeeds.length; i++) {
            higher = config.highShutterSpeeds[i];
            if (time >= lower && time <= higher) {
                var diffLower = time - lower;
                var diffHigher = higher - time;
                return '1/' + (diffLower < diffHigher ? lower : higher) + 's';
            } else {
                lower = higher;
            }
        }

        return '1/' + higher + 's+';
    };

    var formatLongTimes = function(time) {
        var hours = Math.floor(time / 3600);
        time = time - hours*3600;
        var minutes = Math.floor(time / 60);
        time = time - minutes*60;

        return (hours > 0 ? hours + 'h' : '') +
            (minutes > 0 ? minutes + 'm' : '') +
            time + 's';
    };

    self.iso = function(value) {
        if (value !== undefined) {
            settings.iso = value;
            updateShutter();
        }
        return settings.iso;
    }

    self.ev = function(value) {
        if (value !== undefined) {
            settings.ev = value;
            updateShutter();
        }
        return settings.ev;
    }

    self.aperture = function(value) {
        if (value !== undefined) {
            settings.aperture = value;
            updateShutter();
        }
        return settings.aperture;
    }

    self.shutter = function() {
        return settings.shutter;
    }

    self.increaseIso = function() {
        var index = config.isos.indexOf(self.iso());
        if (index < config.isos.length - 1) {
            self.iso(config.isos[index + 1]);
        }
    };

    self.decreaseIso = function() {
        var index = config.isos.indexOf(self.iso());
        if (index > 0) {
            self.iso(config.isos[index - 1]);
        }
    };

    self.increaseEv = function() {
        var index = config.evs.indexOf(self.ev());
        if (index < config.evs.length - 1) {
            self.ev(config.evs[index + 1]);
        }
    };

    self.decreaseEv = function() {
        var index = config.evs.indexOf(self.ev());
        if (index > 0) {
            self.ev(config.evs[index - 1]);
        }
    };

    self.increaseAperture = function() {
        var index = config.apertures.indexOf(self.aperture());
        if (index < config.apertures.length - 1) {
            self.aperture(config.apertures[index + 1]);
        }
    };

    self.decreaseAperture = function() {
        var index = config.apertures.indexOf(self.aperture());
        if (index > 0) {
            self.aperture(config.apertures[index - 1]);
        }
    };

    self.on = Event.on;
    self.fire = Event.fire;

    settings = loadSettings(); 
    updateShutter();
    return self;

})();


if (typeof module !== 'undefined') {
  module.exports = CameraSettings;
}
