var UI = require('ui');
var Vector2 = require('vector2');
var CameraSettings = require('camera_settings');
var config = require('config');

var HomeWindow = function() {

    var shutterTitle = 86;
    var baseX = 0;
    this.maxShutterLen = 6;

    if (Pebble.getActiveWatchInfo().platform === 'chalk') {
        baseX = 17;
        this.maxShutterLen = 5;
    }

    var arrowPositions = {
        ISO: baseX + 17,
        EV: baseX + 64,
        APERTURE: baseX + 111
    }

    var smallBox = new Vector2(44, 2);
    var textBox = new Vector2(44, 30);

    var homeWindow = this;

    this.statusOrder = [
        arrowPositions.ISO,
        arrowPositions.EV,
        arrowPositions.APERTURE
    ];
    this.upArrowTop = 3;
    this.downArrowTop = 46;

    this.curStatus = config.statuses.ISO;

    this.window = new UI.Window({
        backgroundColor: config.colors.bg
    });

    this.selectionBox = new UI.Rect({
        position: new Vector2(baseX + 3, 43),
        size: new Vector2(40,48),
        borderColor: 'clear',
        backgroundColor: config.colors.activeBg,
    });

    this.arrowUp = new UI.Image({
	position: new Vector2(baseX + 17, this.upArrowTop),
	size: new Vector2(15, 7),
	image: 'images/up.png'
    });
    
    this.arrowDown = new UI.Image({
	position: new Vector2(baseX + 17, this.downArrowTop),
	size: new Vector2(15, 7),
	image: 'images/down.png'
    });

    this.arrowUp.compositing('set');
    this.arrowDown.compositing('set');

    this.labels = {
        iso: new UI.Text({
            text: 'ISO',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 3, 9),
            size: textBox,
            font: config.fonts.base
        }),
        ev: new UI.Text({
            text: 'EV',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 50, 9),
            size: textBox,
            font: config.fonts.base
        }),
        aperture: new UI.Text({
            text: 'f/',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 97, 9),
            size: smallBox,
            font: config.fonts.base
        }),
        shutter: new UI.Text({
            text: 'Shutter Speed',
            color: config.colors.activeText,
            backgroundColor: config.colors.activeBg,
            textAlign: 'center',
            position: new Vector2(baseX + 3, shutterTitle),
            size: new Vector2(138, 19),
            font: config.fonts.base
        })
    };

    this.fields = {
        iso: new UI.Text({
            text: '100',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 3, 24),
            size: textBox,
            font: config.fonts.data
        }),
        ev: new UI.Text({
            text: '10',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 50, 24),
            size: textBox,
            font: config.fonts.data
        }),
        aperture: new UI.Text({
            text: '2.8',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 97, 24),
            size: smallBox,
            font: config.fonts.data
        }),
        shutter: new UI.Text({
            text: '1/100s',
            color: config.colors.text,
            textAlign: 'center',
            position: new Vector2(baseX + 3, shutterTitle + 20),
            size: new Vector2(136, 70),
            font: config.fonts.bigData
        }),
        evDesc: new UI.Text({
            text: '',
            color: config.colors.text,
            textAlign: 'center',
            textOverflow: 'wrap',
            position: new Vector2(baseX + 3, this.downArrowTop + 6),
            size: new Vector2(136, 40),
            font: config.fonts.base
        })
    };

};


HomeWindow.prototype.updateData = function() {
    var shutterLenBefore = this.fields.shutter.text().length;

    var shutter = CameraSettings.formattedShutter();

    this.fields.iso.text(CameraSettings.iso());
    this.fields.ev.text(CameraSettings.ev());
    this.fields.aperture.text(CameraSettings.aperture());
    this.fields.shutter.text(shutter);
    this.fields.evDesc.text(config.evReferences[CameraSettings.ev() - config.evs[0]]);

    var shutterLenAfter = shutter.length;

    if (shutterLenAfter != shutterLenBefore) {
        if (shutterLenAfter > this.maxShutterLen) {
            this.fields.shutter.font(config.fonts.longBigData);
        } else {
            this.fields.shutter.font(config.fonts.bigData);
        }
    }
};

HomeWindow.prototype.moveCursor = function(xPos) {
    var curPosX = this.arrowUp.position().x;
    this.arrowUp
        .animate('position', new Vector2(curPosX, this.upArrowTop + 2), 10)
        .queue(function(next) {next();});
    this.arrowUp
        .animate('position', new Vector2(xPos, this.upArrowTop), 100)
        .queue(function(next) {next();});
    this.arrowUp
        .animate('position', new Vector2(xPos, this.upArrowTop), 10)
        .queue(function(next) {next();});
    
    this.arrowDown
        .animate('position',  new Vector2(curPosX, this.downArrowTop - 2), 10)
        .queue(function(next) {next();});
    this.arrowDown
        .animate('position', new Vector2(xPos, this.downArrowTop), 100)
        .queue(function(next) {next();});
    this.arrowDown
        .animate('position', new Vector2(xPos, this.downArrowTop), 10)
        .queue(function(next) {next();});
};

HomeWindow.prototype.selectPrevValue = function() {
    var curPosX = this.arrowUp.position().x;
    this.arrowUp
        .animate('position', new Vector2(curPosX, this.upArrowTop - 3), 10)
        .queue(function(next) {next();});
    this.arrowUp
        .animate('position', new Vector2(curPosX, this.upArrowTop), 10)
        .queue(function(next) {next();});

    if (this.curStatus === config.statuses.ISO) {
        CameraSettings.increaseIso();
    } else if (this.curStatus === config.statuses.EV) {
        CameraSettings.increaseEv();
    } else if (this.curStatus === config.statuses.APERTURE) {
        CameraSettings.increaseAperture();
    }
};

HomeWindow.prototype.selectNextValue = function() {
    var curPosX = this.arrowDown.position().x;
    this.arrowDown
        .animate('position', new Vector2(curPosX, this.downArrowTop + 3), 10)
        .queue(function(next) {next();});
    this.arrowDown
        .animate('position', new Vector2(curPosX, this.downArrowTop), 10)
        .queue(function(next) {next();});

    if (this.curStatus === config.statuses.ISO) {
        CameraSettings.decreaseIso();
    } else if (this.curStatus === config.statuses.EV) {
        CameraSettings.decreaseEv();
    } else if (this.curStatus === config.statuses.APERTURE) {
        CameraSettings.decreaseAperture();
    }
};

HomeWindow.prototype.moveToNext = function() {
    this.curStatus = (this.curStatus + 1) % 3;
    this.moveCursor(this.statusOrder[this.curStatus]);
};

HomeWindow.prototype.moveToPrev = function() {
    this.curStatus = (this.curStatus === 0 ? 2 : this.curStatus - 1);
    this.moveCursor(this.statusOrder[this.curStatus]);
};

HomeWindow.prototype.draw = function() {
    var item;
    var current = this.statusOrder[this.curStatus];
    this.arrowUp.position(new Vector2(current, this.upArrowTop));
    this.arrowDown.position(new Vector2(current, this.downArrowTop));
    this.window.add(this.arrowUp);
    this.window.add(this.arrowDown);

    for (item in this.labels) {
        this.window.add(this.labels[item]);
    }
    for (item in this.fields) {
        this.window.add(this.fields[item]);
    }

    this.updateData();

    this.window.show();
};

if (typeof module !== 'undefined') {
  module.exports = HomeWindow;
}
