define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/Region4',
    list: 'ProceduresTopics'
