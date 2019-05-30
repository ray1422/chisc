var Page = new Object();
Page._wrapper = $("body");

Page.setWrapper = function (wrapper) {
    Page._wrapper = wrapper;
}

Page.loadPage = function (url, animation = true) {



    var loadingWaiting = 500;

    if (animation) {
        Page._wrapper.addClass("loading");
        Page._wrapper.animate({ opacity: 0 }, { duration: loadingWaiting * .8 });
    }

    else {
        loadingWaiting = 0;
    }


    var htmlData = "";
    setTimeout(function () {
        $.get(url, function (data) {
            //success
            htmlData = data;

        }).fail(function () {
            htmlData = '<div class="card"><header><h2>404 Not Found!</h2><br><h3>我們的工程師已經挖了6尺深了，還是挖不到你要的內容ヾ(;ﾟ;Д;ﾟ;)ﾉﾞ</h3></header><img style="display:block;margin: 3em 0 1em 2vw;height: 23em;width: 20em" src="css/image/engineer.png"></div>';

        }).always(function () {

            var state = {};
            state.url = url;
            var title = "";



            if (animation) {

                setTimeout(function () {
                    Page._wrapper.html(htmlData);


                    updateLink();


                    title = $(Page._wrapper.children(".card")[0]).children("header:nth-child(n)").children("h2:nth-child(n)").text();

                    document.title = title;
                    history.pushState(state, title, "?rem=" + url);

                    console.log(title);

                }, loadingWaiting * 1.6);
                Page._wrapper.delay(30).animate({ opacity: 1 }, loadingWaiting);
            }
            else {
                Page._wrapper.html(htmlData);

                updateLink();

                title = $(Page._wrapper.children(".card")[0]).children("header:nth-child(n)").children("h2:nth-child(n)").text();
                document.title = title;
                history.pushState(state, title, "?rem=" + url);

                console.log(title);
            }





            setTimeout(function () {
                Page._wrapper.removeClass("loading");
            }, loadingWaiting * 1.3)


        })
    }, 100);





};
