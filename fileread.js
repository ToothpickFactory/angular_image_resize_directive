var dir = angular.module('directive', []);

dir.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
				var img = document.createElement("img");
				img.src = window.URL.createObjectURL(changeEvent.target.files[0]);
				img.onload=function(){
					var canvas_e = document.createElement("canvas");
					var ctx = canvas_e.getContext("2d");
					var MAX_WIDTH = 400;
					var MAX_HEIGHT = 300;
					var width = img.width;
					var height = img.height;
					if (width > height) {
						if (width > MAX_WIDTH) {
							height *= MAX_WIDTH / width;
							width = MAX_WIDTH;
						}
					} else {
						if (height > MAX_HEIGHT) {
							width *= MAX_HEIGHT / height;
							height = MAX_HEIGHT;
						}
					}
					canvas_e.width = width;
					canvas_e.height = height;
					ctx.drawImage(img, 0, 0, width, height);
					
					scope.$apply(function () {
                        scope.fileread = canvas_e.toDataURL("image/jpeg");;
                    });
				}
			});
        }
    }
}]);
