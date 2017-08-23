(function () {
    function createElement(query) {
        var creatingEl = 'div';
        var classes = [];
        var id;
        var attrs = [];
        var minIndex = getWholeWord(query);
        if (minIndex > 0) {
            creatingEl = query.substring(0, minIndex);
            query = query.substring(minIndex);
        }
        while (query.length > 0) {
            var selector = query[0];
            var valueLength = getWholeWord(query.substring(1));
            var value = valueLength === -1 ? query.substring(1) : query.substring(1, valueLength + 1);
            switch (selector) {
                case '.':
                    classes.push(value);
                    break;
                case '#':
                    id = value;
                    break;
                case '[':
                    var equalIndex = value.indexOf('=');
                    if (equalIndex > -1) {
                        var attr = value.substring(0, equalIndex);
                        var attrValue = value.substring(equalIndex + 2, value.length - 2);
                        attrs.push({
                            attr: attr,
                            value: attrValue
                        });
                    } else {
                        attrs.push({
                            attr: value.substring(0, value.length - 1),
                            value: ''
                        });
                    }
                    break;
                case ' ':
                    break;
            }
            query = query.substring(value.length + 1);
        }
        var element = document.createElement(creatingEl);
        if (id) {
            element.id = id;
        }
        classes.forEach(function (cl) {
            element.classList.add(cl);
        });
        attrs.forEach(function (attr) {
            element.setAttribute(attr.attr, attr.value);
        });
        return element;
    }

    function getWholeWord(str) {
        var separatorClassIndex = str.indexOf('.');
        var separatorIdIndex = str.indexOf('#');
        var separatorAttributeIndex = str.indexOf('[');
        var separatorSpaceIndex = str.indexOf(' ');
        var existedIndexes = [separatorClassIndex, separatorIdIndex, separatorAttributeIndex, separatorSpaceIndex]
            .filter(function (t) {
                return t > -1
            });
        var minIndex = existedIndexes.length > 0 ? Math.min.apply(null, existedIndexes) : -1;
        return minIndex;
    }

    window.eDOM = {
        el: createElement
    };
})();