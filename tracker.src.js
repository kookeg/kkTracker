//初始化一些基本参数
if (typeof kk_click_head_flag == "undefined") {
  var cookieDomain = "kookeg.com";
  var _kk_click_hash_key = "kk_click_20161109";
  var Md5Util = {
    hexcase : 0,
    b64pad : "",
    chrsz : 8,
    binl2hex : function(a) {
      var b = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var c = "";
      for (var i = 0; i < a.length * 4; i++) {
        c += b.charAt(a[i >> 2] >> i % 4 * 8 + 4 & 15)
          + b.charAt(a[i >> 2] >> i % 4 * 8 & 15);
      }
      return c;
    },
    core_md5 : function(x, e) {
      x[e >> 5] |= 128 << e % 32;
      x[(e + 64 >>> 9 << 4) + 14] = e;
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      for (var i = 0; i < x.length; i += 16) {
        var f = a;
        var g = b;
        var h = c;
        var j = d;
        a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = this.safe_add(a, f);
        b = this.safe_add(b, g);
        c = this.safe_add(c, h);
        d = this.safe_add(d, j);
      }
      return Array(a, b, c, d);
    },
    md5_cmn : function(q, a, b, x, s, t) {
      return this.safe_add(this.bit_rol(this.safe_add(
              this.safe_add(a, q), this.safe_add(x, t)), s), b);
    },
    md5_ff : function(a, b, c, d, x, s, t) {
      return this.md5_cmn(b & c | ~b & d, a, b, x, s, t);
    },
    md5_gg : function(a, b, c, d, x, s, t) {
      return this.md5_cmn(b & d | c & ~d, a, b, x, s, t);
    },
    md5_hh : function(a, b, c, d, x, s, t) {
      return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    },
    md5_ii : function(a, b, c, d, x, s, t) {
      return this.md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    },
    str2binl : function(a) {
      var b = Array();
      var c = (1 << this.chrsz) - 1;
      for (var i = 0; i < a.length * this.chrsz; i += this.chrsz)
        b[i >> 5] |= (a.charCodeAt(i / this.chrsz) & c) << i % 32;
      return b;
    },
    safe_add : function(x, y) {
      var a = (x & 65535) + (y & 65535);
      var b = (x >> 16) + (y >> 16) + (a >> 16);
      return b << 16 | a & 65535;
    },
    bit_rol : function(a, b) {
      return a << b | a >>> 32 - b;
    },
    hex_md5 : function(s) {
      return this.binl2hex(this.core_md5(this.str2binl(s), s.length
            * this.chrsz));
    }
  };
  var CookieUtil = {
    get : function(name) {
      var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie
        .indexOf(cookieName), cookieValue = "";
      if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(
              cookieStart + cookieName.length, cookieEnd));
      }
      return cookieValue;
    },
    set : function(name, value, expires, path, domain, secure) {
      var cookieText = encodeURIComponent(name) + "="
        + encodeURIComponent(value);
      if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toGMTString();
      }
      if (path) {
        cookieText += "; path=" + path;
      }
      if (domain) {
        cookieText += "; domain=" + domain;
      }
      if (secure) {
        cookieText += "; secure";
      }
      document.cookie = cookieText;
    },
    unset : function(name, path, domain, secure) {
      this.set(name, "", new Date(0), path, domain, secure);
    }
  };
  var __kkClickFunctions = {
    createPermanentID : function() {
      var nowDate = new Date();
      var year = nowDate.getFullYear() + "";
      var month = nowDate.getMonth() + 1;
      if (month < 10)
        month = "0" + month;
      var day = nowDate.getDate();
      if (day < 10)
        day = "0" + day;
      var hour = nowDate.getHours();
      if (hour < 10)
        hour = "0" + hour;
      var minute = nowDate.getMinutes();
      if (minute < 10)
        minute = "0" + minute;
      var second = nowDate.getSeconds();
      if (second < 10)
        second = "0" + second;
      var msecond = "00" + nowDate.getMilliseconds();
      msecond = msecond.substr(msecond.length - 3, 3);
      var ka = Math.floor(1e5 + Math.random() * 9e5);
      var kb = Math.floor(1e5 + Math.random() * 9e5);
      var hashStr = year + month + day + hour + minute + second + msecond + ka + kb + _kk_click_hash_key;
      var hashCode = Md5Util.hex_md5(hashStr);
      hashCode = this.formatHashCode(hashCode);
      return year + month + day + hour + minute + second + msecond + hashCode + ka + kb;
    },
    formatHashCode : function(hashcode) {
      var str = parseInt(hashcode.substr(0, 8), 16);
      var tmp_pid = String(str).substr(0, 6);
      var len = tmp_pid.length;
      if (len < 6) {
        tmp_pid += this.str_repeat('0', Math.abs(6 - len));
      }
      return tmp_pid;
    },
    str_repeat : function(input, multiplier) {
      return new Array(multiplier + 1).join(input);
    },
    initTime : function() {
      var t = new Date();
      return t.getTime();
    },
    init : function() {
      this.permanent_id = CookieUtil.get("__permanent_id");
      if (typeof this.permanent_id == 'undefined'
          || !/^\d{35}$/.test(this.permanent_id)) {
            //是否是老访客
            var expires = new Date(2030, 1, 1);
            this.permanent_id = this.createPermanentID();
            CookieUtil.set("__permanent_id", this.permanent_id, expires,
                "/", cookieDomain);
          }
    }
  };
  __kkClickFunctions.init();
}



