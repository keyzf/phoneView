/**
 * Created by zee on 2016/8/12.
 *
 */

(function ($) {
    $.fn.phoneView = function () {
        return this.each(function () {

            $(this).off('keyup.phoneView change.phoneView input.phoneView').on('keyup.phoneView change.phoneView input.phoneView', function (e) {
                var target = $(this),
                    inputVal = target.val(),
                    numVal = inputVal.replace(/-/g, ''),
                    showVal = '';

                if (/^[\d]*$/.test(numVal)) {
                    if(/^0[3-9]\d+$/.test(numVal)){
                        if(numVal.length > 4 && numVal.length < 13){
                            showVal = numVal.substring(0, 4) + "-" + numVal.substring(4, numVal.length);
                        }else{
                            showVal = numVal;
                        }
                    }else if (/^0[1-2]\d+$/.test(numVal)) {
                        if(numVal.length > 3 && numVal.length < 12){
                            showVal = numVal.substring(0, 3) + "-" + numVal.substring(4, numVal.length);
                        }else{
                            showVal = numVal;
                        }
                    }else if (/^1[3-8]\d+$/.test(numVal)) {
                        if(numVal.length > 4 && numVal.length < 8){//132 3256 2
                            showVal = numVal.substring(0, 3) + "-" + numVal.substring(4, numVal.length);
                        }else if(numVal.length > 4 && numVal.length < 12){
                            showVal = numVal.substring(0, 3) + "-" + numVal.substring(3, 7) + '-' + numVal.substring(7, numVal.length);
                        }else{
                            showVal = numVal;
                        }
                    }
                    target.val(showVal).attr('data-num', numVal);
                }

            });
        });
    };
    $.fn.phoneView.version = 1.0;
})(jQuery);