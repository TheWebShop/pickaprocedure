define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/Region3',
    list: 'ProceduresTopics'
