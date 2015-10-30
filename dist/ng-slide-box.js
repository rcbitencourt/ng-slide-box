angular.module("ng-slide-box", []).directive("ngSlideBox", [
  function() {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        label: '@',
        sizes: '=',
        margin: '=',
        opened: '=?'
      },
      template: "<div class=\"title\" ng-click=\"toggle(opened)\" ng-class=\"{'opened': opened}\">\n	<div>\n		<span ng-bind=\"label\"></span>\n	</div>\n</div>\n<div class=\"content\">\n	<div class=\"content-wrapper\" ng-transclude></div>\n</div>",
      link: function(scope, element, attrs) {
        var $content, $text, $title, $titleContent, $window, executeLeftAnimation, executeRightAnimation, getMaxWidth, getMinWidth, init, setOpened;
        $window = $(window);
        $content = element.find('.content');
        $title = element.find('.title');
        $titleContent = $title.find('div');
        $text = $content.find('div.content-wrapper');
        scope.content = $text.text();
        getMinWidth = function() {
          if (scope.sizes) {
            if (scope.sizes.minWidth <= 50 || scope.sizes.minWidth > scope.sizes.maxWidth) {
              return 50;
            } else {
              return scope.sizes.minWidth;
            }
          } else {
            return 50;
          }
        };
        getMaxWidth = function() {
          if (scope.sizes) {
            if (scope.sizes.maxWidth >= $window.width()) {
              return $window.width() - 50;
            } else {
              return scope.sizes.maxWidth;
            }
          } else {
            return 300;
          }
        };
        executeRightAnimation = function() {
          var ref;
          if (scope.opened) {
            element.animate({
              width: (getMaxWidth()) + "px"
            }).delay(1000);
            $content.show().animate({
              left: $title.width(),
              width: (getMaxWidth() - $title.width()) + "px"
            });
            $text.css({
              width: '100%',
              height: '100%'
            });
            return $text.delay(500).fadeIn(500);
          } else {
            element.animate({
              width: ((ref = scope.sizes) != null ? ref.minWidth : void 0) + "px"
            });
            $content.css({
              width: "0px"
            }).hide();
            return $text.hide();
          }
        };
        executeLeftAnimation = function() {
          var ref;
          if (scope.opened) {
            element.animate({
              width: (getMaxWidth()) + "px"
            }).delay(1000);
            $content.show().animate({
              right: $title.width(),
              width: (getMaxWidth() - $title.width()) + "px"
            });
            $text.css({
              width: '100%',
              height: '100%'
            });
            return $text.delay(500).fadeIn(500);
          } else {
            element.animate({
              width: ((ref = scope.sizes) != null ? ref.minWidth : void 0) + "px"
            });
            $content.css({
              width: "0px"
            }).hide();
            return $text.hide();
          }
        };
        setOpened = function() {
          var ref;
          if (((ref = scope.sizes) != null ? ref.side : void 0) === 'right') {
            return executeRightAnimation();
          } else {
            return executeLeftAnimation();
          }
        };
        init = function() {
          var ref, ref1, ref2, ref3, ref4, ref5;
          element.addClass('slide-box');
          if ((ref = scope.sizes) != null ? ref.side : void 0) {
            element.addClass(scope.sizes.side);
          } else {
            element.addClass('right');
          }
          element.css({
            position: 'absolute',
            top: ((ref1 = scope.sizes) != null ? ref1.top : void 0) || '50%',
            width: (getMinWidth()) + "px",
            height: (((ref2 = scope.sizes) != null ? ref2.height : void 0) || 150) + "px"
          });
          if (((ref3 = scope.sizes) != null ? ref3.side : void 0) === 'left') {
            element.css({
              left: 0
            });
          } else {
            element.css({
              right: 0
            });
          }
          $content.css({
            position: 'absolute',
            top: '0',
            margin: '10px 0',
            height: element.height() - 20,
            'z-index': 9,
            'overflow-y': 'auto'
          });
          $title.css({
            position: 'absolute',
            top: '0',
            height: element.height(),
            width: element.width(),
            'z-index': 10
          });
          if (((ref4 = scope.sizes) != null ? ref4.side : void 0) === 'left') {
            $title.css({
              right: 0
            });
          } else {
            $title.css({
              left: 0
            });
          }
          $titleContent.css({
            width: element.height(),
            marginTop: element.height()
          });
          if (((ref5 = scope.sizes) != null ? ref5.side : void 0) === 'left') {
            $titleContent.css({
              float: 'right'
            });
          } else {
            $titleContent.css({
              float: 'left'
            });
          }
          return setOpened();
        };
        scope.toggle = function(toggle) {
          scope.opened = !toggle;
        };
        scope.$watch('opened', function() {
          setOpened();
        });
        return init();
      }
    };
  }
]);
