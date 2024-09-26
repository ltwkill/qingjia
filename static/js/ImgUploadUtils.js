var oldBase64;
    function delImg(i) {
        $('#img_util' + i).attr('src', '');
        $('#picpath' + i).val('');
        $('#deleteBtn_' + i).remove();
    }
    function changeUpload(base64, upUrl, index) {
        $.ajax({
            url: upUrl,
            data: {'base64': base64},
            type: "POST",
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result.code == "0") {
                    $('#picpath'+index).val(result.data.src);
                    $('#deleteBtn_' + index).remove();
                    $("#uploadImg"+index).parent().append("<button type='button' class=\"delete-btn\" id='deleteBtn_" + index + "' onclick='delImg(" + index + ")'>&times;</button>");
                } else {
                    $.alert("上传失败:"+result.msg);
                }
            }
        });
    }
    function setIntervalGetImg(upUrl, index) {
        var intervalId = setInterval(function () {
            var base64 = $("#img_util"+index).attr("src");
            var src = "/static/images/shangchuan.png";
            if(base64 != null && base64 != '' && base64 != src && oldBase64 != base64){
                oldBase64 = base64;
                changeUpload(base64, upUrl, index);
                clearInterval(intervalId);
            }
        }, 100);
    }
    function uploadImgOne(upUrl, index) {
        var $c = document.querySelector("#uploadImg"+index);//上传出发按钮
        var file = $c.files[0];//获取file对象单张
        if (file) {
            var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
            if (!rFilter.test(file.type)) {
                //showMyTips("请选择jpeg、png格式的图片", false);
                alert("请选择jpeg、png格式的图片");
                return;
            }
            var distImg = document.getElementById('img_util'+index);
            renderFileChangedImg(file, distImg);
            setIntervalGetImg(upUrl, index);
        }
    }
    function renderFileChangedImg(img, distImg) {
        return new Promise(function (resolve) {
            var mpImg = new MegaPixImage(img);
            // img 为用户上传的图片 ，通过exif获取图片的信息
            detectImageAutomaticRotation().then(result => {
                // 如果为true,则为ios高,false为ios低和android
                if (result) {
                    //console.log("不需要旋转")
                    mpImg.render(distImg, {
                        // maxWidth: 616,
                        // maxHeight: 616,
                        quality: 0.7
                    }, resolve)
                } else {
                    //console.log("需要旋转")
                    EXIF.getData(img, () => {
                        var allMetaData = EXIF.getAllTags(img);
                        // 获取图片的旋转信息
                        var orientation = allMetaData.Orientation;
                        //console.log(orientation)
                        mpImg.render(distImg, {
                            // maxWidth: 616,
                            // maxHeight: 616,
                            quality: 0.7,
                            orientation: orientation
                        }, resolve)
                    })
                }
            })
        })
    }

    // 用一张特殊的图片来检测当前浏览器是否对带 EXIF 信息的图片进行回正
    function detectImageAutomaticRotation() {
        return new Promise((resolve) => {
            // 一张 2x1 的 JPEG 图片, EXIF Orientation: 6
            const testAutoOrientationImageURL =
                'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
                'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
                'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
                'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
                'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
                'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
            let isImageAutomaticRotation;
            if (isImageAutomaticRotation === undefined) {
                const img = new Image();
                img.onload = () => {
                    // 如果图片变成 1x2，说明浏览器对图片进行了回正
                    isImageAutomaticRotation = img.width === 1 && img.height === 2;
                    resolve(isImageAutomaticRotation);
                };
                img.src = testAutoOrientationImageURL;
            } else {
                resolve(isImageAutomaticRotation);
            }
        });
    }
