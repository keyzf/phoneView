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
                    isDel = e.keyCode == 8,
                    numVal = inputVal.replace(/-/g, ''),
                    showVal = inputVal;

                if (/^[\d]*$/.test(numVal)) {
                    switch (numVal.length){
                        case 3://133  || 010  || 020
                            if (isDel) {
                                showVal = numVal.substring(0, 3);
                            }
                            break;
                        case 4://133 1 || 010 2 || 020 1
                            if(isDel){
                                if (/^0[3-9]\d+$/.test(numVal)) {
                                    showVal = numVal.substring(0, 4) ;
                                }
                            }else{
                                if (/^0[1-2]\d+$/.test(numVal)||/^1[3-8]\d+$/.test(numVal)) {
                                    showVal = numVal.substring(0, 3) + "-" + numVal.substring(3, 4);
                                }
                            }
                            break;
                        case 5://0762 1
                            if (/^0[3-9]\d+$/.test(numVal)) {
                                showVal = numVal.substring(0, 4) + "-" + numVal.substring(4, 5);
                            }
                            break;
                        case 7://133 4561
                            if (isDel&&/^1[3-8]\d+$/.test(numVal)) {
                                showVal = numVal.substring(0, 3) + "-" + numVal.substring(3, 7);
                            }
                            break;
                        case 8://133 4561 1
                            if (/^1[3-8]\d+$/.test(numVal)) {
                                showVal = numVal.substring(0, 3) + "-" + numVal.substring(3, 7) + '-' + numVal.substring(7, 9);
                            }
                            break;
                        case 10://010 8431203  3位区号+ 7位号码
                            if (/^0[1|2]\d+$/.test(numVal)) {
                                showVal = numVal.substring(0, 3) + '-' + numVal.substring(3, 10);
                            }
                            break;
                        case 11:
                            if (/^1[3-8]+\d+/.test(numVal)) {//11位手机号码
                                showVal = numVal.substring(0, 3) + '-' + numVal.substring(3, 7) + '-' + numVal.substring(7, 11);
                            } else if (/^0[1|2]\d+$/.test(numVal)) {//3位区号+8位号码
                                showVal = numVal.substring(0, 3) + '-' + numVal.substring(3, 11);
                            } else if (/^0[3-9]\d+$/.test(numVal)) {//4位区号 + 7位号码
                                showVal = numVal.substring(0, 4) + '-' + numVal.substring(4, 11);
                            }
                            break;
                        case 12:
                            if (/^0[3-9]\d+$/.test(numVal)) {//4位区号 + 8位号码
                                showVal = numVal.substring(0, 4) + '-' + numVal.substring(4, 12);
                            }else{
                                showVal = numVal;
                            }
                            break;
                        case 13:
                            showVal = numVal;
                            break;
                        default :
                            showVal = inputVal;
                            break;
                    }
                    target.val(showVal).attr('data-num', numVal);

                }

            });
        });
    };
    $.fn.phoneView.version = 0.8;
})(jQuery);