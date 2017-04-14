var appModule = (function ($, _) {
    var showDetails = function (data) {
        var verison = $('#htmlVersionCol'), 
        title = $('#titleCol'),
        heading = $('#headingsCol'),
        externalLink = $('#externalLinksCol'),
        internalLink = $('#internalLinksCol'),
        inaccessiableLink = $('#inaccessiableLinksCol'),
        loginForm = $('#loginFormCol');

        //by td should be empty
        verison.empty();
        title.empty();
        heading.empty();
        externalLink.empty();
        internalLink.empty();
        inaccessiableLink.empty();
        loginForm.empty();
        
        verison.html(data.verison);
        title.html(data.title);
        //headings...
        if(data.heading.length > 0) {
            var count = data.heading.length;
            $('.headingCount').html('total: '+ count);
             heading.append($('<ul/>').attr('class', 'headingList'));
            for(var i=0; i<count; i++) {
                $('.headingList').append('<li>'+data.heading[i]+'</li>');
            }   
        }
        //links
        if(data.links.internalLinks.length > 0) {
            var count = data.links.internalLinks.length;
            $('.internalLinkCount').html('total: '+ count);
            internalLink.append($('<ul/>').attr('class', 'internalLinkList'));
            for(var i=0; i<count; i++) {
                $('.internalLinkList').append('<li>'+data.links.internalLinks[i]+'</li>');
            }
        }
        if(data.links.externalLinks.length > 0) {
            var count = data.links.externalLinks.length;
            $('.externalLinkCount').html('total: '+ count);
            externalLink.append($('<ul/>').attr('class', 'externalLinkList'));
            for(var i=0; i<count; i++) {
                $('.externalLinkList').append('<li>'+data.links.externalLinks[i]+'</li>');
            }
        }
        if(data.links.inaccessableLinks.length > 0) {
            var count = data.links.inaccessableLinks.length;
            $('.inaccessCount').html('total: '+ count);
            inaccessiableLink.append($('<ul/>').attr('class', 'inaccessList'));
            for(var i=0; i<count; i++) {
                $('.inaccessList').append('<li>'+data.links.inaccessableLinks[i]+'</li>');
            }
        } 
        //login forms...
        loginForm.append($('<span/>').attr('class', 'loginForm'));
        if(!data.login.isLoginForm) {
            $('.loginForm').html('No login form found: '+ data.login.isLoginForm);
        }else {
            loginForm.append($('<p/>').attr('class', 'formDetails'));
            $('.loginForm').html('Login form found: '+ data.login.isLoginForm);
            $('.formDetails').html(JSON.stringify(data.login.details));
        }  
    };

    var request = function (params) {
       $.ajax({
           url: '/analys/'+params,
        }).done(function (res) {
            $('.loader').hide();
            if(_.has(res, 'err')) {
                var errMsg = 'statusCode: '+ res.err.statusCode; 
                    errMsg += ' your requested page is ' + res.err.errorMessage.errno;
                $('.errorWrapper span').html(errMsg); 
                return;
            }
            showDetails(res.data);
            $('.scrapDetails').show();
            
        });
    }
    return {
        init: function () {
            $("#analysBtn").on('click', function (evt) {
                evt.preventDefault();
                $('.scrapDetails').hide();
                var urlString = $('#url').val();
                if(urlString === '') {
                    $('.errorWrapper span').html('Please enter the URL which you want to scrap.');
                    return;
                }
                $('.loader').show();
                request(urlString);
            });
            $('#url').on('change', function (evt) {
                evt.preventDefault();
                $('.errorWrapper span').html('');
            });
            
        }
    }
})(window.jQuery, window._);

appModule.init();
 