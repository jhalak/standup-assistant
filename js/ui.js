/**
 * Script for STDUP APP UI
 * 
 * Created by - Onirudda Odikare 
 * 
 */

var SaUi = function() {
    var $talent = $( ".talent" ),
      $project = $( ".project" ),
      $draggableOptions = {
          revert: "invalid",
          containment: "document",
          helper: "clone",
          cursor: "move"
        };

    // let the talent items be draggable
    $( "li", $talent ).draggable($draggableOptions);
    
    attachBdlClick($(".talent li, .project li"));
    
    // let the project be droppable, accepting the talent items
    $project.each(function(idx) {
      $(this).droppable({
        accept: ".talent > li",
        activeClass: "ui-state-highlight",
        drop: function( event, ui ) {
          deleteTalent( ui.draggable, idx);
        }
      })
    });
    
    // make the projects sortable
    $('.projects').sortable();
    
    // let the talent be droppable as well, accepting items from the project
    $talent.droppable({
      accept: ".project li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        revertTalent( ui.draggable );
      }
    });

    // talent deletion function
    var recycle_icon = "";
    function deleteTalent( $item, $idx, $cp ) {
      var $parent = $($project[$idx]);
      if ($cp == undefined) {
        var $curProject = $('#' + $parent.attr('id'));
      }else {
        var $curProject = $cp;
      }
      $item.fadeOut(function() {
        var $list = $( "ul", $curProject ).length ?
          $( "ul", $curProject ) :
          $( "<ul class='talent ui-helper-reset'/>" ).appendTo( $curProject );

        $item.find( "a.ui-icon-project" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn();
      });
    }

    // revert talent function
    var project_icon = "";
    function revertTalent( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .append( project_icon )
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $talent )
          .fadeIn();
      });
    }
    
    // attach dbl click behaviour on talents
    function attachBdlClick($item) {
      $item.dblclick(function() {
        var clone = $(this)
          .clone()
          .appendTo($(this)
          .parents('ul'))
          .draggable($draggableOptions);
        attachBdlClick(clone);
      });
    }
    
    // add talent form
    $("#talent_add_form").dialog({
      autoOpen : false,
      height : 160,
      width : 350,
      modal : true,
      buttons : {
        "Add talent" : function() {
          var bValid = true,
          $talentName = $("#talent_name").val(),
          $talentId = 50; // TODO: need to set it dynamically
          var $newTalent = $(
            '<li id="talent' + $talentId + '" name="' + $talentName + '" tid="' + $talentId + '" class="ui-widget-content ui-corner-tr">' + 
              '<h5 class="ui-widget-header">' + $talentName + '</h5>' + 
            '</li>')
          .draggable($draggableOptions);
          attachBdlClick($newTalent);
          if (bValid) {
            $($talent).append($newTalent);
            $(this).dialog("close");
          }
        },
        Cancel : function() {
          $(this).dialog("close");
        }
      },
      close : function() {
        
      }
    });
    
    // add project form
    $("#project_add_form").dialog({
      autoOpen : false,
      height : 160,
      width : 350,
      modal : true,
      buttons : {
        "Add project" : function() {
          var bValid = true,
          $projectName = $("#project_name").val(),
          $projectId = 50; // TODO: need to set it dynamically
          var $newProject = $(
              '<div id="project' + $projectId + '" name="' + $projectName + '" pid="' + $projectId + '" class="project ui-widget-content ui-state-default">' + 
              '<h4 class="ui-widget-header"><span class="ui-icon ui-icon-project">' + $projectName + '</span> ' + $projectName + '</h4>' + 
              '</div>')
          .droppable({
            accept: ".talent > li",
            activeClass: "ui-state-highlight",
            drop: function( event, ui ) {
              deleteTalent( ui.draggable, $projectId, $newProject);
            }
          });
          if (bValid) {
            $('.projects').append($newProject);
            addProject($projectName);
            $(this).dialog("close");
          }
        },
        Cancel : function() {
          $(this).dialog("close");
        }
      },
      close : function() {
        
      }
    });
    
    // add onclick event in "Add talent" button
    $( "#btn_add_talent" ).button().click(function() {
      $( "#talent_add_form" ).dialog("open");
    });
    
    // add onclick event in "Add project" button
    $( "#btn_add_project" ).button().click(function() {
      $( "#project_add_form" ).dialog("open");
    });
    
    // add onclick event in "Generate report" button
    $( "#btn_gen_report" ).button().click(function() {
      ReportController();
    });
    
    
    
  }