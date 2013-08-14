(function() {
  define(['backbone.sharepoint', 'topic/topic'], function(SP, Topic) {
    var Topics;
    return Topics = SP.List.extend({
      model: Topic
    });
  });

}).call(this);
