/**
 * Created by zee on 2016/8/12.
 *
 */

(function ($) {
    $.fn.phoneView = function (options) {
        var defaults = {
                maxLen:40
            },
        opts = $.extend({}, defaults, options);
        return this.each(function () {
            var $this = $(this);
            $this.attr('maxlength',opts.maxLen);

            $this.off('keyup.phoneView change.phoneView input.phoneView').on('keyup.phoneView change.phoneView input.phoneView',function (e) {
                var keyCode = e.keyCode,
                    isDel = keyCode == 8,
                    target = $(this),
                    phoneNum = target.val(),
                    notFormatVal = phoneNum.replace(/-/g,''),//去除‘-’
                    showVal = phoneNum,
                    isFormat = target.attr('is-format')?(target.attr('is-format') == 'false'?false:true):false;


                switch (phoneNum.length){
                    case 4://132-   010-  0762
                        if(phoneNum.indexOf('-') != -1&&isDel){
                            showVal = notFormatVal;
                        }else if(/^0[1|2]\d{2}$/.test(phoneNum)){
                            showVal = phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, phoneNum.length);
                            isFormat = true;
                        }
                        break;
                    case 5://0762-  ,132-3   010-8
                        if(phoneNum.indexOf('-') != -1&&isDel){
                            if(/^0[3-9]\d{2}-$/.test(phoneNum)){
                                showVal = notFormatVal;
                            }
                        }else if(/^0[3-9]\d{3}$/.test(phoneNum)){
                            showVal = phoneNum.substring(0, 4) + "-" + phoneNum.substring(4, phoneNum.length);
                            isFormat = true;
                        }
                        break;
                    case 9://132-3278-
                        if(/^1[3-8][0-9]-\d{4}-/.test(phoneNum)&&phoneNum.indexOf('-') != -1&&isDel){
                            showVal = phoneNum.substring(0, 8);
                            isFormat = true;
                        }else if( /^1[3-8][0-9]\d+$/.test(phoneNum)){
                            showVal = phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, 7) + '-' + phoneNum.substring(7, 9);
                            isFormat = true;
                        }else if( /^1[3-8][0-9]-\d{5}$/.test(phoneNum)){
                            showVal = phoneNum.substring(0, 8) + "-" + phoneNum.substring(8, phoneNum.length);
                            isFormat = true;
                        }
                        break;
                    case 10://0108431203  3位区号+ 7位号码
                        if(phoneNum.indexOf('-') == -1){
                            if(/^0[1|2]\d{8}$/.test(phoneNum)){
                                showVal = phoneNum.substring(0, 3) + '-' + phoneNum.substring(3, 10);
                                isFormat = true;
                            }
                        }else{//132-1234-1  010-123456   0755-12345
                            if(/^1[3-8][0-9]-\d{4}-\d{1}$/.test(phoneNum)&&isDel){//11位手机号码
                                showVal = notFormatVal;
                            }
                        }
                        break;
                    case 11://
                        if(phoneNum.indexOf('-') == -1){
                            if(/^1[3-8]+\d{9}/.test(phoneNum)){//11位手机号码
                                showVal = phoneNum.substring(0, 3) + '-' + phoneNum.substring(3, 7) + '-' + phoneNum.substring(7, 11);
                                isFormat = true;
                            }else if(/^0[1|2]\d{9}$/.test(phoneNum)){//3位区号+8位号码
                                showVal = phoneNum.substring(0, 3) + '-' + phoneNum.substring(3, 11);
                                isFormat = true;
                            }else if(/^0[3-9]\d{9}$/.test(phoneNum)){//4位区号 + 7位号码
                                showVal = phoneNum.substring(0, 4) + '-' + phoneNum.substring(4, 11);
                                isFormat = true;
                            }
                        }
                        break;
                    case 12://4位区号+ 8位手机
                        if(phoneNum.indexOf('-') == -1){
                            if(/^0[3-9]\d{10}$/.test(phoneNum)){//4位区号 + 7位号码
                                showVal = phoneNum.substring(0, 4) + '-' + phoneNum.substring(4, 12);
                                isFormat = true;
                            }
                        }
                        break;
                    case 13:
                        if(/^0[1|2]\d-\d{9}$/.test(phoneNum)){
                            showVal = notFormatVal;
                        }
                        break;
                    case 14:
                        if( /^1[3-8][0-9]-\d{4}-\d{5}$/.test(phoneNum)){
                            showVal = notFormatVal;
                        }else if(/^0[3-9]\d{2}-\d{9}$/.test(phoneNum)){
                            showVal = notFormatVal;
                        }
                        break;
                }

                if (!/^[\d|-]*$/.test(phoneNum) &&isFormat) {
                    showVal = notFormatVal;
                }

                if(showVal == notFormatVal){
                    isFormat = false;
                }

                target.val(showVal).attr('data-num',notFormatVal).attr('is-format',isFormat);
            });
        });
    };
    $.fn.phoneView.version = 0.5;
})(jQuery);