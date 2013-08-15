define ['backbone.sharepoint'], (SP) ->

  Topic = SP.Item.extend
    site: '/rsd/pscc',
    list: 'ProceduresTopics'
