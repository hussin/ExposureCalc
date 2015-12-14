var UI = require('ui');
var CameraSettings = require('camera_settings');
var config = require('config');

var SelectionWindow = function(list, prefix, currentValue, referenceValues) {
    
    this.window = new UI.Menu({
        backgroundColor: config.colors.bg,
        textColor: config.colors.text,
        highlightTextColor: config.colors.activeText,
        highlightBackgroundColor: config.colors.activeBg,
    });

    var selectWindow = this.window;

    for (var i = 0; i < list.length; ++i) {
        if (!referenceValues) {
            this.window.item(0, i, {title: prefix + list[i]});
        } else {
            this.window.item(0, i, {
                title: prefix + list[i],
                subtitle: referenceValues[i],
            });
        }
        if (currentValue === list[i]) {
            this.window.selection(0, i);
        }
    }

};

SelectionWindow.prototype.draw = function() {
    this.window.show();
};

if (typeof module !== 'undefined') {
  module.exports = SelectionWindow;
}
