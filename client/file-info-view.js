var FileInfoTitleView = View({
    type: 'FileInfoTitleView',
    model: 'song',
    render: function () {
        return this.$el.text('Title: ' + this.song.title());
    }
});

var FileInfoAuthorView = View({
    type: 'FileInfoAuthorView',
    model: 'song',
    render: function () {
        return this.$el.text('Author: ' + this.song.author());
    }
});

var FileInfoSelectView = View({
    type: 'FileInfoUploadView',
    tagName: "input type='button' value='Select...'",
    className: 'Button',
});

var FileInfoUploadView = View({
    type: 'FileInfoUploadView',
    tagName: "input type='button' value='Upload'",
    className: 'Button',
});

var FileInfoView = View({
    type: 'FileInfoView',
    model: 'song',
    init: function (model) {
        this.create('title', new FileInfoTitleView(this.song));
        this.create('author', new FileInfoAuthorView(this.song));
        this.create('select', new FileInfoSelectView(this.song));
        this.create('upload', new FileInfoUploadView(this.song));
    },
    render: function () {
        var html = [
            this.title().$el,
            this.author().$el,
            this.select().$el,
            this.upload().$el
        ];
                        
        return this.$el.html(html);
    }
});
