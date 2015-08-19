var PlayButtonView = View({
    type: 'PlayButtonView',
    model: 'app',
    className: "LargeButton PlayButtonView",
    events: {
        'click': function (e) {
            app.play();
        }
    }
});

var StopButtonView = View({
    type: 'StopButtonView',
    model: 'app',
    className: "LargeButton StopButtonView",
    events: {
        'click': function (e) {
            app.stop();
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
    className: 'TinyButton TempoUpButtonView',
    model: 'app',
    events: {
        'click': function (e) {
            app.tempoUp();
        }
    }
});

var TempoDownButtonView = View({
    type: 'TempoDownButtonView',
    className: 'TinyButton TempoDownButtonView',
    model: 'app',
    events: {
        'click': function (e) {
            app.tempoDown();
        }
    }
});

var TempoLabelValueContainerView = View({
    type: 'TempoLabelValueContainerView',
    init: function (model) {
        this.create('label', new TempoLabelView(model));
        this.create('value', new TempoValueView(model));
    },
    render: function () {
        var html = [
            this.label().$el,
            this.value().$el,
        ];
        return this.$el.html(html);
    }
});

var TempoControlsView = View({
    type: 'TempoControlsView',
    init: function (model) {
        this.create('up', new TempoUpButtonView(model));
        this.create('down', new TempoDownButtonView(model));
    },
    render: function () {
        var html = [
            this.up().$el,
            this.down().$el,
        ];
        return this.$el.html(html);
    }
});

var TempoView = View({
    type: 'TempoView',
    model: 'app',
    init: function () {
        this.create('container', new TempoLabelValueContainerView(this.app));
        this.create('controls', new TempoControlsView(this.app));
    },
    render: function () {
        var html = [
            this.container().$el,
            this.controls().$el,
        ];
        return this.$el.html(html);
    }
});

var TransposeLabelView = View({
    type: 'TransposeLabelView',
});

var TransposeValueView = View({
    type: 'TransposeValueView',
    model: 'app',
    render: function () {
        return this.$el.text(this.app.transpose());
    }
});

var TransposeUpButtonView = View({
    type: 'TransposeUpButtonView',
    className: 'TinyButton TransposeUpButtonView',
    model: 'app',
    events: {
        'click': function (e) {
            app.transposeUp();
        }
    }
});

var TransposeDownButtonView = View({
    type: 'TransposeDownButtonView',
    className: 'TinyButton TransposeDownButtonView',
    model: 'app',
    events: {
        'click': function (e) {
            app.transposeDown();
        }
    }
});

var TransposeControlsView = View({
    type: 'TransposeControlsView',
    model: 'app',
    init: function() {
        this.create('up', new TransposeUpButtonView(this.app));
        this.create('down', new TransposeDownButtonView(this.app));
    },
    render: function() {
        var html = [
            this.up().$el,
            this.down().$el
        ];
        return this.$el.html(html);
    }
});

var TransposeView = View({
    type: 'TransposeView',
    model: 'app',
    init: function () {
        this.create('label', new TransposeLabelView(this.app));
        this.create('value', new TransposeValueView(this.app));
        this.create('controls', new TransposeControlsView(this.app));
    },
    render: function () {
        var html = [
            this.label().$el,
            this.value().$el,
            this.controls().$el
        ];
        return this.$el.html(html);
    }
});

var PlaybackView = View({
    type: 'PlaybackView',
    model: 'app',
    init: function (model) {
        this.create('playback', new PlaybackControlsView(app));
        this.create('tempo', new TempoView(app));
        this.create('transpose', new TransposeView(app));
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
