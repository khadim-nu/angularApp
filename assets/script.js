var myApp = angular.module('uploadApp', []);

myApp.controller('uploadController', function ($scope,$rootScope) {
    $rootScope.fileNames=[
    ];

    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }

        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {

        //FILL FormData WITH FILE DETAILS.
        var data = new FormData();

        for (var i in $scope.files) {
            data.append("file_"+i, $scope.files[i]);
        }

        // ADD LISTENERS.
        var objXhr = new XMLHttpRequest();
        objXhr.addEventListener("progress", updateProgress, false);
        objXhr.addEventListener("load", transferComplete, false);

        // SEND FILE DETAILS TO THE API.
        objXhr.open("POST", "./api.php");
        objXhr.send(data);
         //console.log(e);

    }

    // UPDATE PROGRESS BAR.
    function updateProgress(e) {
        //if (e.lengthComputable) {
            console.log(e.loaded);
            console.log(e.total);
            document.getElementById('pro').setAttribute('value', e.loaded);
            document.getElementById('pro').setAttribute('max', e.total);
       // }
    }

    // CONFIRMATION.
    function transferComplete(e) {
        var response=JSON.parse(e.currentTarget.response);
        console.log(response.files);
        $(".imageWrap").html('');
        var imgSpan1='<span class="img"><img src="uploads/';
        var imgSpan2='"></span>';
        for (var i = response.files.length - 1; i >= 0; i--) {
                var img=imgSpan1+response.files[i]+imgSpan2;
                $(".imageWrap").append(img);
        }
        document.getElementById('status').innerHTML=response.message;
   }
});