function inicializarNotificaciones(target, userEmail) {
    (function(i, s, o, g, r, a, m) {
        i['MagicBellObject'] = r;
        (i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments);
        }), (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (
            m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://assets.magicbell.io/magicbell.min.js', 'magicbell');

    var options = {
        apiKey: "fe895cc2053486135913f5557c5fae1ca049a04e",
        userEmail: userEmail,
        onNotificationClick: function(notification) {
            if (notification.actionUrl) window.open(notification.actionUrl, '_self');
        },
        height: 500,
        theme: { "icon": { "borderColor": "#000000", "width": "24px" }, "unseenBadge": { "backgroundColor": "#DF4759" }, "header": { "backgroundColor": "#4fde25", "textColor": "#ffffff", "borderRadius": "13px" }, "footer": { "backgroundColor": "#4fde25", "textColor": "#ffffff", "borderRadius": "13px" }, "notification": { "default": { "textColor": "#15091F", "borderRadius": "8px", "backgroundColor": "#4fde25" }, "unseen": { "backgroundColor": "#4fde25", "textColor": "#15091F", "borderRadius": "8px" }, "unread": { "backgroundColor": "#4fde25", "textColor": "#15091F", "borderRadius": "8px" } } },
    };

    magicbell('render', target, options);
}