if (typeof kk_click_page_tracker == "undefined") {
  function __kk_Campaign() {
    var CampaignArray = [ [ "baidu", "word" ], [ "baidu", "wd" ],
        [ "baidu", "w" ], [ "baidu", "kw" ], [ "google", "q" ],
        [ "soso", "w" ], [ "soso", "key" ], [ "sogou", "query" ],
        [ "sogou", "keyword" ], [ "youdao", "q" ], [ "bing", "q" ],
        [ "yahoo", "p" ], [ "ask", "q" ], [ "360", "q" ],
        [ "jike", "q" ], [ "ucweb", "keyword" ], [ "ucweb", "word" ],
        [ "so", "q" ] ];
    // 如果获取domain不成功则返回流入URL
    // 如果url获取domain成功，但是没有关键字配置，则返回流入URL的domain部分
    // 如果url获取domain成功，并且获取了关键字信息，则返回流入URL的domain部分和关键字信息
    this.transCampaignURL = function(campaignURL) {
      var get_domain_reg = /^https?:\/\/(.*?)($|\/.*)/;
      var matches = get_domain_reg.exec(campaignURL);
      if (matches != null) {
        var result = "";
        result = matches[1];
        var keyValueArray = URLUtil.getKeyValueArray(campaignURL);
        for ( var i = 0; i < CampaignArray.length - 1; i++) {
          if (result.indexOf(CampaignArray[i][0]) > 0) {
            if (typeof keyValueArray[CampaignArray[i][1]] != "undefined") {
              result = result + "|"
                + keyValueArray[CampaignArray[i][1]];
              return result;
            }
          }
        }
        return result + "|";
      } else {
        return campaignURL + "|";
      }
    }
  }
  ;
  var URLUtil = {
    getKeyValueArray : function(URL) {
      var keyValueArray = new Object();
      if (URL.indexOf("?") > 0) {
        var tempURL = URL.substring(URL.indexOf("?") + 1);
        if (tempURL.indexOf("#") > 0) {
          tempURL = tempURL.substring(0, tempURL.indexOf("#"));
        }

        var tempKeyValueArray = tempURL.split("&");
        for ( var i = 0; i < tempKeyValueArray.length; i++) {
          keyValueArray[tempKeyValueArray[i].split("=")[0]] = tempKeyValueArray[i]
            .split("=")[1];
        }
      }
      return keyValueArray;
    }
  };
  function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
      oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
      oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
      oTarget["on" + sEventType] = fnHandler;
    }
  }
  ;
  function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
      oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
      oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
      oTarget["on" + sEventType] = null;
    }
  }
  ;
  function changeTwoDecimal(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
      return 0.00;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0';
    }
    return s_x;
  }

  function kkPageTracker() {
    var visit_count = 0;
    //流量来源
    var _kk_out_refer = "";

    // 标识是否是访次的第一条记录
    var is_first_pv = 0;

    // 内部来源链接
    var __kk_referrer = "";

    // 当前url
    var __kk_url = "";

    // 页面特别配置的变量
    var __kkClickSpecialString = ""

      //与上一变量相关联,具体看代码
      var __kkClickTemp = "";

    // 区域信息分隔符
    var separator = encodeURIComponent(",");

    // cookie 域
    var cookieDomain = (typeof cookieDomain == 'undefined') ? "kookeg.com"
      : cookieDomain;

    // 统计请求的url数组
    var urlArray = [ "http://tracker.kookeg.com/", "https://tracker.kookeg.com/" ];

    var http_protocol = "http:";
    // document.location.protocol在某些极端情况下(IE6,代理)不能访问
    try {
      http_protocol = document.location.protocol;
    } catch (e) {
    }
    var postDomain = ("https:" == http_protocol ? urlArray[1] : urlArray[0]);
    //来源url
    var getReferUrl = function(url) {
      // 为解决部分情况refer_url收集不到，设定的统一规则
      if (url.indexOf("#kk_refer=http") > 0) {
        __kk_referrer = (url.substring(url.indexOf("#kk_refer=")
              + "#kk_refer=".length));
      } else {
        __kk_referrer = document.referrer;
        if (!__kk_referrer) {
          try {
            if (window.opener && window.opener.location) {
              __kk_referrer = window.opener.location.href;
            }
          } catch (e) {
          }
        }
      }
    };
    // 向服务器发送统计请求
    var kkInvokeServer = function(m_id, o_id, region_ids, refer_url, url, to_url, type, title, ctr_type, permanent_id, pointerXY, regionDdNames, objDdName, regionDdAreas, clickInfo) {
      if (o_id == null)
        o_id = '';
      var img = new Image();
      //处理空格之类的东西，主要解决url长度问题
      refer_url = refer_url.replace(/\t|\n|\r/g, "");
      url = url.replace(/\t|\n|\r/g, "");
      if (url.indexOf("#kk_refer=http") > 0) {
        url = url.substring(0, url.indexOf("#kk_refer="));
      }
      to_url = to_url.replace(/\t|\n|\r/g, "");
      title = title.replace(/\t|\n|\r/g, "");
      var width = 0;
      var height = 0;
      if (window.screen) {
        width = window.screen.width;
        height = window.screen.height;
      }
      var browerWidth = 0;
      var documentHeight = 0;
      if ((document.body) && (document.body.clientWidth)) {
        browerWidth = document.body.clientWidth;
      }
      if ((document.body) && (document.body.scrollHeight)) {
        documentHeight = document.body.scrollHeight;
      }

      // res存屏幕分辨率|页面点击位置|浏览器宽度,文档高度
      res = width + ',' + height + '|' + pointerXY + '|' + browerWidth
        + ',' + documentHeight;
      var trace_id = 'nohead';
      if (__kkClickFunctions.timestap) {// if no load page head
        trace_id = parseInt(__kkClickFunctions.initTime()
            - __kkClickFunctions.timestap);
        if (trace_id) {
          trace_id = changeTwoDecimal(trace_id / 1000);
        } else {
          trace_id = 0.00;
        }
      }

      if (__kkClickSpecialString == "") {
        __kkClickTemp = document.getElementsByTagName("meta");
        if (__kkClickTemp.length) {
          var kkClickReg = new RegExp("kkClick_(.*)");
          var value = "";
          var matches = [];
          var name = [];
          for ( var x = 0; x < __kkClickTemp.length; x++) {
            name = __kkClickTemp[x].getAttribute("name");
            if (!kkClickReg.test(name))
              continue;
            matches = name.match(kkClickReg)[1];
            value = __kkClickTemp[x].getAttribute("content");
            if (value)
              __kkClickSpecialString += matches + '=' + value
                + ";";
          }
        }
      }

      permanent_id = permanent_id || "0";
      clickInfo = clickInfo != "" ? JSON.stringify(clickInfo) : "";
      img.src = postDomain + 'tracker.php?m_id='
        + encodeURIComponent(m_id) + '&o_id='
        + encodeURIComponent(o_id) + '&region_ids='
        + encodeURIComponent(region_ids) + '&out_refer='
        + encodeURIComponent(_kk_out_refer) + '&refer_url='
        + encodeURIComponent(refer_url) + '&url='
        + encodeURIComponent(url) + '&to_url='
        + encodeURIComponent(to_url) + '&type=' + type
        + '&visit_count=' + visit_count + '&is_first_pv='
        + is_first_pv + '&ctr_type=' + ctr_type + '&perm_id='
        + permanent_id + '&res=' + encodeURIComponent(res) + "&r="
        + Math.random() + '&title=' + encodeURIComponent(title)
        + '&trace_id=' + trace_id + '&special='
        + encodeURIComponent(__kkClickSpecialString)
        + '&cif=' + encodeURIComponent(clickInfo)
        + '&rsv1=' + encodeURIComponent(regionDdNames)
        + '&rsv2=' + encodeURIComponent(objDdName)
        + '&rsv3=' + encodeURIComponent(regionDdAreas);
      // 标识是否是访次的第一条记录
      is_first_pv = 0;
    };


    // 判断触发click统计的元素是否需要统计
    var judgeClickObject = function(obj) {
      if (obj == null || obj.tagName == null)
        return false;
      // 默认支持点击事件的标签
      if (obj.tagName.toLowerCase() == "area"
          || obj.tagName.toLowerCase() == "a"
          || (obj.tagName.toLowerCase() == "input" && (obj.type
              .toLowerCase() == "button"
              || obj.type.toLowerCase() == "sumbit"
              || obj.type.toLowerCase() == "image"))) {
                return true;
              }
      //绑定了click事件的标签
      if (obj.getAttribute("onclick") != "undefined"
          && obj.getAttribute("onclick") != null
          && obj.tagName.toLowerCase() != "label"
          && obj.tagName.toLowerCase() != "input") {
            return true;
          }
      return false;
    };

    var trace_getCookies = function(name) {
      var arr = document.cookie.match(new RegExp("(^| )" + name
            + "=([^;]*)(;|$)"));
      if (arr != null)
        return unescape(arr[2]);
      return '';
    };
    // 判断用户的访问信息--包括访次信息和流量来源信息
    var judgeVisitorTimes = function() {
      var domain_hash = "0000000001"; // 目前无用
      var expires_time_2years = new Date();
      //过期时间 2年
      expires_time_2years.setTime(expires_time_2years.getTime() + 2 * 365
          * 24 * 60 * 60 * 1000);
      //30分钟
      var expires_time_30min = new Date();
      expires_time_30min
        .setTime(expires_time_30min.getTime() + 30 * 60 * 1000);
      var __kk_click_visit;
      if (CookieUtil.get("__kk_click_visit")
          && CookieUtil.get("__kk_click_visit").split(".").length == 2) {
            visit_count = CookieUtil.get("__kk_click_visit").split(".")[1];
            if (isNaN(parseInt(visit_count))) {
              visit_count = 0;
            }
            if (!CookieUtil.get("__trace_id")) {
              //第一次visit
              visit_count++;
              __kk_click_visit = domain_hash + "." + visit_count;
              CookieUtil.set("__kk_click_visit", __kk_click_visit,
                  expires_time_2years, "/", cookieDomain);
              CookieUtil.set("__trace_id", __kkClickFunctions
                  .createPermanentID(), expires_time_30min, "/",
                  cookieDomain);
              // 该访次的第一条记录
              is_first_pv = 1;
            } else {
              // 修改访次计算规则,30分钟内不是第一次访问
              var refer_is_kk_reg = /^http?:\/\/[\w\.]*?kookeg/;
              var __new_out_refer = '';
              //检测是否外部流量
              if (!refer_is_kk_reg.test(__kk_referrer)) {
                __kk_Campaign_obj = new __kk_Campaign();
                __new_out_refer = __kk_Campaign_obj
                  .transCampaignURL(__kk_referrer);
                __last_out_refer = CookieUtil.get("out_refer");
                //如果是新的out_refer,则计数
                if ((__kk_referrer != '')
                    && (__new_out_refer != __last_out_refer)) {
                      visit_count++;
                      __kk_click_visit = domain_hash + "." + visit_count;
                      CookieUtil.set("__kk_click_visit", __kk_click_visit,
                          expires_time_2years, "/", cookieDomain);
                    }
              }
              CookieUtil.set("__trace_id", __kkClickFunctions
                  .createPermanentID(), expires_time_30min, "/",
                  cookieDomain);
            }
          }
      // 如果__kk_click_visit 不存在，则一定是第一次访问
      else {
        visit_count = 1;
        __kk_click_visit = domain_hash + "." + visit_count;
        CookieUtil.set("__kk_click_visit", __kk_click_visit,
            expires_time_2years, "/", cookieDomain);
        CookieUtil.set("__trace_id", __kkClickFunctions
            .createPermanentID(), expires_time_30min, "/",
            cookieDomain);
        is_first_pv = 1;
      }

      judgeOutRefer();
    };

    //判断外部来源流量链接
    var judgeOutRefer = function() {
      var expires_time_1day = new Date();
      expires_time_1day.setTime(expires_time_1day.getTime() + 24 * 60
          * 60 * 1000);

      if (__kk_referrer == "" || __kk_referrer == null
          || __kk_referrer == "undefined") {
            if (is_first_pv) {
              _kk_out_refer = "|";
              CookieUtil.set("out_refer", _kk_out_refer,
                  expires_time_1day, "/", cookieDomain);
            }
          } else {
            var refer_is_kk_reg = /^http?:\/\/[\w\.]*?kookeg/;
            if (!refer_is_kk_reg.test(__kk_referrer)) {
              __kk_Campaign_obj = new __kk_Campaign();
              _kk_out_refer = __kk_Campaign_obj
                .transCampaignURL(__kk_referrer);
              CookieUtil.set("out_refer", _kk_out_refer,
                  expires_time_1day, "/", cookieDomain);
            }
          }
      _kk_out_refer = CookieUtil.get("out_refer");
    };

    var getClickInfo = function(obj) {
      var flag =false;
      var cInfo = {};
      //来源ID 即click标签的ID属性
      if (obj.id) {
        flag = true;
        cInfo["oi"] = obj.id;
      } else if (obj.getAttribute("id")) {
        flag = true;
        cInfo["oi"] = obj.getAttribute("id");
      }
      if (obj.name) {
        flag = true;
        cInfo["on"] = obj.name;
      } else if (obj.getAttribute("name")) {
        flag = true;
        cInfo["on"] = obj.getAttribute("name");
      }
      //自定义内容
      if (obj.getAttribute("kk_name")) {
        flag = true;
        cInfo["dn"] = obj.getAttribute("kk_name");
      }
      if (obj.getAttribute("kk_area")) {
        flag = true;
        cInfo["da"] = obj.getAttribute("kk_area");
      }
      if (obj.getAttribute("kname")) {
        flag = true;
        cInfo["nn"] = obj.getAttribute("kname");
      }
      return (flag ? cInfo : false);
    };
    // 收集点击
    this.trackPageclick = function(e) {
      e = e || window.event;
      if (e == null)
        return;
      var obj = e.srcElement || e.target;
      var isNeedTrackClick = true;
      while (true) {
        isNeedTrackClick = judgeClickObject(obj);
        if (isNeedTrackClick) {
          break;
        } else {
          obj = obj.parentNode;
          if (obj == null || obj.tagName == null
              || obj.tagName.toLowerCase() == "body"
              || obj.tagName.toLowerCase() == "html")
            return;
        }
      }
      // 获取事件元素的相关信息
      var objHref = objName = objDdName = regionDdNames = regionDdAreas = regionIds = objTagName = "";
      var clickInfo = [{}];
      var idx = 1;
      var tmp = '';
      if (obj.tagName)
        objTagName = obj.tagName;
      if (obj.href)
        objHref = obj.href;
      tmp = getClickInfo(obj); 
      if (tmp && tmp.oi)
        objName = tmp.oi;
      else if (tmp && tmp.on)
        objName = tmp.on;
      if (tmp && tmp.dn)
        objDdName = tmp.dn;
      if (tmp && tmp.da)
        regionDdAreas = tmp.da + separator;
      if (obj.tagName.toLowerCase() == "a" && !objDdName && obj.childNodes.length == 1) {
        var imgNode = obj.getElementsByTagName('img');
        var htmlReg = /(<.*>)/;
        objDdName = (imgNode.length == 1 && imgNode[0].alt) || ((!htmlReg.test(obj.innerHTML)) && obj.innerHTML) || '';
        if (objDdName) {
          if (tmp) {
            tmp.dn = objDdName;
          } else {
            tmp = {'dn': objDdName};
          }
        }
      }
      if (tmp) {
        for (var i in tmp) {
          clickInfo[0][i] = tmp[i];
        }
      }
      objPointerX = (e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)))
        || 'null';
      objPointerY = (e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)))
        || 'null';
      if (objPointerX != 'null' && objPointerY != 'null') {
        objPointerXY = Math.round(objPointerX) + ","
          + Math.round(objPointerY);
      } else {
        objPointerXY = objPointerX + "," + objPointerY;
      }
      // 获取事件元素所在区域信息
      obj = obj.parentNode;
      while (obj != null && obj.tagName != null
          && obj.tagName.toLowerCase() != "body"
          && obj.tagName.toLowerCase() != "html") {
            tmp = getClickInfo(obj);
            if (tmp && tmp.oi)
              regionIds += tmp.oi + separator;
            else if (tmp && tmp.on)
              regionIds += tmp.on + separator;
            if (tmp && tmp.dn)
              regionDdNames += tmp.dn + separator;
            if (tmp && tmp.da)
              regionDdAreas += tmp.da + separator;
            if (tmp) {
              clickInfo[idx] = {};
              for (var i in tmp) {
                clickInfo[idx][i] = tmp[i];
              }
              idx ++;
            }
            obj = obj.parentNode;
          }
      // 判断用户的访问信息
      judgeVisitorTimes();

      kkInvokeServer('', objName, regionIds, __kk_referrer, __kk_url,
          objHref, '2', document.title, objTagName, CookieUtil
          .get("__permanent_id"), objPointerXY, regionDdNames, objDdName, regionDdAreas, clickInfo);
    };

    // 收集PV
    this.trackPageview = function() {

      if (arguments.length > 0) {
        // referrer则为这次页面ajax加载前的url
        __kk_referrer = __kk_url;
        // 当前页面地址为现在传入的地址ַ 
        __kk_url = arguments[0];
      } else {
        // location.href在某些极端情况下(IE6,代理)不能访问
        try {
          __kk_url = location.href;
        } catch (e) {
          __kk_url = document.URL;
        }
        // 搜索页面为区分结果页类型,特别订制
        if (typeof _ozurltail != "undefined") {
          __kk_url = __kk_url + _ozurltail;
        }
        getReferUrl(__kk_url);
      }
      // 判断用户的访问信息
      judgeVisitorTimes();
      // 自定义是否捕获pv,默认情况下捕获pv的
      if (typeof kkclick_NO_trackPageview == "undefined") {
        kkInvokeServer('', '', '', __kk_referrer, __kk_url, '', '1',
            document.title, '', CookieUtil.get("__permanent_id"),
            "", "", "", "", "");
      }

      // 为捕获点击事件做准备
      // 先删除,防止document绑定多个click事件
      removeEventHandler(document, "click", this.trackPageclick);
      addEventHandler(document, "click", this.trackPageclick);
    };
    /*
    // 收集search域下的ping.php页面url参数信息。专供数据平台使用
    this.trackPingPHP = function(url) {
    getReferUrl(url);
    kkInvokeServer('', '', '', __kk_referrer, url, '', '5',
    document.title, '', CookieUtil.get("__permanent_id"), "", "", "", "", "");
    };


    // 收集推荐平台页面url参数信息。专供推荐平台使用
    this.trackRecommend = function(url) {
    getReferUrl(url);
    kkInvokeServer('', '', '', __kk_referrer, url, '', '6',
    document.title, '', CookieUtil.get("__permanent_id"), "", "", "", "", "");
    };
    */

    // 收集跳ת
    this.track_transfer = function(tourl) {
      getReferUrl(tourl);
      if (tourl.indexOf('#kk_refer') == -1) {
        tourl += '#kk_refer=' + __kk_referrer;
      }
      kkInvokeServer('', '', '', __kk_referrer, tourl, '', '0',
          document.title, '', CookieUtil.get("__permanent_id"), "", "", "", "", "");
      return tourl;
    };
    // flash点击收集
    this.track_flash = function(ctr_name, tourl) {
      getReferUrl(tourl);
      if (tourl.indexOf('#kk_refer') == -1) {
        tourl += '#kk_refer=' + __kk_referrer;
      }
      kkInvokeServer('', '', '', __kk_referrer, '', tourl, '2',
          document.title, ctr_name, CookieUtil.get("__permanent_id"),
          "", "", "", "", "");
    }
  }
  ;

  // 如果不能自动收集到点击，请手动调用此点击统计方法
  function __kk_trackPageclick(e) {
    if (e == null)
      e = window.event || arguments.callee.caller.arguments[0];
    kk_click_page_tracker.trackPageclick(e);
  }
  ;
  // 如果Ajax方式刷新页面，请手动调用此PV统计方法
  function __kk_trackPageview_forAjax(url) {
    kk_click_page_tracker.trackPageview(url);
  }
  ;
  // flash 调用
  function __kk_trackPageview_forFlash(ctr_name, tourl) {
    kk_click_page_tracker.track_flash(ctr_name, tourl);
  }

  // ------------文件脚本自动执行部分
  kk_click_page_tracker = new kkPageTracker();
  kk_click_page_tracker.trackPageview();
}

