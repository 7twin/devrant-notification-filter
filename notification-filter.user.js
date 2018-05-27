// ==UserScript==
// @name         Devrant Notification Filter
// @namespace    https://devrant.com/
// @version      0.5
// @description  Add category filters to notifications
// @author       7twin
// @match        https://devrant.com/notifs*
// @match        https://devrant.com/rants/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

// ------ config ------

var show_read = true;
var default_unread_filter = true;

// ------ config end ------


// current filter needle to search for
var filter = ((default_unread_filter === true) ? "unread" : false);

// unread states
var plusplus_unread = false;
var mentions_unread = false;
var comments_unread = false;
var subs_unread = false;

function reset_unread(){
    plusplus_unread = false;
    mentions_unread = false;
    comments_unread = false;
    subs_unread = false;
}

function set_unread_states(){
    if(plusplus_unread === true || mentions_unread === true || comments_unread === true || subs_unread === true){
        $("#all_link").css("color","#7CC8A2");
        $("#unread_link").css("color","#7CC8A2");
    }else{
        $("#all_link").css("color","rgba(255,255,255,0.7)");
        $("#unread_link").css("color","rgba(255,255,255,0.7)");
    }

    if(plusplus_unread === true){
        $("#plusplus_link").css("color","#7CC8A2");
    }else{
        $("#plusplus_link").css("color","rgba(255,255,255,0.7)");
    }

    if(mentions_unread === true){
        $("#mentions_link").css("color","#7CC8A2");
    }else{
        $("#mentions_link").css("color","rgba(255,255,255,0.7)");
    }

    if(comments_unread === true){
        $("#comments_link").css("color","#7CC8A2");
    }else{
        $("#comments_link").css("color","rgba(255,255,255,0.7)");
    }

    if(subs_unread === true){
        $("#subs_link").css("color","#7CC8A2");
    }else{
        $("#subs_link").css("color","rgba(255,255,255,0.7)");
    }
}

function check_unread(notification){
    if(notification.closest("li").hasClass("notif-new")){
        if(notification.text().indexOf("++'d your comment") !== -1 || notification.text().indexOf("++'d your rant") !== -1){
            plusplus_unread = true;
        }else if(notification.text().indexOf("comments on a rant you commented on") !== -1 || notification.text().indexOf("commented on your rant") !== -1){
            comments_unread = true;
        }else if(notification.text().indexOf("mentioned you in a comment") !== -1){
            mentions_unread = true;
        }else if(notification.text().indexOf("posted a new rant") !== -1){
            subs_unread = true;
        }
    }
}

function filter_notifications(){
    reset_unread();
    $("span.notif-body-text").each(function(){
        check_unread($(this));
        if(filter !== false){
            if($(this).text().indexOf(filter) !== -1){
                if(show_read === false && !$(this).closest("li").hasClass("notif-new")){
                    $(this).closest("li").hide();
                }else{
                    $(this).closest("li").show();
                }
            }else if(filter === "unread" && $(this).closest("li").hasClass("notif-new")){
                $(this).closest("li").show();
            }else{
                $(this).closest("li").hide();
            }
        }else{
            $(this).closest("li").show();
        }
    });
    set_unread_states();
}

function override_hyperlinks(){
    $('a.notif-link').off('click').on('click', function(e) {
        if($(this).attr("href").indexOf("/rants/") !== -1){
            e.preventDefault();
            if(filter === "unread"){
                $(this).closest("li").hide();
            }
            $(this).closest("li").removeClass("notif-new");
            filter_notifications();
            window.open($(this).attr("href"), '_blank');
        }
    });
}

function set_active_filter_badge(filter_index){
    $(".notif-selected").removeClass("notif-selected");

    if(filter_index === "all"){
        $("#all_link").addClass("notif-selected");
    }else if(filter_index === "plusplus"){
        $("#plusplus_link").addClass("notif-selected");
    }else if(filter_index === "mentions"){
        $("#mentions_link").addClass("notif-selected");
    }else if(filter_index === "comments"){
        $("#comments_link").addClass("notif-selected");
    }else if(filter_index === "subs"){
        $("#subs_link").addClass("notif-selected");
    }else if(filter_index === "unread"){
        $("#unread_link").addClass("notif-selected");
    }
}

function set_active_filter(filter_index){
    if(filter_index === "all"){
        filter = false;
    }else if(filter_index === "plusplus"){
        filter = "++'d";
    }else if(filter_index === "mentions"){
        filter = "mentioned you in a comment";
    }else if(filter_index === "comments"){
        filter = "comments on a rant you commented on";
    }else if(filter_index === "subs"){
        filter = "posted a new rant";
    }else if(filter_index === "unread"){
        filter = "unread";
    }

    set_active_filter_badge(filter_index);
    filter_notifications();
}

function bind_filter_links(){
    $('#all_link').on('click', function(e) {
        e.preventDefault();
        set_active_filter("all");
    });

    $('#unread_link').on('click', function(e) {
        e.preventDefault();
        set_active_filter("unread");
    });

    $('#plusplus_link').on('click', function(e) {
        e.preventDefault();
        set_active_filter("plusplus");
    });

    $('#mentions_link').on('click', function(e) {
        e.preventDefault();
        set_active_filter("mentions");
    });

    $('#comments_link').on('click', function(e) {
        e.preventDefault();
        set_active_filter("comments");
    });

    $('#subs_link').on('click', function(e) {
        e.preventDefault();
        set_active_filter("subs");
    });
}

function inject_filters(){
    var notifTypes = `
        <div class="notif-types">
            <a href="#" `+((default_unread_filter === false) ? 'class="notif-selected"' : '')+` id="all_link">All</a>
            <a href="#" `+((default_unread_filter === true) ? 'class="notif-selected"' : '')+` id="unread_link">Unread</a>
            <a href="#" id="plusplus_link">++'s</a>
            <a href="#" id="mentions_link">Mentions</a>
            <a href="#" id="comments_link">Comments</a>
            <a href="#" id="subs_link">Subs</a>
        </div>`;
    $(".notifs-tabs:first").html($(".notifs-tabs:first").html() + notifTypes);
}

function GM_onMessage(label, callback) {
  GM_addValueChangeListener(label, function() {
    callback.apply(undefined, arguments[2]);
  });
}

function GM_sendMessage(label) {
  GM_setValue(label, Array.from(arguments).slice(1));
}

function init_broadcast_listener(){
     GM_onMessage('_.unique.opened-rant', function(src, message) {
        if(src === "rant_read" && message.indexOf("https://devrant.com/rants/") !== -1){
           $("a.notif-link").each(function(){
               if(message.indexOf($(this).attr("href")) !== -1){
                  if($(this).closest("li").hasClass("notif-new")){
                     $(this).closest("li").removeClass("notif-new");
                     if(filter === "unread"){
                         $(this).closest("li").fadeOut(600, function() { $(this).closest("li").hide(); })
                     }
                  }
               }
           });

           filter_notifications();
        }
    });
}

(function() {
    'use strict';

    GM_addStyle(`
         .notif-selected{
             border-bottom: 1px solid !important;
             font-weight:100 !important;
         }

         .notif-types a{
             padding-right:0 !important;
             margin-right:10px;
         }
    `);

    init_broadcast_listener();
    inject_filters();
    bind_filter_links();

    $(document).ajaxStop(function () {
        override_hyperlinks();
        filter_notifications();
    });

    // broadcast rant to mark as viewed on notification page
    if(window.location.href.indexOf("https://devrant.com/rants/") !== -1){
        GM_sendMessage('_.unique.opened-rant', 'rant_read', window.location.href);
    }
})();
