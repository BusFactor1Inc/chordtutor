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
    type: 'TinyButton InstrumentSelectNextButtonView',
    model: 'instruments',
    events: {
        'click': function (e) {
            if(!this.instruments.next())
                this.instruments.start();
            this.trigger('select', this.instruments.current());
        }
    }
});

var InstrumentSelectPrevButtonView = View({
    type: 'TinyButton InstrumentSelectPrevButtonView',
    model: 'instruments',
    events: {
        'click': function (e) {
            if(!this.instruments.prev())
                this.instruments.end();
            this.trigger('select', this.instruments.current());
        }
    }
});

var InstrumentSelectControlsView = View({
    type: 'InstrumentSelectControlsView',
    model: 'instruments',
    init: function () {
        this.create('next', new InstrumentSelectNextButtonView(instruments));
        this.create('prev', new InstrumentSelectPrevButtonView(instruments));

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
        this.instruments.start();
        this.create('name', new InstrumentSelectNameView(this.instruments.at(0)));
        this.create('controls', new InstrumentSelectControlsView(model));
        this.trigger('instrument', this.instruments.at(0));
        this.on('select', function (e) {
            this.name(new InstrumentSelectNameView(this.instruments.current()));
            this.trigger('instrumentSelect', e.value);
            this.render();
        });
    },
    render: function () {
        var html = [
            this.name().$el,
            this.controls().$el,
        ];
        return this.$el.html(html);
    }
});

