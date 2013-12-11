define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/psb',
    list: 'ProceduresTestTopics'
