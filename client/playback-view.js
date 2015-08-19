var PlayButtonView = View({
    type: 'PlayButtonView',
    className: "LargeButton PlayButtonView",
    events: {
        'click': function (e) {
            alert('Playing');
        }
    }
});

var StopButtonView = View({
    type: 'StopButtonView',
    className: "LargeButton StopButtonView",
    events: {
        'click': function (e) {
            alert('Stoping');
        }
    }
});

var PlaybackControlsView = View({
    type: 'PlaybackControlsView',
    model: 'app',
    init: function (model) {
        this.create('play', new PlayButtonView(app));
        this.create('stop', new StopButtonView(app));
    },
    render: function () {
        var html = [
            this.play().$el,
            this.stop().$el
        ];
        return this.$el.html(html);
    }
});

var TempoLabelView = View({
    type: 'TempoLabelView',
    render: function () {
        return this.$el.text("Tempo");
    }
});

var TempoValueView = View({
    type: 'TempoValueView',
    model: 'app',
    render: function () {
        return this.$el.text(this.app.tempo());
    }
});

var TempoUpButtonView = View({
    type: 'TempoUpButtonView',
    events: {
        'click': function (e) {
            alert("Tempo Up");
        }
    }
});

var TempoDownButtonView = View({
    type: 'TempoDownButtonView',
    events: {
        'click': function (e) {
            alert("Tempo Down");
        }
    }
});

var TempoControlsView = View({
    type: 'TempoControlsView',
    model: 'app',
    init: function () {
        this.create('label', new TempoLabelView(this.app));
        this.create('value', new TempoValueView(this.app));
        this.create('up', new TempoUpButtonView(this.app));
        this.create('down', new TempoDownButtonView(this.app));
    },
    render: function () {
        var html = [
            this.label().$el,
            this.value().$el,
            this.up().$el,
            this.down().$el
        ];
        return this.$el.html(html);
    }
});
                                
var TransposeControlsView = View({
    type: 'TransposeControlsView'
});
                                
var PlaybackView = View({
    type: 'PlaybackView',
    model: 'app',
    init: function (model) {
        this.create('playback', new PlaybackControlsView(app));
        this.create('tempo', new TempoControlsView(app));
        this.create('transpose', new TransposeControlsView(app));
    },
    render: function () {
        var html = [
            this.playback().$el,
            this.tempo().$el,
            this.transpose().$el
        ];
        return this.$el.html(html);
    }
});
