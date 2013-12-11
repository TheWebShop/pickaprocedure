define ['backbone.sharepoint', 'moment'], (SP, moment) ->

  # http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
  string_to_slug = (str) ->
    slug = str.replace /^\s+|\s+$/g, '' # trim
    slug = slug.toLowerCase()

    # remove accents, swap ñ for n, etc
    from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
    to   = 'aaaaeeeeiiiioooouuuunc------'

    for char, i in from.split ''
      slug = slug.replace new RegExp(from.charAt(i), 'g'), to.charAt(i)

    slug = slug.replace(/[^a-z0-9 -]/g, '') # remove invalid chars
    .replace(/\s+/g, '-') # collapse whitespace and replace by -
    .replace(/-+/g, '-') # collapse dashes

    return slug;

  stripHTML = (html) ->
    html.replace(/(<([^>]+)>)/ig, '');

  Procedure = SP.Item.extend
    site: '/rsd/psb',
    list: 'Procedures'

    initialize: ->
      @attributes.modifiedOn = moment(@attributes.Modified).format('MMM Do, YYYY');
      @attributes.slug = string_to_slug @attributes.Title
      @attributes.topics = _.map @attributes.Topics.results, (topic) ->
        topic.Value
      .join ', '
      @attributes.bodyText = stripHTML(@attributes.Body);
