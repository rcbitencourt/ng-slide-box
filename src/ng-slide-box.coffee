angular.module "ng-slide-box", []


.directive "ngSlideBox", [
	()->
		restrict: 'EA'
		transclude: true
		scope:
			label: '@'
			sizes: '='
			margin: '='
			opened: '=?'
		template: """
			<div class="title" ng-click="toggle(opened)" ng-class="{'opened': opened}">
				<div>
					<span ng-bind="label"></span>
				</div>
			</div>
			<div class="content">
				<div class="content-wrapper" ng-transclude></div>
			</div>
		"""
		link: (scope, element, attrs)->


			$window       = $(window)
			$content      = element.find('.content')
			$title        = element.find('.title')
			$titleContent = $title.find('div')
			$text         = $content.find('div.content-wrapper')

			scope.content = $text.text()


			getMinWidth = ->
				if scope.sizes
					if scope.sizes.minWidth <= 50 or scope.sizes.minWidth > scope.sizes.maxWidth
						return 50
					else
						return scope.sizes.minWidth
				else
					return 50

			getMaxWidth = ->
				if scope.sizes
					if scope.sizes.maxWidth >= $window.width()
						return $window.width() - 50
					else
						return scope.sizes.maxWidth
				else
					return 300

			executeRightAnimation = ->
				if scope.opened
					element
						.animate({width: "#{getMaxWidth()}px"})
						.delay(1000)


					$content
						.show()
						.animate({
								left: $title.width(),
								width: "#{getMaxWidth() - $title.width()}px"
							})


					$text.css
						width: '100%'
						height: '100%'

					$text
						.delay(500)
						.fadeIn(500)

				else

					element
						.animate({width: "#{scope.sizes?.minWidth}px"})

					$content
						.css({
								width: "0px"
							})
						.hide()

					$text
						.hide()


			executeLeftAnimation = ->
				if scope.opened
					element
					.animate({width: "#{getMaxWidth()}px"})
					.delay(1000)

					$content
						.show()
						.animate({
								right: $title.width(),
								width: "#{getMaxWidth() - $title.width()}px"
							})


					$text.css
						width: '100%'
						height: '100%'

					$text
						.delay(500)
						.fadeIn(500)

				else

					element
					.animate({width: "#{scope.sizes?.minWidth}px"})

					$content
					.css({
							width: "0px"
						})
					.hide()

					$text
					.hide()


			setOpened = ->
					if scope.sizes?.side is 'right'
						do executeRightAnimation
					else
						do executeLeftAnimation



			init = ->
				element.addClass 'slide-box'

				if scope.sizes?.side
					element.addClass scope.sizes.side
				else
					element.addClass 'right'

				element.css
					position: 'absolute'
					top: scope.sizes?.top or '50%'
					width: "#{getMinWidth()}px"
					height: "#{scope.sizes?.height or 150}px"

				if scope.sizes?.side is 'left'
					element.css
						left: 0
				else
					element.css
						right: 0


				$content.css
					position: 'absolute'
					top: '0'
					margin: '10px 0'
					height: element.height() - 20
					'z-index': 9
					'overflow-y': 'auto'

				$title.css
					position: 'absolute'
					top: '0'
					height: element.height()
					width: element.width()
					'z-index': 10

				if scope.sizes?.side is 'left'
					$title.css
						right: 0
				else
					$title.css
						left: 0

				$titleContent.css
					width: element.height()
					marginTop: element.height()

				if scope.sizes?.side is 'left'
					$titleContent.css
						float: 'right'
				else
					$titleContent.css
						float: 'left'

				do setOpened

			scope.toggle = (toggle)->
				scope.opened = !toggle
				return


			scope.$watch 'opened', ->
				do setOpened
				return


			do init


]