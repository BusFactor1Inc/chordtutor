var InstrumentSelectNameView = View({
    type: 'InstrumentSelectNameView',
    model: 'instrument',
    init: function (model) {
    },
    render: function () {
        this.$el.html(this.instrument.name());
    }
});

var InstrumentSelectNextButtonView = View({
    type: 'TinyButton InstrumentSelectNextButtonView'
});

var InstrumentSelectPrevButtonView = View({
    type: 'TinyButton InstrumentSelectPrevButtonView'
});

var InstrumentSelectControlsView = View({
    type: 'InstrumentSelectControlsView',
    model: 'instruments',
    init: function () {
        this.create('current', this.instruments.at(0));
        this.create('next', new InstrumentSelectNextButtonView(this.current()));
        this.create('prev', new InstrumentSelectPrevButtonView(this.current()));
    },
    render: function () {
        var html = [
            this.next().$el,
            this.prev().$el
        ];
        return this.$el.html(html);
    }
});

var InstrumentSelectView = View({
    type: 'InstrumentSelectView',
    model: 'instruments',
    init: function (model) {
        this.create('name', new InstrumentSelectNameView(this.instruments.at(0)));
        this.create('controls', new InstrumentSelectControlsView(model));
    },
    render: function () {
        var html = [
            this.name().$el,
            this.controls().$el,
        ];
        return this.$el.html(html);
    }
});

