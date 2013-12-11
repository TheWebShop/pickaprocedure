(function() {
  define(['backbone.sharepoint'], function(SP) {
    var Topic;
    return Topic = SP.Item.extend({
      site: '/rsd/psb',
      list: 'ProceduresTestTopics'
    });
  });

}).call(this);
