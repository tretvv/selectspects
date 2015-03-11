$(document).ready(function() {
    $(document).on('click', 'div[data-item-url]', function() {
        window.location.href = $(this).data('item-url');
    });
});

var Core = {
    
    clone: function(o) {
        if (!o || typeof o != 'object') {
            return o;
        }
        var c = typeof o.pop == 'function' ? [] : {};
        var p, v;
        for (p in o) {
            if (o.hasOwnProperty(p)) {
                v = o[p];
                if (v && typeof v == 'object') {
                    c[p] = Core.clone(v);
                } else {
                    c[p] = v;
                }
            }
        }

        return c;
    }
    
}
