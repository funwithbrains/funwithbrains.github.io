define(['underscore', './knockout', './jquery-2.1.4.min'], function (_, ko, jQuery) {
    // underscore's `define` call is broken, but we worked around it

    ko.bindingHandlers.numericValue = {
        init : function(element, valueAccessor, allBindings, data, context) {
            var observable = ko.computed({
                read: function() {
                    return ko.unwrap(valueAccessor());
                },
                write: function(value) {
                    if (!isNaN(value)) {
                        valueAccessor()(parseFloat(value));
                    }                
                },
                disposeWhenNodeIsRemoved: element 
            });

            ko.applyBindingsToNode(element, { value: observable }, context);
        }
    };    
    
    return {
        _: _,
        ko: ko,
        $: jQuery,
        jQuery: jQuery
    };
});
