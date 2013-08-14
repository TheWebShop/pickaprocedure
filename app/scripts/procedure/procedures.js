(function() {
  define(['backbone.sharepoint', 'procedure/procedure'], function(SP, Procedure) {
    var Procedures;
    return Procedures = SP.List.extend({
      model: Procedure
    });
  });

}).call(this);
