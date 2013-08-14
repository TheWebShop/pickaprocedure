(function() {
  define(['backbone.sharepoint', 'moment'], function(SP, moment) {
    var Procedure, string_to_slug, stripHTML;
    string_to_slug = function(str) {
      var char, from, i, slug, to, _i, _len, _ref;
      slug = str.replace(/^\s+|\s+$/g, '');
      slug = slug.toLowerCase();
      from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
      to = 'aaaaeeeeiiiioooouuuunc------';
      _ref = from.split('');
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        char = _ref[i];
        slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      slug = slug.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      return slug;
    };
    stripHTML = function(html) {
      return html.replace(/(<([^>]+)>)/ig, '');
    };
    return Procedure = SP.Item.extend({
      site: '/rsd/Region5',
      list: 'Procedures',
      initialize: function() {
        this.attributes.modifiedOn = moment(this.attributes.Modified).format('MMM Do, YYYY');
        this.attributes.slug = string_to_slug(this.attributes.Title);
        this.attributes.topics = _.map(this.attributes.Topics.results, function(topic) {
          return topic.Value;
        }).join(', ');
        return this.attributes.bodyText = stripHTML(this.attributes.Body);
      }
    });
  });

}).call(this);
