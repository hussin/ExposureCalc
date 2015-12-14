var Event = function() {

    var self = this;

    self.queue = {};

    return {

        fire: function(event) {
            var queue = self.queue[event];

            if (typeof queue === 'undefined') {
                return;
            }

            for (i in queue) {
                (queue[i])();
            }

        },

        on: function(event, callback) {
            if (typeof self.queue[event] === 'undefined') {
                self.queue[event] = [];
            }

            self.queue[event].push(callback);
        }

    };

}();


if (typeof module !== 'undefined') {
  module.exports = Event;
}
