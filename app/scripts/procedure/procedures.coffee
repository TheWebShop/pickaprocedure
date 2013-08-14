define ['backbone.sharepoint', 'procedure/procedure'], (SP, Procedure) ->

  Procedures = SP.List.extend
    model: Procedure
