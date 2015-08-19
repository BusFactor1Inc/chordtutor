var App = Model({
    type: 'App'
});

var app = new App();
var appView = new AppView(app);

$(document).ready(function () {
    $('body').html(appView.$el);
});
