$(document)
    .ready(
        function() {
          var crudServiceBaseUrl = "api/index.php", dataSource = new kendo.data.DataSource(
              {
                transport : {
                  read : {
                    url : crudServiceBaseUrl + "?q=project&action=list",
                    dataType : "json"
                  },
                  update : {
                    url : crudServiceBaseUrl + "?q=project&action=update",
                    dataType : "json"
                  },
                  destroy : {
                    url : crudServiceBaseUrl + "?q=project&action=delete",
                    dataType : "json"
                  },
                  create : {
                    url : crudServiceBaseUrl + "?q=project&action=add",
                    dataType : "json"
                  },
                  parameterMap : function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {
                        models : kendo.stringify(options.models)
                      };
                    }
                  }
                },
                batch : true,
                pageSize : 10,
                schema : {
                  model : {
                    id: "id",
                    fields : {
                      id : {
                        editable : false,
                        nullable : true
                      },
                      name : {
                        required : true
                      },
                      type : {
                        editable : false
                      }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource : dataSource,
            pageable : true,
            height : 506,
            toolbar : [ "create" ],
            columns : [
            {
              field : "name",
              title : "Prject Name",
              width : "250px"
            },
            { 
              command: ["edit", "destroy"], 
              title: "Operation", 
              width: "150px" 
            }
            ],
            editable : "inline"
          });
        });