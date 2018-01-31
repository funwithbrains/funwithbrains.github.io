define([
  'underscore', './knockout', './jquery-2.1.4.min', './filesaver'
], (
  _, ko, jQuery, saveAs
) => {
  // underscore's `define` call is broken, but we worked around it

  ko.bindingHandlers.numericValue = {
    init : function(element, valueAccessor, allBindings, data, context) {
      var observable = ko.computed({
        read: () => ko.unwrap(valueAccessor()),
        write: (value) => {
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
    _,
    ko,
    $: jQuery,
    jQuery,
    saveAs
  };
});
