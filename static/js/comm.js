/**
 * 公共js 初始值
 */
//list排序，审批记录排序
function bubbleSort(arr) {

    var len = arr.length;

    for(var i = 0; i < len; i++) {

        for(var j = 0; j < len - 1 - i; j++) {

            if (arr[j].app_date < arr[j+1].app_date) {        //相邻元素两两对比

                var temp= arr[j+1];        //元素交换

                arr[j+1] = arr[j];

                arr[j] = temp;

            }

        }

    }

    return arr;

}

function isEmptyStr(obj) {
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

function guid() {
    return Number(Math.random().toString().substr(3,3)+Date.now()).toString(36)
}

