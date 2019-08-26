![image](https://user-images.githubusercontent.com/32747235/40572648-9644fc72-60b1-11e8-95fa-54e4cf3220fd.png)

# devrant-notification-filter
Add category filters to devrant notifications

# TOC

* [Features](#features)
* [Screenshots](#screenshots)
  * [Notifications](#notifications)
* [Download](#download)
* [ToDo](#todo)

# Features

* Adds notification categories
* Automatically marks notifications as read, if opened in new tab
* Shows unread categories in a different color
* Unread notifications tab
* If a notification gets read on the unread tab, it gets removed

# Screenshots

## Notifications
![image](https://user-images.githubusercontent.com/32747235/63718007-6ca6c480-c7fe-11e9-9650-c15b00776ef7.png)


# Download
Download tampermonkey:

* **Chrome:** https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
* **Firefox:** https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
* **Opera:** https://addons.opera.com/en/extensions/details/tampermonkey-beta/
* **Other:** https://tampermonkey.net/ (follow instructions there)

Then install the user-script here: https://github.com/7twin/devrant-notification-filter/raw/master/notification-filter.user.js

# ToDo

- [ ] add custom clear buttons for each category
- [x] add "Me" tab, where only all notifications targetting the user are shown

# Unlikely ToDo

- [ ] add filters ("++'s","mentions",..) to the "unread" tab
- [ ] add detection option for "pinned/subscribed comments" in the "comments" tab, which detects if you posted a "📌" or "." to subscribe to the comments (maybe change the notification text to say "New comments on a rant you subscribed to!")
