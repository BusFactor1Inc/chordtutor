var Parser = function (file) {
  this.file = file;
  this.songData = {};
};

Parser.prototype.do = function() {
  
  var songJSON = {};
  var bodyArray = _.filter(this.file.split(':'), function(s) {
    return !!s.trim();
  });

  // header
  var header = this.extractHeader(bodyArray);
  this.parseHeader(header);

  // sections
  this.parseSections(bodyArray);
};

Parser.prototype.extractHeader = function (bodyArray) {
  var index = -1;
  for (var i = 0; i < bodyArray.length; i++) {
    if (bodyArray[i].indexOf("section=") > -1) {
        index = i;
        break;
    }
  } 

  var header;
  if (index !== -1) {
    header = bodyArray.splice(0, index);
  }

  return header;
};

Parser.prototype.parseHeader = function (header) {
  if (header.length < 1)
    return;

  _.each(header, function (s) {
    if (s.indexOf('title=') > -1) {
      this.songData.title = s.split('title=')[1];
    } else if (s.indexOf('author=') > -1) {
      this.songData.author = s.split('author=')[1];
    } else if (s.indexOf('beatsPerMinute=') > -1) {
      this.songData.beatsPerMinute = s.split('beatsPerMinute=')[1];
    } else if (s.indexOf('beatsPerMeasure=') > -1) {
      this.songData.beatsPerMeasure = s.split('beatsPerMeasure=')[1];
    } else if (s.indexOf('key=') > -1) {
      this.songData.key = s.split('key=')[1];
    }
  }, this);
};

Parser.prototype.parseSections = function (sectionArray) {  
  this.songData.sections = [];
  var lastSection;
  var measure = 0;
  _.each(sectionArray, function (s) {
    if (s.indexOf('section=') > -1) {
      lastSection = {};
      lastSection.name = s.split('section=')[1];
      lastSection.measure = measure;
      lastSection.chords = []; 
    } else if (lastSection) {
      lastSection.chords = _.filter(s.split('|'), function (c) {
        return !!c.trim();
      });
      measure += lastSection.chords.length;
      this.songData.sections.push(lastSection);
    }
  }, this);
};

var mock_file = " \
:title=My first song: \
:author=Steely Dan: \
:beatsPerMinute=120: \
:beatsPerMeasure=4: \
:key=C: \
:section=Intro: \
:|Dm|C|Dm|C|: \
:section=Verse1: \
:|C|Em C| \
 |Em|G C| \
 |C|Em|C4 G7|C| \
 |C F|C G|: \
:section=Interlude: \
:|C|C|C G|G C| \
 |C F|C G|: \
:section=Verse2: \
:|C F|C G| \
 |C F|C G|: \
:section=End: \
:|Dm|C|Dm|C|: ";

var parser = new Parser(mock_file);
parser.do();

console.log(parser.songData);
