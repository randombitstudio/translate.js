(function($){
    //Enable strict mode,
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
    //----------------------------------
    "use strict";

    //List of tags for elements that are currently supported
    //for translation.
    var allowedDomElements = ['INPUT'];
    
    //List of currently supported types for data submission.
    var allowedSubmitTypes = ['array', 'json'];

    //-------------------------------------
    //Constructor function for our plugin.
    //-------------------------------------    
    var Translate = function(element, options) {
        var self = this;
        
        this.$element = $(element);
        //Used only for json.
        this.$dataContainer = null;
        
        this.isOpen = false;
        
        this.options = $.extend({}, $.fn.translate.defaults, options);
        
        if ($.inArray(this.options.submits, allowedSubmitTypes) === -1) {
            throw new Error('Trying to use an unrecognized submit type [' + this.options.submits + '] in the transaltion plugin.');
        }

        this.$element.on('keyup', function() {
            var language = self.$element.data('language');
            var translation = self.$element.val();
            var translations = {};
            
            if (self.options.submits === 'json') {
        
                translations = $.extend({}, $.parseJSON(self.$dataContainer.val()));
                translations[language] = translation;
                self.$dataContainer.val(JSON.stringify(translations));
                
            } else if (self.options.submits === 'array') {
                
                $.each($('input[name^="' + self.$element.attr('name') + '["]'), function(index, dataContainer) {
                    translations[$(dataContainer).data('language')] = $(dataContainer).val();
                });

                translations[language] = translation;

                $.each(translations, function (language, translation) {
                    addArrayRow.call(self, language, translation);
                });
                
            }
        });
        
        if (this.options.submits === 'json') {
            
            this.$dataContainer = $('<input/>').attr('type', 'hidden')
                .attr('name', this.$element.attr('name'))
                .val(JSON.stringify(this.$element.data('translations')));
            
            this.$element.append(this.$dataContainer);        
            
        } else if (this.options.submits === 'array') {
            
            $.each(this.$element.data('translations'), function (language, translation) {
                addArrayRow.call(self, language, translation);
            });
            
        }
           
        //@TODO This can be improved, placement & template could be dynamic.
        this.$element.popover(
            {
                'container': 'body',
                'html': true,
                'placement':'bottom',
                'title': '',
                'trigger': 'manual',
                'template': '<div class=\"popover\" style=\"max-width: 420px;\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>',
                'content': function() {
                    return self.decode();
                }
            }
        );
        
        //Intentional compromise with style to keep those
        //out of limits.
        $.each(this.options.toggles, function(index, value) {
            if (value === 'doubleClick') {
                doubleClick.call(self);
            } else if (value === 'buttonClick') {
                buttonClick.call(self);
            }
        });
    };
    //-------------------------------------
    //END CONSTRUCTOR
    //-------------------------------------    

    //-------------------------------------
    //Private - proxy via .call(this,...)
    //-------------------------------------    
    function hide() {
        this.encode();
        this.$element.popover('hide');
        this.isOpen = false;
        return this;
    };

    function show() {
        this.$element.popover('show');
        this.isOpen = true;
        return this;
    };
    
    function doubleClick() {
        var self = this;
        this.$element.dblclick(function() {
            self.toggle();
        });
        return this;
    };
    
    function buttonClick() {
        var self = this;
        var origin = $('#' + this.options['buttonId']);
        if (origin.length === 1) {
            this.$element.after(
                origin.clone()
                    .attr('id', null)
                    .on(
                        'click',
                        function() {
                            self.toggle();
                        }
                    )
            );
        } else {
            throw new Error("A single instance of the translate button could not be located.");
        }
        return this;
    };       
    
    function addTranslationRow(language, translation, $template, $container) {
        var $translationRow = $template.clone().removeClass(this.options['templateClass']);        
        
        $translationRow.find('.' + this.options['languageClass']).text(language);
        $translationRow.find('.' + this.options['translationClass']).val(translation);
        $translationRow.find('.' + this.options['languageRemoveClass'])
            .on('click', function() {
                $translationRow.remove();
            });
        
        $container.append($translationRow);
        return this;
    };

    function addArrayRow(language, translation) {
        var dataContainer =  $('<input/>').attr('type', 'hidden')
            .attr('name', this.$element.attr('name') + '[' + language + ']')
            .data('language', language)
            .val(translation);
        
        this.$element.append(dataContainer);
        return this;
    };
    //-------------------------------------
    //END PRIVATE
    //-------------------------------------    

    //-------------------------------------
    //Public
    //-------------------------------------    
    Translate.prototype = {
        'toggle': function() {
            if (this.isOpen) {
                hide.call(this);
            } else {
                show.call(this)
            }
        },         
        'decode': function() {
            var self = this;
            var translations = {};
            var $translationContainer = $('#' + this.options['popupId'])
                .clone()
                .attr('id', null)
                .addClass(this.options['openPopupClass']);
            
            var $languageRow = $translationContainer.find('.' + this.options['translationRowClass']);            

            if (this.options['autocomplete'] !== null) {
                $translationContainer.find('.' + this.options['languageSelectClass'])
                    .typeahead(this.options['autocomplete']);
            }
            
            
            $translationContainer.find('.' + this.options['languageAddClass'])
                .on('click', function() {
                    var language = $translationContainer.find('.' + self.options['languageSelectClass']).val();
                    var languages = $translationContainer.find('.' + self.options['languageClass'])
                        .filter(function() {
                            return $(this).text() === language && $(this).parents('.' + self.options['templateClass']).length === 0;
                        }); 
                    if (languages.length === 0) {
                        addTranslationRow.call(
                            self,
                            language,
                            '',
                            $languageRow,
                            $translationContainer
                        )
                    }
                    
                });
            
            if (this.options.submits === 'json') {
                translations = $.parseJSON(this.$dataContainer.val());
            } else if (this.options.submits === 'array') {
                $.each($('input[name^="' + this.$element.attr('name') + '["]'), function(index, dataContainer) {
                    translations[$(dataContainer).data('language')] = $(dataContainer).val();
                }); 
            }
            
            $.each(translations, function (language, translation) {
                addTranslationRow.call(
                    self, 
                    language, 
                    translation, 
                    $languageRow, 
                    $translationContainer
                );
            });
            
            return $translationContainer;
        },
        'encode': function() {
            var self = this;
            var $translationContainer = $('.' + this.options['openPopupClass']);
            var translations = {};
            
            $.each($translationContainer.find('.' + this.options['translationRowClass'] + ':not(.' + this.options['templateClass']+ ')'), function(index, translationRow)  {
                translations[$(translationRow).find('.' + self.options['languageClass']).text()] = $(translationRow).find('.' + self.options['translationClass']).val();
            });
            
            if (this.options.submits === 'json') {
                this.$dataContainer.val(JSON.stringify(translations));
            } else if (this.options.submits === 'array') {
                
                $('input[name^="' + this.$element.attr('name') + '["]').remove();                
                $.each(translations, function (language, translation) {
                    addArrayRow.call(self, language, translation);
                });
                
            }
            
            this.$element.val('');
            if (typeof translations[this.$element.data('language')] !== 'undefined') {
                this.$element.val(translations[this.$element.data('language')]);
            }
            
            return this;
        }
    };
    
    $.fn.translate = function(option) {
        return this.each(function() {
            var $this = $(this);
            var instance = $this.data('translate');
            var options = $.extend({}, $.fn.translate.defaults, $this.data(), typeof option === 'object' && option);

            if ($.inArray($this.prop('tagName'), allowedDomElements) === -1 || $this.attr('type') !== 'text') {
                throw new Error('Translation of ' + $this.prop('tagName') + ' elements is currently not supported.');
            }
                        
            //Allow using data-translate as filter for elements that
            //need to be translated.
            if (!instance || typeof instance !== 'object') {
                instance = new Translate(this, options);
                $this.data('translate', instance);
            }
            
            if (typeof option === 'string') {
                instance[option].call($this);
            }
        });
    };
    
    $.fn.translate.defaults = {
        //Direct options to bootstraps' typeahead.
        'autocomplete' : {},
        
        //Functionality options
        'toggles': ['doubleClick', 'buttonClick'],
        'submits': 'json', //valid are 'json', 'array'

        //UI options
        'buttonId': 'translate-button',
        'popupId': 'translate-container',
        'openPopupClass': 'translate-current',
        'languageSelectClass': 'language-select',
        'languageAddClass': 'language-add',
        'languageRemoveClass': 'language-remove',
        'translationRowClass': 'translation-row',
        'languageClass': 'language-name',
        'translationClass': 'language-value',
        'templateClass': 'translation-template'
    };
     
    $.fn.translate.Constructor = Translate;
})(window.jQuery);
