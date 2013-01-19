/**
 * Script for STDUP APP UI
 * 
 * Created by - Onirudda Odikare 
 * 
 */

$(function() {
    // there's the talent and the project
    var $talent = $( ".talent" ),
      $project = $( ".project" );

    // let the talent items be draggable
    $( "li", $talent ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
    
    attachBdlClick($(".talent li, .project li"));
    
    // let the project be droppable, accepting the talent items
    $project.each(function(idx) {
      $(this).droppable({
        accept: ".talent > li",
        activeClass: "ui-state-highlight",
        drop: function( event, ui ) {
          deleteImage( ui.draggable, idx);
        }
      })
    });

    // let the talent be droppable as well, accepting items from the project
    $talent.droppable({
      accept: ".project li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        revertImage( ui.draggable );
      }
    });

    // talent deletion function
    var recycle_icon = "";
    function deleteImage( $item, $idx ) {
      var $parent = $($project[$idx]);
      var $curProject = $('#' + $parent.attr('id'));
      $item.fadeOut(function() {
        var $list = $( "ul", $curProject ).length ?
          $( "ul", $curProject ) :
          $( "<ul class='talent ui-helper-reset'/>" ).appendTo( $curProject );

        $item.find( "a.ui-icon-project" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn();
      });
    }

    // image recycle function
    var project_icon = "";
    function revertImage( $item ) {
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
    
    function attachBdlClick($item) {
      $item.dblclick(function() {
        var clone = $(this).clone().appendTo($(this).parents('ul')).draggable({
          cancel: "a.ui-icon", // clicking an icon won't initiate dragging
          revert: "invalid", // when not dropped, the item will revert back to its initial position
          containment: "document",
          helper: "clone",
          cursor: "move"
        });
        attachBdlClick(clone);
      });
    }
    
    
    
  });