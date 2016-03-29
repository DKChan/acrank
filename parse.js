(function() {
    var a = [].indexOf ||
    function(a) {
        for (var e = 0,
        t = this.length; t > e; e++) if (e in this && this[e] === a) return e;
        return - 1
    };
    $(function() {
        return $.require("ready",
        function() {
            return function() {
                var a, e, t, i, n, r;
                return a = $$("#block-content-channel"),
                i = a.children(".mainer"),
                r = $$("#area-tool-banner").children("a"),
                t = "",
                e = function() {
                    return a.addClass("clear-trans"),
                    clearTimeout(t),
                    t = setTimeout(function() {
                        return a.removeClass("clear-trans")
                    },
                    1e3)
                },
                r.on("click",
                function() {
                    var t;
                    return t = $(this),
                    t.hasClass("active") ? void 0 : (e(), r.filter(".active").removeClass("active"), t.addClass("active"), "th-large" === t.data().th ? a.data().pageSize = 16 : "th-list" === t.data().th ? a.data().pageSize = 12 : a.data().pageSize = 30, i.hasClass("th-large") ? i.removeClass("th-large") : i.hasClass("th-list") && i.removeClass("th-list"), i.addClass(t.data().th), config.channel.style = t.data().th, $.save("config"))
                }),
                n = config.channel.style,
                r.filter("." + n).click()
            } (),
            function() {
                var a, e, t, i;
                return e = $("#block-content-channel"),
                a = e.find(".date-tool"),
                t = e.children(".mainer"),
                e.data({
                    startDate: +new Date - 6048e5,
                    endDate: +new Date + 864e5
                }),
                $.route(function() {
                    var a;
                    return a = system.hash,
                    i({
                        page: a.page,
                        order: a.order
                    })
                }),
                system.func.showList = i = function(a, i) {
                    var n;
                    return n = $.extend({
                        cid: $$("#stage").data().cid,
                        page: 1,
                        order: 0,
                        size: 16
                    },
                    a),
                    system.handle.dateSort ? (n.start = e.data().startDate, n.end = e.data().endDate) : n.start = n.end = void 0,
                    $.get("/dynamic/channel/" + (a.page || 1) + ".aspx", {
                        channelId: n.cid,
                        orderBy: n.order,
                        startDate: n.start,
                        endDate: n.end,
                        pageSize: e.data().pageSize || 16
                    }).done(function(e) {
                        var i, n;
                        return t.stop(!1, !0).css({
                            opacity: 0
                        }).html(e).transition({
                            opacity: 1
                        },
                        500),
                        a.firstIn || $$("#stage").scrollOnto(0),
                        i = t.find("div.empty .acnya"),
                        i.length && (n = 50 * Math.random() + 1 | 0, 10 > n && (n = "0" + n), i.attr({
                            src: system.path["short"] + "/umeditor/dialogs/emotion/images/ac/" + n + ".gif"
                        })),
                        t.find(".area-pager").readyPager({
                            addon: !0
                        },
                        function(a) {
                            return $.setHash({
                                page: a
                            })
                        })
                    }).fail(function() {
                        return $.info("error::获取视频列表失败。"),
                        a.firstIn ? t.html('<p class="alert info danger">获取视频列表失败，请于稍后重试。</p>') : void 0
                    })
                },
                a.hoverInfo("小提示：按日期筛选的最大时间间隔为一个月。"),
                $$("#sort-tool-list").delegate(".btn:not(.active)", "click",
                function() {
                    var a;
                    return a = $(this),
                    a.addClass("active primary").siblings(".active").removeClass("active primary"),
                    $.setHash({
                        order: a.data().order,
                        page: 1
                    })
                }),
                $("#ipt-date-list").click(function() {
                    var a;
                    return a = $(this),
                    a.hasClass("nv-ipt") && a.removeClass("nv-ipt"),
                    a.data().active ? (a.data({
                        active: 0
                    }).removeClass("active"), $("#win-date-list").shut(), $$("#ipt-date-list").children("span").each(function() {
                        var a;
                        return a = $(this),
                        a.text(a.data().value)
                    }), system.handle.dateSort = !1, 1 === (0 | system.hash.page) ? $$(window).hashchange() : $.setHash({
                        page: 1
                    })) : (system.handle.dateSort = !0, a.addClass("active").data({
                        active: 1
                    }).unfold({
                        src: "win-date-list",
                        id: "win-date-list",
                        "class": "win-children",
                        title: "选择日期",
                        icon: "clock-o",
                        left: 828,
                        top: 210,
                        width: 310,
                        height: "auto",
                        draggable: !1,
                        curtain: !1,
                        finish: function() {
                            return $$(window).resize()
                        }
                    }))
                })
            } (),
            function() {
                var a, e;
                if (system.hash.order) {
                    if (e = 0 | system.hash.order, a = $("#sort-tool-list"), 9 === e) return a.find(".active").removeClass("active primary"),
                    a.find(".order-rank").addClass("active primary");
                    if (13 === e) return a.find(".active").removeClass("active primary"),
                    a.find(".order-comms").addClass("active primary")
                }
            } (),
            function() {
                var a;
                return (a = function(a) {
                    var e, t;
                    return e = a.find("div.banner>div.r"),
                    t = a.find("div.mainer>div.page"),
                    e.delegate("a.tab:not(.active)", "click",
                    function(a) {
                        var e, i, n;
                        return a.preventDefault(),
                        n = $(this),
                        n.addClass("active").siblings("a.active").removeClass("active"),
                        i = t.eq(n.index()),
                        e = t.filter(".active"),
                        i.addClass("active").css({
                            opacity: 0
                        }).stop().transition({
                            opacity: 1
                        },
                        500),
                        e.removeClass("active"),
                        i.data().loaded ? void 0 : (i.find("img.preview").loadin(), i.data().loaded = 1)
                    }),
                    a.find("div.page.active").data({
                        loaded: 1
                    }).find("img.preview").loadin()
                })($("#block-rank-channel"))
            } (),
            function() {
                var e, t, i, n;
                e = $$("#stage").data().cid,
                i = $.parseChannel.map;
                for (t in i) if (n = i[t], a.call(n, e) >= 0) {
                    e = t;
                    break
                }
                return $$("#guide-bar").find('a[href="/v/list' + e + '/index.htm"]').addClass("current")
            } (),
            function() {
                return window.sa && sa.track("ChannelPage", {
                    from: document.referrer,
                    firstPage: window.saObj.isFirstPage,
                    channelId: window.saObj.channelId
                })
            } ()
        })
    })
}).call(this);