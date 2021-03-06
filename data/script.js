/* ***** BEGIN LICENSE BLOCK *****
 *
 * Firefox Plurk2Plurk extension v0.65
 * irvinfly@gmail.com
 *
 * This add-on is licensed under Mozilla Public License Version 1.1
 * You may obtain a copy of the License at http://www.mozilla.org/MPL/
 *
 * ***** END LICENSE BLOCK ***** */

var fbXxxxl = $('fb\\:like');
var fbTitle = $(document).attr('title');

if (fbXxxxl.length) {    //Find FBXML    
    fbXxxxl.each(function(i){
        var fbEyeFrame = $(this);
        var fbUrl = fbEyeFrame.attr('href') || window.location;        
        if (fbUrl.substr(fbUrl.length - 11, 11) == "?xid=fblike") 
            fbUrl = fbUrl.replace("?xid=fblike", "");
        addBtn(fbUrl, fbTitle, fbEyeFrame);
    });
} 
else {    //Check fb iframe
    $('iframe').each(function(i){
        var fbEyeFrame = $(this);
        var fbUrl = decodeURIComponent(fbEyeFrame.attr('src'));
        var urltest = /^https?:\/\/www\.facebook\.com\/plugins\/like\.php\?.*$/;

        // Check for facebook Like button
        if (urltest.test(fbUrl)){        
            fbUrl = getUrlPara(fbUrl, 'href');
            addBtn(fbUrl, fbTitle, fbEyeFrame);
        };
    });
};


function addBtn(fbUrl, title, target) {
    $('body').css('position', 'relative');
    var shareContent = fbUrl + " (" + title + ")";
    var plurkBtn = $("<div style='display: none; position: absolute; z-index: 999;' class='p2plurk_div'><a title='Share to Plurk' href='http://www.plurk.com/?qualifier=shares&status=" + encodeURIComponent(shareContent) + "' class='p2plurk' target='_blank'><img alt='' src='http://statics.plurk.com/23d30a60b81915a637d1c3d2cd966a59.png ' width='65' height='20' border='0' /></a></div>")
        .hover(
            function(){ $('body').data('pHoverStat', true); },
            function(){
                $('body').data('pHoverStat', false);
                setTimeout(hideBtn, 500);
            }
        )
        .appendTo('body')
        .offset({ top: target.offset().top + 25, left: target.offset().left });
                
    target.hover(
        function() {
            $('body').data('pHoverStat', true);
            plurkBtn.show('fast');
        },
        function() {
            $('body').data('pHoverStat', false);
            setTimeout(hideBtn, 500);
        }
    );
}


// Hide Plurk button on timeout after Timeout
function hideBtn() {
    if ($('body').data('pHoverStat') == false){
        $('.p2plurk_div').hide('fast'); 
    };
};


// Get Url Parameter
// modify from http://www.netlobo.com/url_query_string_javascript.html
function getUrlPara(str, name){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( str );
  if( results == null )
    return "";
  else
    return results[1];
}