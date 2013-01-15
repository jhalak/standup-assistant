/**
 * Script for STDUP APP
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
        recycleImage( ui.draggable );
      }
    });

    // image deletion function
    var recycle_icon = "";
    function deleteImage( $item, $idx ) {
      var $parent = $($project[$idx]);
      console.log($parent.attr('id'));
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
    function recycleImage( $item ) {
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

    // image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage( $link ) {
      var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );

      if ( $modal.length ) {
        $modal.dialog( "open" );
      } else {
        var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
          .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1 );
      }
    }

    // resolve the icons behavior with event delegation
    $( "ul.talent > li" ).click(function( event ) {
      var $item = $( this ),
        $target = $( event.target );

      if ( $target.is( "a.ui-icon-project" ) ) {
        deleteImage( $item );
      } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
        viewLargerImage( $target );
      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }

      return false;
    });
  });