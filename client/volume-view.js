var VolumeUpButtonView = View({
    type: 'TinyButton VolumeUpButtonView',
    events: {
        'click': function () {
            alert('Volume Up');
        }
    }
});

var VolumeDownButtonView = View({
    type: 'TinyButton VolumeDownButtonView',
    events: {
        'click': function () {
            alert('Volume Down');
        }
    }
});

var VolumeControlsView = View({
    type: 'VolumeControlsView',
    init: function (model) {
        this.create('up', new VolumeUpButtonView(model));
        this.create('down', new VolumeDownButtonView(model));
    },
    render: function () {
        var html = [
            this.up().$el,
            this.down().$el,
        ];
        return this.$el.html(html);
    }
});

var VolumeToggleButtonView = View({
    type: 'LargeButton VolumeToggleButtonView',
    events: {
        'click': function () {
            alert('Volume Toggle');
        }
    }
});

var VolumeView = View({
    type: 'VolumeView',
    init: function (model) {
        this.create('toggle', new VolumeToggleButtonView(model));
        this.create('controls', new VolumeControlsView(model));
    },
    render: function () {
        var html = [
            this.toggle().$el,
            this.controls().$el
        ];
        return this.$el.html(html);
    }
});
