// var visibleIndicies = function(totalNumberOfCells, numberOfVisibleCells, offset){
//   var visible = []
//   for (var index = 0; index < numberOfVisibleCells; index++){
//     visible[index] = (index+offset) % totalNumberOfCells
//   }
//   return visible
// }

$(() => {

  //CAROUSEL
  ;(function(){

    var isBefore = function(index, visibleCells, cellsLength){
      var beforeFirstIndex = visibleCells[0]-1
      if (beforeFirstIndex < 0) beforeFirstIndex += cellsLength
      return index === beforeFirstIndex
    }

    var isAfter = function(index, visibleCells, cellsLength){
      var afterLastIndex = visibleCells[visibleCells.length-1]+1
      if (afterLastIndex > cellsLength) afterLastIndex -= cellsLength
      return index === afterLastIndex
    }

    var positionGalleryFilmstrip = function(offset, animate=true){
      var filmstrip = $('.gallery-filmstrip')
      var numberOfCells = 5;
      var cells = filmstrip.children()
      if (offset < 0) offset += cells.length
      var visibleCells = visibleIndicies(cells.length, numberOfCells, offset)
      if (animate){
        filmstrip.addClass('gallery-filmstrip-animated')
      }else{
        filmstrip.removeClass('gallery-filmstrip-animated')
      }
      cells.each(function(index){
        var cell = $(this)
        var position = visibleCells.indexOf(index)
        if (isBefore(index, visibleCells, cells.length)){
          cell.css({
            display: 'block',
            zIndex: '0',
            opacity: '0',
            transform: 'translateX(100px) translateY(31px) scale(.6)',
          })
        }else if (isAfter(index, visibleCells, cells.length)){
          cell.css({
            display: 'block',
            zIndex: '0',
            opacity: '0',
            transform: 'translateX(890px) translateY(31px) scale(.6)',
          })
        }else if (position === -1){
          cell.css({
            display: 'none',
            zIndex: '0',
            opacity: '1',
            transform: '',
          })
        }else{
          cell.css({
            display: 'block',
            zIndex: zIndexForPosition(position),
            opacity: opacityForPosition(position),
            transform: transformForPosition(position),
          })
        }
        if (position === 2){
          var src = cell.find('> img').attr('src')
          var image = $('<img>').attr('src', src)
          var gallery = filmstrip.closest('.gallery')
          var galleryMain = gallery.find('> .gallery-main')
          var currentImageWrapper = galleryMain.find('.gallery-main-image:first')
          var nextImageWrapper = currentImageWrapper.clone()
          var nextImage = nextImageWrapper.find('> img')
          if (nextImage.attr('src') === src) return;
          nextImage.attr('src', src)
          galleryMain.prepend(nextImageWrapper)
          currentImageWrapper.fadeOut(function(){
            currentImageWrapper.remove()
          })
        }
      })
    }

    var initializeGallery = function() {
      if ($('.gallery-filmstrip').length === 0) return;
      positionGalleryFilmstrip(0, false)

      $('.gallery-filmstrip > *').on('click', function(event) {
        event.preventDefault();
        var cell = $(this);
        var index = cell.index()
        console.log('CLICKED', index)
        positionGalleryFilmstrip(index-2)
      })
    }
    var zIndexForPosition = function(position){
      return (
        (position === 0 || position === 4) ? 1 :
        (position === 1 || position === 3) ? 2 :
        3
      )
    }
    var opacityForPosition = function(position){
      return (
        (position === 0 || position === 4) ? 0.4 :
        (position === 1 || position === 3) ? 0.7 :
        1
      )
    }
    var transformForPosition = function(position){
      return ({
        0: 'translateX(0px) translateY(31px) scale(.8)',
        1: 'translateX(140px) translateY(31px) scale(1)',
        2: 'translateX(340px) translateY(31px) scale(1.3)',
        3: 'translateX(540px) translateY(31px) scale(1)',
        4: 'translateX(700px) translateY(31px) scale(.8)',
      })[position]
    }
    var visibleIndicies = function(totalNumberOfCells, numberOfVisibleCells, offset){
      var visible = []
      for (var index = 0; index < numberOfVisibleCells; index++) {
        visible[index] = (index+offset) % totalNumberOfCells
      }
      return visible
    }


    initializeGallery()


  })();
