/*
*   Name: BizAgi Smartphone Workportal Facade
*   Author: Bizagi Mobile Team
*   Comments:
*   -   This script will define a workportal facade to access to all components
*/


$.Class.extend("bizagi.workportal.tablet.facade", {
    render_module: "renderingflat",

    setup: function () {                
        this.render_module = bizagi.override.enableMSF ? "rendering" : "renderingflat";
    },
    /*
    *   Returns the implementation class by widget
    */
    getWidgetImplementation: function(widget) {
        bizagi.log("getWidgetImplementation" + widget);
    }
}, {
    /*
    *   Constructor
    */
    init: function(dataService, device) {
        var self = this;
        self.templates = {};
        self.dataService = dataService;
        self.getMobileFeaturesFromBizagiConfig();
        self.setMobileMetaTags();
        self.setMobileIcons();
        self.modules = {};
        self.device = device;
        self.homePortalFramework = new bizagi.workportal.homeportalFramework(this);
        self.security = new bizagi.workportal.command.security(dataService);

        if (bizagi.override.enableMSF) {
            if (bizagi.hasOwnProperty("kendo")) {
                self.templateService = new bizagi.kendo.templates.services.service(bizagi.localization);
            } else {
                self.templateService = new bizagi.templates.services.service(bizagi.localization);
            }
        } else {
            self.templateService = new bizagi.kendo.templates.services.service(bizagi.localization);
        }
    },
    
    getMobileFeaturesFromBizagiConfig: function() {
        var self = this;
        
        // Bizagi config => Mobile Features
        self.dataService.getAndSaveMobileFeaturesFromBizagiConfig();
    },

    /* SETS iPhone META TAGS
    =====================================================*/
    setMobileMetaTags: function () {
        $('<meta>', {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }).appendTo('head');

        $('<meta>', {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }).appendTo('head');

        $('<link>', {
            rel: 'apple-touch-icon-precomposed',
            href: 'jquery/common/base/css/tablet/images/BizAgi_logo.png'
        }).appendTo('head');

        $('<link>', {
            rel: 'apple-touch-startup-image',
            href: 'jquery/common/base/css/tablet/images/splash.png'
        }).appendTo('head');
    },

    setMobileIcons: function () {
        var generatedIcons = '<svg xmlns="http://www.w3.org/2000/svg" display="none" width="0" height="0" id="genome-mobile-icons"><defs> <path d="M14,11 C14.5522847,11 15,11.4477153 15,12 C15,12.5522847 14.5522847,13 14,13 C13.4477153,13 13,12.5522847 13,12 C13,11.4477153 13.4477153,11 14,11 Z M10.62,11.22 C10.8071865,11.4087188 10.9115368,11.664197 10.91,11.93 C10.9115368,12.195803 10.8071865,12.4512812 10.62,12.64 L8.53,14.71 C8.34373936,14.8947442 8.09233988,14.9988954 7.83,15 C7.5627541,14.9988906 7.30707144,14.8908556 7.12,14.7 C6.73227641,14.3099625 6.73227641,13.6800375 7.12,13.29 L7.42,13 L4.55,13 C3.61113249,13.0026559 2.7096639,12.6322374 2.04390894,11.9702332 C1.37815398,11.308229 1.00264842,10.4088675 1,9.47 L1,7 C1,6.44771525 1.44771525,6 2,6 C2.55228475,6 3,6.44771525 3,7 L3,9.47 C3.01094569,10.3182207 3.70170869,11.0000706 4.55,11 L7.55,11 L7.12,10.58 C6.93068735,10.3922334 6.82420168,10.1366375 6.82420168,9.87 C6.82420168,9.60336246 6.93068735,9.3477666 7.12,9.16 C7.51003745,8.77227641 8.13996255,8.77227641 8.53,9.16 L10.62,11.22 Z M2,3 C2.55228475,3 3,3.44771525 3,4 C3,4.55228475 2.55228475,5 2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 Z M11.45,3 C12.3888675,2.99734409 13.2903361,3.36776255 13.9560911,4.02976678 C14.621846,4.691771 14.9973516,5.59113247 15,6.53 L15,9 C15,9.55228475 14.5522847,10 14,10 C13.4477153,10 13,9.55228475 13,9 L13,6.53 C12.9890543,5.6817793 12.2982913,4.99992938 11.45,5 L8.45,5 L8.88,5.42 C9.06931265,5.6077666 9.17579832,5.86336246 9.17579832,6.13 C9.17579832,6.39663754 9.06931265,6.6522334 8.88,6.84 C8.69128117,7.02718651 8.43580298,7.13153676 8.17,7.13 C7.90766012,7.12889538 7.65626064,7.02474416 7.47,6.84 L5.38,4.78 C5.19281349,4.59128117 5.08846324,4.33580298 5.09,4.07 C5.08846324,3.80419702 5.19281349,3.54871883 5.38,3.36 L7.47,1.29 C7.86212218,0.900639269 8.49563924,0.902877853 8.88499998,1.29500002 C9.27436072,1.68712218 9.27212216,2.32063925 8.88,2.71 L8.58,3 L11.45,3 Z" id="icon-sync-path-1"/> <style>.a{fill:none;}</style><style>.a{fill:#fff;}.b{fill:#da3b3b;}</style></defs><symbol viewBox="0 0 16 16" id="bz-arrow-left--16"><path d="M11,15a1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42L6.41,8l5.3-5.29a1,1,0,1,0-1.42-1.42l-6,6a1,1,0,0,0,0,1.42l6,6A1,1,0,0,0,11,15Z"/></symbol><symbol viewBox="0 0 16 16" id="bz-dots-v--16"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></symbol><symbol viewBox="0 0 16 16" id="bz-summary--16">  <path d="M12,3a1,1,0,0,0,0,2v8H4V5A1,1,0,0,0,4,3H3A1,1,0,0,0,2,4v9a2,2,0,0,0,2,2h9a1,1,0,0,0,1-1V5A2,2,0,0,0,12,3Z"/> <rect x="6" y="1" width="4" height="3" rx="1"/> <path d="M6,8h4a1,1,0,0,0,0-2H6A1,1,0,0,0,6,8Z"/> <path d="M10,9H6a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"/> </symbol><symbol viewBox="0 0 16 16" id="dots-menu"><g id="dots-menu-dots-menu-16x"><circle cx="8" cy="4" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="8" cy="12" r="1"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-sync"><desc>Created with sketchtool.</desc> <!-- Generator: sketchtool 54.1 (76490) - https://sketchapp.com -->    <g id="icon-sync-Mobile-Prototype" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-sync-Inbox-Offline-Edited" transform="translate(-311.000000, -157.000000)"> <g id="icon-sync-cases" transform="translate(0.000000, 141.000000)"> <g id="icon-sync-case"> <g id="icon-sync-edited" transform="translate(311.000000, 16.000000)"> <g id="icon-sync-2.0/16x/cloud"> <mask id="icon-sync-mask-2" fill="white"> <use xlink:href="#icon-sync-path-1"/> </mask> <use id="icon-sync-Mask" fill="#9E9E9E" xlink:href="#icon-sync-path-1"/> </g> </g> </g> </g> </g> </g> </symbol><symbol viewBox="0 0 32 32" id="icon-trash"><desc>Created with sketchtool.</desc> <!-- Generator: sketchtool 54.1 (76490) - https://sketchapp.com -->   <g id="icon-trash-Mobile-Prototype" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-trash-Drafts-Offline" transform="translate(-335.000000, -149.000000)"> <g id="icon-trash-cases" transform="translate(0.000000, 141.000000)"> <g id="icon-trash-case"> <g id="icon-trash-icon" transform="translate(335.000000, 8.000000)"> <rect id="icon-trash-box" x="0" y="0" width="32" height="32"/> <path d="M21,13 C21.553,13 22,13.447 22,14 L22,21 C22,22.654 20.654,24 19,24 L13,24 C11.346,24 10,22.654 10,21 L10,14 C10,13.447 10.447,13 11,13 C11.553,13 12,13.447 12,14 L12,21 C12,21.552 12.448,22 13,22 L19,22 C19.552,22 20,21.552 20,21 L20,14 C20,13.447 20.447,13 21,13 Z M14,19.5 C14,19.776 13.776,20 13.5,20 C13.224,20 13,19.776 13,19.5 L13,14.5 C13,14.224 13.224,14 13.5,14 C13.776,14 14,14.224 14,14.5 L14,19.5 Z M16.5,19.5 C16.5,19.776 16.276,20 16,20 C15.724,20 15.5,19.776 15.5,19.5 L15.5,14.5 C15.5,14.224 15.724,14 16,14 C16.276,14 16.5,14.224 16.5,14.5 L16.5,19.5 Z M19,19.5 C19,19.776 18.776,20 18.5,20 C18.224,20 18,19.776 18,19.5 L18,14.5 C18,14.224 18.224,14 18.5,14 C18.776,14 19,14.224 19,14.5 L19,19.5 Z M23,10 C23.553,10 24,10.447 24,11 C24,11.553 23.553,12 23,12 L9,12 C8.447,12 8,11.553 8,11 C8,10.447 8.447,10 9,10 L13,10 L13,9 C13,8.447 13.447,8 14,8 L18,8 C18.553,8 19,8.447 19,9 L19,10 L23,10 Z" id="icon-trash-trash" fill="#9E9E9E"/> </g> </g> </g> </g> </g> </symbol><symbol viewBox="0 0 16 16" id="star"><g id="star-star-16x"><path d="M11.708,14.20605a.50183.50183,0,0,1-.294-.0957L8,11.62988,4.58594,14.11035a.5.5,0,0,1-.76953-.55859L5.12012,9.53809,1.70605,7.05762A.4999.4999,0,0,1,2,6.15332H6.22021l1.3042-4.01367a.52044.52044,0,0,1,.95118,0l1.3042,4.01367H14a.4999.4999,0,0,1,.294.9043L10.87988,9.53809l1.30371,4.01367a.50021.50021,0,0,1-.47558.65429ZM8,10.51172a.50193.50193,0,0,1,.294.0957l2.46337,1.79L9.81641,9.501a.49916.49916,0,0,1,.18164-.5586l2.46289-1.78906H9.4165a.5.5,0,0,1-.47558-.3457L8,3.91211,7.05908,6.80762a.5.5,0,0,1-.47558.3457H3.53906L6.002,8.94238a.49916.49916,0,0,1,.18164.5586l-.94091,2.89648,2.46337-1.79A.50193.50193,0,0,1,8,10.51172Z"/></g></symbol><symbol viewBox="0 0 24 24" id="bz-arrow-left--24"><path d="M17,23a1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42L8.41,12l9.3-9.29a1,1,0,1,0-1.42-1.42l-10,10a1,1,0,0,0,0,1.42l10,10A1,1,0,0,0,17,23Z"/></symbol><symbol viewBox="0 0 24 24" id="bz-dots-v--24"><circle cx="12" cy="7" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="17" r="1.5"/></symbol><symbol viewBox="0 0 24 24" id="bz-summary--24"><path d="M18,5a1,1,0,0,0,0,2,1,1,0,0,1,1,1V21H6a1,1,0,0,1-1-1V7H6A1,1,0,0,0,6,5H4A1,1,0,0,0,3,6V20a3,3,0,0,0,3,3H20a1,1,0,0,0,1-1V8A3,3,0,0,0,18,5Z"/><path d="M9,7h6a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H14V2a1,1,0,0,0-1-1H11a1,1,0,0,0-1,1V3H9A1,1,0,0,0,8,4V6A1,1,0,0,0,9,7Zm3-3a1,1,0,0,0,1,1H11A1,1,0,0,0,12,4Z"/><path d="M8,11h8a1,1,0,0,0,0-2H8a1,1,0,0,0,0,2Z"/><path d="M16,13H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"/><path d="M16,17H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"/></symbol><symbol viewBox="0 0 24 24" id="bzg-arrow-left"><path d="M17,23a1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42L8.41,12l9.3-9.29a1,1,0,1,0-1.42-1.42l-10,10a1,1,0,0,0,0,1.42l10,10A1,1,0,0,0,17,23Z"/></symbol><symbol viewBox="0 0 24 24" id="bzg-edit"><path d="M14.71,5.29a1,1,0,0,0-1.42,0l-12,12A1,1,0,0,0,1,18v4a1,1,0,0,0,1,1H6a1,1,0,0,0,.71-.29L17.29,12.12a3,3,0,0,0,0-4.24ZM3,21V18.41L5.59,21ZM15.88,10.71,7,19.59,4.41,17,14,7.41l1.88,1.88A1,1,0,0,1,15.88,10.71Z"/><path d="M21.71,2.29a3.84,3.84,0,0,0-5.42,0l-1,1a1,1,0,0,0,0,1.42l4,4a1,1,0,0,0,1.42,0l1-1A3.84,3.84,0,0,0,21.71,2.29Zm-1.42,4-.29.3L17.41,4l.3-.29a1.82,1.82,0,1,1,2.58,2.58Z"/></symbol><symbol viewBox="0 0 24 24" id="bzg-sync"><g id="bzg-sync-sync-24x"><path d="M12,1A11.03251,11.03251,0,0,0,4.333,4.12646V2a1,1,0,0,0-2,0V7a.9471.9471,0,0,0,.0318.15759.97252.97252,0,0,0,.02966.147,1.36527,1.36527,0,0,0,.18414.33252.97322.97322,0,0,0,.18116.16027.9342.9342,0,0,0,.07714.0683c.01526.00879.03254.00824.048.01612a.97526.97526,0,0,0,.20746.06958A.97927.97927,0,0,0,3.2738,7.988C3.29449,7.98932,3.312,8,3.333,8h5a1,1,0,0,0,0-2H5.31873A8.98139,8.98139,0,0,1,21,12a1,1,0,0,0,2,0A11.01245,11.01245,0,0,0,12,1Z"/><path d="M21.60565,16.69556a1.36192,1.36192,0,0,0-.18365-.332.97292.97292,0,0,0-.18445-.163.92322.92322,0,0,0-.07446-.06579c-.01484-.00861-.0315-.00806-.04657-.01581a1.59562,1.59562,0,0,0-.39454-.10785C20.70276,16.01,20.68652,16,20.667,16h-5a1,1,0,1,0,0,2h3.01428A8.98139,8.98139,0,0,1,3,12a1,1,0,0,0-2,0,10.98942,10.98942,0,0,0,18.667,7.87329V22a1,1,0,0,0,2,0V17a.94293.94293,0,0,0-.0318-.15784A.964.964,0,0,0,21.60565,16.69556Z"/></g></symbol><symbol viewBox="0 0 16 16" id="activity"><g id="activity-icon-name-16x"><path d="M8,10.5a.49989.49989,0,0,1-.44727-.27637L6.69092,8.5H6a.5.5,0,0,1,0-1H7a.5011.5011,0,0,1,.44727.27637L7.96533,8.8125l2.5752-6.00977A.47665.47665,0,0,1,11.00586,2.5a.50143.50143,0,0,1,.4585.31445L13.33838,7.5H14a.5.5,0,0,1,0,1H13a.49951.49951,0,0,1-.46436-.31445L10.98389,4.30664,8.45947,10.19727A.50017.50017,0,0,1,8.01465,10.5Z"/><path d="M3,8.5H2a.5.5,0,0,1,0-1H3a.5.5,0,0,1,0,1Z"/><path d="M13,14.5H3a.5.5,0,0,1,0-1H13a.5.5,0,0,1,0,1Z"/></g></symbol><symbol viewBox="0 0 16 16" id="arrow-down"><g id="arrow-down-arrow-down-16x"><path d="M8,11.5a.47.47,0,0,1-.35-.15l-6-6a.48.48,0,0,1,0-.7.5.5,0,0,1,.71,0L8,10.29l5.64-5.64a.5.5,0,0,1,.71,0A.49.49,0,0,1,14.5,5a.47.47,0,0,1-.15.35l-6,6A.47.47,0,0,1,8,11.5Z"/></g></symbol><symbol viewBox="0 0 16 16" id="arrow-sort-down"><g id="arrow-sort-down-arrow-sort-down-16x"><path d="M13.21,10.21l-4.5,4.5a1,1,0,0,1-.33.21.92.92,0,0,1-.76,0,1,1,0,0,1-.33-.21l-4.5-4.5A1,1,0,0,1,2.5,9.5a1,1,0,0,1,.29-.71,1,1,0,0,1,1.42,0L7,11.59V2A1,1,0,0,1,9,2v9.59l2.79-2.8a1,1,0,0,1,1.42,0A1,1,0,0,1,13.21,10.21Z"/></g></symbol><symbol viewBox="0 0 16 16" id="arrow-sort-up"><g id="arrow-sort-up-sort-up-16x"><path d="M13.21,5.79l-4.5-4.5a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4.5,4.5a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L7,4.41V14a1,1,0,0,0,2,0V4.41l2.79,2.8a1,1,0,0,0,1.42,0A1,1,0,0,0,13.21,5.79Z"/></g></symbol><symbol viewBox="0 0 16 16" id="arrow-up"><g id="arrow-up-arrow-up-16x"><path d="M14,11.5a.51.51,0,0,1-.36-.15L8,5.71,2.36,11.35a.5.5,0,0,1-.71,0A.49.49,0,0,1,1.5,11a.47.47,0,0,1,.15-.35l6-6a.48.48,0,0,1,.7,0l6,6a.5.5,0,0,1-.35.85Z"/></g></symbol><symbol viewBox="0 0 12 12" id="bzg-clear-circle"><path d="M6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM8.42,7a1,1,0,0,1,0,1.41A1,1,0,0,1,7,8.42l-1-1-1,1a1,1,0,0,1-1.41,0A1,1,0,0,1,3.58,7l1-1-1-1A1,1,0,0,1,5,3.58l1,1,1-1A1,1,0,0,1,8.42,5l-1,1Z"/></symbol><symbol viewBox="0 0 16 16" id="bzg-edit"><path d="M10.71,3.29a1,1,0,0,0-1.42,0l-8,8A1,1,0,0,0,1,12v2a1,1,0,0,0,1,1H4a1,1,0,0,0,.71-.29L12,7.41a2,2,0,0,0,0-2.82ZM3.59,13H3v-.59l7-7,.59.59Z"/><path d="M14.71,1.29a2.43,2.43,0,0,0-3.42,0,1,1,0,0,0,0,1.42l2,2a1,1,0,0,0,1.42,0,2.44,2.44,0,0,0,0-3.42Z"/></symbol><symbol viewBox="0 0 16 16" id="bzg-sync"><g id="bzg-sync-sync-16x"><path d="M8,1A7.01076,7.01076,0,0,0,3.7998,2.40869V2a1,1,0,0,0-2,0V5a.94306.94306,0,0,0,.02875.14227.90487.90487,0,0,0,.389.649.93942.93942,0,0,0,.08423.07446c.01672.00971.03564.00916.05267.01782a.97641.97641,0,0,0,.19452.0658.973.973,0,0,0,.194.03919C2.76282,5.98969,2.7796,6,2.7998,6h3a1,1,0,1,0,0-2H5.00928A4.993,4.993,0,0,1,13,8a1,1,0,0,0,2,0A7.00818,7.00818,0,0,0,8,1Z"/><path d="M14.13745,10.68872a1.35284,1.35284,0,0,0-.18512-.32941.97349.97349,0,0,0-.17334-.15319.92492.92492,0,0,0-.08075-.07135c-.016-.00934-.03418-.00879-.05053-.01716a1.59015,1.59015,0,0,0-.392-.10644C13.23633,10.01007,13.21991,10,13.2002,10h-3a1,1,0,0,0,0,2h.79064A4.99313,4.99313,0,0,1,3,8,1,1,0,0,0,1,8a6.99166,6.99166,0,0,0,11.2002,5.59149V14a1,1,0,0,0,2,0V11a.94717.94717,0,0,0-.02887-.14313A.97211.97211,0,0,0,14.13745,10.68872Z"/></g></symbol><symbol viewBox="0 0 16 16" id="bzg-undo"><path d="M11,4H3.87l1-1.45a1,1,0,0,0-1.66-1.1l-2,3a.47.47,0,0,0,0,.1l-.05.1a1.05,1.05,0,0,0,0,.7l.05.1a.47.47,0,0,0,0,.1l2,3A1,1,0,0,0,4,9a.94.94,0,0,0,.55-.17,1,1,0,0,0,.28-1.38L3.87,6H11a2,2,0,0,1,2,2V9a2,2,0,0,1-2,2H2a1,1,0,0,0,0,2h9a4,4,0,0,0,4-4V8A4,4,0,0,0,11,4Z"/></symbol><symbol viewBox="0 0 16 16" id="chart-bars"><g id="chart-bars-chart-bars-16x"><path d="M14.5,14H14V7.5a.5.5,0,0,0-.5-.5h-2a.5.5,0,0,0-.5.5V14H10V5.5A.5.5,0,0,0,9.5,5h-2a.5.5,0,0,0-.5.5V14H6V9.5A.5.5,0,0,0,5.5,9h-2a.5.5,0,0,0-.5.5V14H2V3h.5a.5.5,0,0,0,0-1h-1a.5.5,0,0,0-.5.5v12a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,0-1ZM4,14V10H5v4Zm4,0V6H9v8Zm4,0V8h1v6Z"/></g></symbol><symbol viewBox="0 0 16 16" id="dots-menu"><g id="dots-menu-dots-menu-16x"><circle cx="8" cy="4" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="8" cy="12" r="1"/></g></symbol><symbol viewBox="0 0 16 16" id="filter"><g id="filter-filter-16x"><path d="M5.7,14.86V7.27L1,1H15L10.3,7.27v5ZM3,2,6.7,6.94v6.2l2.6-1.5V6.94L13,2Z"/></g></symbol><symbol viewBox="0 0 16 16" id="gear"><g id="gear-gear-16x"><path d="M8.72,15H7.34c-.54,0-.71-.33-1.33-1.89L5.82,13c-1.41.64-1.59.64-1.73.64H4l-.43-.22-1-1c-.39-.41-.25-.78.4-2.29L2.9,10C1.33,9.44,1,9.27,1,8.72V7.34c0-.57.37-.73,1.9-1.33L3,5.82C2.27,4.3,2.15,4,2.54,3.56l1-1A.76.76,0,0,1,4,2.37,5.74,5.74,0,0,1,5.8,3L6,2.9C6.56,1.36,6.73,1,7.28,1H8.66c.54,0,.71.33,1.33,1.89l.19.08c1.42-.65,1.58-.66,1.74-.64l.19,0,.33.18,1,1c.39.39.27.75-.39,2.29L13.1,6c1.56.57,1.9.73,1.9,1.29V8.66c0,.57-.37.73-1.9,1.33l-.07.19c.7,1.52.82,1.87.43,2.26l-1,1a.76.76,0,0,1-.52.21c-.13,0-.32,0-1.75-.61l-.2.08C9.43,14.67,9.27,15,8.72,15ZM7.48,14H8.57c.1-.21.29-.67.55-1.39l.08-.21.23-.14.78-.33.19.08c.91.4,1.31.54,1.48.6l.77-.77c-.07-.22-.27-.68-.59-1.38l-.1-.19L12,10l.32-.78.2-.08C12.88,9,13.7,8.68,14,8.52V7.43c-.2-.11-.67-.29-1.39-.56l-.27-.09-.41-1,.09-.2c.14-.33.49-1.14.59-1.47l-.77-.77c-.15,0-.52.2-1.38.6l-.2.09L10,4l-.79-.33-.07-.19C9,3.12,8.68,2.3,8.52,2H7.43c-.1.21-.29.67-.55,1.39l-.08.2-.22.15-.79.33L5.6,4A15.17,15.17,0,0,0,4.12,3.4l-.77.76c.07.22.27.68.59,1.38l.1.19L4,6l-.32.78-.2.08C3.12,7,2.3,7.32,2,7.48V8.57c.2.11.67.29,1.39.56l.21.07.15.23.32.78-.09.2c-.14.33-.49,1.14-.59,1.47l.77.77c.15-.06.52-.2,1.38-.6l.2-.09L6,12l.79.33.08.2C7,12.89,7.32,13.7,7.48,14Z"/><path d="M8,10.5A2.5,2.5,0,1,1,10.5,8,2.5,2.5,0,0,1,8,10.5Zm0-4A1.5,1.5,0,1,0,9.5,8,1.5,1.5,0,0,0,8,6.5Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-check-mark"><g id="icon-check-mark-check-mark-24x"><path d="M8.11,19.36a1,1,0,0,1-.71-.29l-4.95-5a1,1,0,0,1,0-1.41,1,1,0,0,1,1.42,0L8.11,17l12-12a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.41L8.82,19.07A1,1,0,0,1,8.11,19.36Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-close"><g id="icon-close-close-16x"><path d="M9.41,8l5.3-5.29a1,1,0,1,0-1.42-1.42L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L8,9.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-download"><g id="icon-download-download-24x"><path d="M22,23H2a1,1,0,0,1-1-1V17a1,1,0,0,1,2,0v4H21V17a1,1,0,0,1,2,0v5A1,1,0,0,1,22,23Z"/><path d="M19,10a1,1,0,0,0-.29-.71,1,1,0,0,0-1.42,0L13,13.58V2a1,1,0,0,0-2,0V13.58L6.71,9.29a1,1,0,0,0-1.42,1.42l6,6a.91.91,0,0,0,.33.22.69.69,0,0,0,.24,0A.7.7,0,0,0,12,17a.7.7,0,0,0,.14,0,.69.69,0,0,0,.24,0,.91.91,0,0,0,.33-.22l6-6A1,1,0,0,0,19,10Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-offline"><desc>Created with sketchtool.</desc> <!-- Generator: sketchtool 54.1 (76490) - https://sketchapp.com -->   <g id="icon-offline-Mobile-Prototype" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-offline-Inbox-Offline" transform="translate(-32.000000, -97.000000)" fill="#9E9E9E"> <g id="icon-offline-controls/alert" transform="translate(16.000000, 84.000000)"> <g id="icon-offline-icon" transform="translate(16.000000, 13.000000)"> <path d="M7.86075713,14.278983 L8.17741033,13.9623298 C8.61266861,13.5270715 9.31870454,13.5270715 9.75396283,13.9623298 L12.0238702,16.2322372 L14.2937776,13.9623298 C14.7290359,13.5270715 15.4350718,13.5270715 15.8703301,13.9623298 L16.1869833,14.278983 C16.6222416,14.7146143 16.6222416,15.4202772 16.1869833,15.8555355 L13.9170759,18.1250699 L16.0777025,20.2856965 C16.5129608,20.7209548 16.5129608,21.4273637 16.0777025,21.862622 L15.7610493,22.1789022 C15.325791,22.6141605 14.6197551,22.6141605 14.1844968,22.1789022 L12.0238702,20.0182756 L9.86287064,22.1789022 C9.42761236,22.6141605 8.72157643,22.6141605 8.28631815,22.1789022 L7.96966495,21.862622 C7.53440666,21.4273637 7.53440666,20.7209548 7.96966495,20.2856965 L10.1302915,18.1250699 L7.86075713,15.8555355 C7.42549885,15.4202772 7.42549885,14.7142413 7.86075713,14.278983 M4.49878784,10.0558215 C6.56169578,8.40765836 9.17138062,7.41517996 12.0171567,7.41517996 C14.846522,7.41517996 17.4431529,8.39572325 19.5008392,10.0267297 C19.8999192,10.2557344 20.1714428,10.6812955 20.1714428,11.1743644 C20.1714428,11.9080002 19.5769255,12.5025176 18.8436626,12.5025176 C18.4408529,12.5025176 18.0842917,12.3193883 17.840741,12.0359296 L17.8317896,12.044881 C16.2276372,10.7887114 14.2128427,10.0334432 12.0175297,10.0334432 C9.81028159,10.0334432 7.78504382,10.7965438 6.17678871,12.0646485 L6.16746441,12.0553242 C5.92391372,12.3440045 5.56399577,12.5316094 5.15671039,12.5316094 C4.42307453,12.5316094 3.82855722,11.9370921 3.82855722,11.2034562 C3.82818425,10.7103873 4.09970784,10.2851992 4.49878784,10.0558215 M24,7.33573693 C24,8.06899981 23.4054827,8.6638901 22.6714739,8.6638901 C22.2716479,8.6638901 21.9173245,8.48337167 21.6737739,8.20326972 L21.632001,8.24504258 C19.0402188,6.00497296 15.6648225,4.64660906 11.9701622,4.64660906 C8.288183,4.64660906 4.92322994,5.99564866 2.3348045,8.22191832 C2.09125381,8.50798782 1.73282775,8.69298191 1.32815317,8.69298191 C0.594517312,8.69298191 0,8.0984646 0,7.36482874 C0,6.90495431 0.234226394,6.49990676 0.589668677,6.26157767 C3.65475228,3.60937403 7.64629825,2 12.0175297,2 C16.3730963,2 20.3515882,3.59818487 23.4118232,6.2332318 C23.7665195,6.47156089 24,6.87623547 24,7.33573693" id="icon-offline-icon-offline"/> </g> </g> </g> </g> </symbol><symbol viewBox="0 0 16 16" id="icon-refresh"><g id="icon-refresh-refresh-16x"><path d="M13.84,7.16a1,1,0,0,0-1,1,4.85,4.85,0,1,1-2.05-4h-1a1,1,0,0,0,0,2H13a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0v.57a6.84,6.84,0,1,0,2.89,5.59A1,1,0,0,0,13.84,7.16Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-retrieve-offline"><g id="icon-retrieve-offline-retrieving-24x"><path d="M5.24,13.45a2.86,2.86,0,0,1-.1-4.64l.78-.59-.26-.94a1.09,1.09,0,0,1,0-.26A1.34,1.34,0,0,1,7,5.71a1.65,1.65,0,0,1,.38,0l1.13.33.55-1a3.91,3.91,0,0,1,3.48-2,4,4,0,0,1,2.37.8l1.43-1.43A6,6,0,0,0,7.49,3.75,3.35,3.35,0,0,0,3.63,7a3,3,0,0,0,0,.42,4.83,4.83,0,0,0,.16,7.42Z"/><path d="M18.33,5.71a5.13,5.13,0,0,0-.26-.87l2.14-2.13a1,1,0,1,0-1.42-1.42l-15,15a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L6.92,16H11v3.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3a1,1,0,0,0-1.42-1.42L13,19.59V16h3.64A5.27,5.27,0,0,0,18.33,5.71ZM16.64,14H8.91l7.51-7.51.11.81.95.24A3.27,3.27,0,0,1,16.64,14Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-warning"><g id="icon-warning-warning-24x"><path d="M21.33,23H2.62A2,2,0,0,1,.83,20.11L10.18,2.33A2,2,0,0,1,12,1.24h0a2,2,0,0,1,1.79,1.11l9.36,17.74A2,2,0,0,1,21.33,23ZM12,3.26,2.6,21l18.74,0Z"/><path d="M12,16a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v7A1,1,0,0,1,12,16Z"/><circle cx="12" cy="18" r="1"/></g></symbol><symbol viewBox="0 0 16 16" id="logout"><g id="logout-logout-16x"><path d="M4.5,15h-3a.5.5,0,0,1-.5-.5V1.5A.5.5,0,0,1,1.5,1h3a.5.5,0,0,1,0,1H2V14H4.5a.5.5,0,0,1,0,1Z"/><path d="M14.85,7.65l-4-4a.51.51,0,0,0-.71,0A.5.5,0,0,0,10,4a.49.49,0,0,0,.14.35L13.29,7.5H6a.5.5,0,0,0,0,1h7.29l-3.15,3.15a.51.51,0,0,0,0,.71.5.5,0,0,0,.36.14.49.49,0,0,0,.35-.14l4-4a.48.48,0,0,0,0-.7Z"/></g></symbol><symbol viewBox="0 0 16 16" id="menu"><g id="menu-menu-16x"><path d="M12.5,4h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"/><path d="M12.5,8h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"/><path d="M12.5,12h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"/></g></symbol><symbol viewBox="0 0 16 16" id="panel-detail"><g id="panel-detail-panel-detail-16x"><path d="M13.5,1.5H2.5a1.001,1.001,0,0,0-1,1v11a1.001,1.001,0,0,0,1,1h11a1.001,1.001,0,0,0,1-1V2.5A1.001,1.001,0,0,0,13.5,1.5Zm-11,1h3v11h-3ZM13.5,14v-.5h-7V2.5h7v11h.001Z"/><path d="M11,4.5H9a.5.5,0,0,0,0,1h2a.5.5,0,0,0,0-1Z"/><path d="M11,7.5H9a.5.5,0,0,0,0,1h2a.5.5,0,0,0,0-1Z"/><path d="M11,10.5H9a.5.5,0,0,0,0,1h2a.5.5,0,0,0,0-1Z"/></g></symbol><symbol viewBox="0 0 16 16" id="plus"><g id="plus-plus-16x"><path d="M14.5,7.5h-6v-6a.5.5,0,0,0-1,0v6h-6a.5.5,0,0,0,0,1h6v6a.5.5,0,0,0,1,0v-6h6a.5.5,0,0,0,0-1Z"/></g></symbol><symbol viewBox="0 0 16 16" id="search"><g id="search-search-16x"><path d="M14.85,14.15l-4-4A.53.53,0,0,0,10.7,10,5.44,5.44,0,0,0,12,6.5,5.5,5.5,0,1,0,6.5,12,5.44,5.44,0,0,0,10,10.7a.53.53,0,0,0,.11.15l4,4a.48.48,0,0,0,.7,0A.48.48,0,0,0,14.85,14.15ZM6.5,11A4.5,4.5,0,1,1,11,6.5,4.51,4.51,0,0,1,6.5,11Z"/></g></symbol><symbol viewBox="0 0 16 16" id="sort-down"><g id="sort-down-sort-down-16x"><path d="M14,3.5H2a.5.5,0,0,1,0-1H14a.5.5,0,0,1,0,1Z"/><path d="M11,6.833H2a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"/><path d="M8,10.167H2a.5.5,0,0,1,0-1H8a.5.5,0,0,1,0,1Z"/><path d="M5,13.5H2a.5.5,0,0,1,0-1H5a.5.5,0,0,1,0,1Z"/></g></symbol><symbol viewBox="0 0 16 16" id="star"><g id="star-star-16x"><path d="M11.708,14.20605a.50183.50183,0,0,1-.294-.0957L8,11.62988,4.58594,14.11035a.5.5,0,0,1-.76953-.55859L5.12012,9.53809,1.70605,7.05762A.4999.4999,0,0,1,2,6.15332H6.22021l1.3042-4.01367a.52044.52044,0,0,1,.95118,0l1.3042,4.01367H14a.4999.4999,0,0,1,.294.9043L10.87988,9.53809l1.30371,4.01367a.50021.50021,0,0,1-.47558.65429ZM8,10.51172a.50193.50193,0,0,1,.294.0957l2.46337,1.79L9.81641,9.501a.49916.49916,0,0,1,.18164-.5586l2.46289-1.78906H9.4165a.5.5,0,0,1-.47558-.3457L8,3.91211,7.05908,6.80762a.5.5,0,0,1-.47558.3457H3.53906L6.002,8.94238a.49916.49916,0,0,1,.18164.5586l-.94091,2.89648,2.46337-1.79A.50193.50193,0,0,1,8,10.51172Z"/></g></symbol><symbol viewBox="0 0 12 12" id="status-at-risk"><path d="M10,11H2a1,1,0,0,1-.89-1.45l4-8a1,1,0,0,1,1.8,0l4,8A1,1,0,0,1,10,11ZM3.62,9H8.38L6,4.21Z"/></symbol><symbol viewBox="0 0 12 12" id="status-on-time"><path d="M6,11a5,5,0,1,1,5-5A5,5,0,0,1,6,11ZM6,3A3,3,0,1,0,9,6,3,3,0,0,0,6,3Z"/></symbol><symbol viewBox="0 0 12 12" id="status-overdue"><path d="M8,11H4A3,3,0,0,1,1,8V4A3,3,0,0,1,4,1H8a3,3,0,0,1,3,3V8A3,3,0,0,1,8,11ZM4,3A1,1,0,0,0,3,4V8A1,1,0,0,0,4,9H8A1,1,0,0,0,9,8V4A1,1,0,0,0,8,3Z"/></symbol><symbol viewBox="0 0 24 24" id="sync-cases"><path d="M18.6,18H6a4.1,4.1,0,0,1-.28-8.19A6.5,6.5,0,0,1,18.48,11a3.5,3.5,0,1,1,.12,7ZM6,10.8A3.1,3.1,0,0,0,6,17H18.6a2.5,2.5,0,0,0,0-5,2.94,2.94,0,0,0-.51.05l-.63.13,0-.64A5.49,5.49,0,0,0,6.61,10.41l-.08.41L6,10.8Z"/></symbol><symbol viewBox="0 0 24 24" id="sync-failed"><circle class="a" cx="18" cy="15" r="4"/><path class="a" d="M12.26,18H5.65a4.47,4.47,0,0,1-3.79-7.12A4.48,4.48,0,0,1,5.5,9a6.45,6.45,0,0,1,12.07.39.5.5,0,1,1-.94.32,5.46,5.46,0,0,0-10.32,0,.5.5,0,0,1-.52.33H5.64l-.16,0a3.48,3.48,0,0,0-2.81,1.43,3.55,3.55,0,0,0-.49,3.2A3.59,3.59,0,0,0,5.65,17h6.61a.5.5,0,0,1,0,1Z"/><path class="b" d="M18.77,15l1.07-1.07a.54.54,0,0,0-.77-.77L18,14.23l-1.07-1.07a.54.54,0,0,0-.77.77L17.23,15l-1.07,1.07a.55.55,0,0,0,.39.93.52.52,0,0,0,.38-.16L18,15.77l1.07,1.07a.52.52,0,0,0,.38.16.55.55,0,0,0,.39-.93Z"/></symbol><symbol viewBox="0 0 16 16" id="view-grid"><g id="view-grid-view-grid-16x"><path d="M7,7H1V1H7ZM2,6H6V2H2Z"/><path d="M7,15H1V9H7ZM2,14H6V10H2Z"/><path d="M15,7H9V1h6ZM10,6h4V2H10Z"/><path d="M15,15H9V9h6Zm-5-1h4V10H10Z"/></g></symbol></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="sync-failed-24x"><path d="M11.91309,17.5H5.82129a4.26506,4.26506,0,0,1-4.10938-2.82031A4.17882,4.17882,0,0,1,5.667,9.167h.00489A6.12717,6.12717,0,0,1,11.165,5.5h.02344a6.104,6.104,0,0,1,5.34277,3.27539.49962.49962,0,0,1-.89258.44922A5.1569,5.1569,0,0,0,11.1875,6.5H11.169a5.1372,5.1372,0,0,0-4.708,3.376.49011.49011,0,0,1-.5127.32129l-.13867-.01661A1.137,1.137,0,0,0,5.667,10.167a3.18006,3.18006,0,0,0-2.55664,1.29785A3.16088,3.16088,0,0,0,5.82129,16.5h6.0918a.5.5,0,0,1,0,1Z" fill="#FFFFFF"/><circle cx="18" cy="16" r="4" fill="#DA3B3B"/></g></svg>';
        $("head").append(generatedIcons);
    },

    /*
    *   This function will load asynchronous stuff needed in the module
    */
    initAsyncStuff: function() {
        var self = this;
        // Load default templates            
        return $.when(self.loadTemplate("base", bizagi.getTemplate("base.workportal.tablet")))
            .then(function(template) {
                var def = new $.Deferred();
                $("body").append(template);
                bizagi.util.tablet.startkendo({
                    started: function() {
                        def.resolve();
                    }
                });
                return def.promise();
            });
    },

    /*
    *   Load one template and save it internally
    */
    loadTemplate: function(template, templateDestination) {
        var self = this;
        // Go fetch the template
        return self.templateService.getTemplate(templateDestination, template)
            .done(function(resolvedTemplate) {
                if (typeof resolvedTemplate === "string") {
                    self.templates[template] = $.trim(resolvedTemplate.replace(/\n/g, ""));
                }
            });
    },

    /*
    *   Load one template and save it internally
    */
    loadTemplateWebpart: function(template, templateDestination) {
        var self = this;

        // Go fetch the template
        return self.templateService.getTemplateWebpart(templateDestination, template)
            .done(function(resolvedRemplate) {
                self.templates[template] = $.trim(resolvedRemplate.replace(/\n/g, ""));
            });
    },

    /*
    *   Method to fetch templates from a private dictionary
    */
    getTemplate: function(template) {
        var self = this;
        return self.templates[template];
    },
    /*
    *   Initializes a webpart
    */
    loadWebpart: function(params) {
        var self = this;
        var defer = new $.Deferred();
        var webpartName = params.webpart;
        var webpart = bizagi.getWebpart(webpartName, params);

        if (!webpart) {
            bizagi.log("webpart not found");
        }

        if (bizagi.loader.environment === "release") {
            defer.resolve(webpart);
        } else {
            // Ensure the webpart is initialized
            $.when(bizagi.util.initWebpart(webpart, self.device))
                .done(function() {
                    // Load all templates asyncronously
                    $.when.apply(this, $.map(webpart.tmpl, function(tmpl) {
                        return self.loadTemplateWebpart(tmpl.originalAlias, bizagi.getTemplate(tmpl.alias, true));
                    })).done(function() {
                        defer.resolve(webpart);
                    });

                });
        }

        return defer.promise();
    },

    /*
    *   Returns a webpart
    */
    getWebpart: function(webpartImplementation, params) {
        var _hasConstructorName = function(webpartImplementation, params) {
            return params.constructorName ? params.constructorName : webpartImplementation;
        };
        try {
            webpartImplementation = _hasConstructorName(webpartImplementation, params);
            // Create a dynamic function to avoid problem with eval calls when minifying the code
            if (webpartImplementation.indexOf("bizagi") === -1) {
                webpartImplementation = "bizagi.workportal.webparts." + webpartImplementation;
            }

            var dynamicFunction;
            var stringBuilder = ["var baDynamicFn = function(facade, dataService, params){ \r\n"];

            stringBuilder.push("return new " + webpartImplementation + "(facade, dataService, params);\r\n");
            stringBuilder.push("}\r\n");
            stringBuilder.push("baDynamicFn");

            dynamicFunction = eval(stringBuilder.join("\n"));

            // Call the dynamic function
            return dynamicFunction(this, this.dataService, params);

        } catch (e) {
            bizagi.log(e);
        }
    },

    /*
    * call the render method for webparts and insert into canvas
    */
    executeWebpart: function(params) {
        var self = this;
        var defer = new $.Deferred();

        $.when(self.loadWebpart(params)).done(function(webpart) {
            var webpartImplementation = webpart["class"];
            var dynamic = self.getWebpart(webpartImplementation, params);

            $.when(dynamic.isAuthorized()).done(function(autorization){
                if(autorization){
                    $.when(dynamic.render($.extend(params, { creating: false })))
                    .done(function() {
                        params.canvas.triggerHandler("ondomincluded");
                        defer.resolve(dynamic);
                    });
                }else{
                    defer.fail();
                }
            });
        }).fail(function(e){
            console.log(e.message);
            defer.fail(e);
        });

        return defer.promise();
    },

    /**
     * execute the current user information then start the webparts
     * @param {Boolean} noExecuteWebparts only currentUser request
     */
    executeWebparts: function(noExecuteWebparts) {
        var self = this,
            _canExecuteWebparts = noExecuteWebparts !== true;

        // load rendering first
        self.loadModule(self.Class.render_module);

        return $.when(self.dataService.getCurrentUser()).fail(function(err) {
            $.when(self.dataService.logoutMobile())
                .always(function(response) {
                    self.defaultLogout();
                });
        }).pipe(
            function(currentUser) {
                // Sacar de este lugar cuando se adicione el security al currentUser
                currentUser.userProperties = {};
                var userProperty;
                var i = -1;
                self.startedOffline(self.dataService.online === false);
                while ((userProperty = currentUser.sUserProperties[++i])) {
                    currentUser.userProperties[userProperty.key] = userProperty.value;
                }

                bizagi.currentUser = currentUser;
                var startpage = currentUser.userProperties.userstartpage = currentUser.userProperties.userstartpage || "";
                self.sortMenuItemsByStartPage(startpage, currentUser);

                if (_canExecuteWebparts) {

                    return $.when(self.loadReleaseTemplates(),  self.security.getSecurity()).then(function() {
                        return $.when(
                            self.executeWebpart({
                                webpart: "homePortal",
                                constructorName: self.homePortalFramework.getHomePortalConstructorName(),
                                loadMeSection: self.meSection(),
                                canvas: $("body")
                            }),
                            self.executeWebpart({
                                webpart: "newcase",
                                canvas: $("body")
                            }),
                            self.executeWebpart({
                                webpart: "render",
                                canvas: $("body")
                            })).then(function() {
                            bizagi.debug("Finalizo ejecución de webparts workportal");
                        });
                    });
                }
            }
        );
    },

    loadReleaseTemplates: function() {

        if (bizagi.loader.environment !== "release") {
            return true;
        }

        var self = this;
        var defer = new $.Deferred();
        var prefix = bizagi.loader.useAbsolutePath ? bizagi.loader.basePath + bizagi.loader.getLocationPrefix() : "" + bizagi.loader.getLocationPrefix();
        var url = prefix + "jquery/workportalflat/production/" + this.device.replace(/[^a-z0-9]+/gi, "") + "/webpart." + this.device.replace(/[^a-z0-9]+/gi, "") + ".production.tmpl.html?build=" + bizagi.loader.build;

        steal.then({
            src: url,
            id: url,
            type: "text",
            waits: false,
            onError: function(options) {
                bizagi.log("Could not load file " + options.src, options, "error");
                defer.reject(options);
            }
        }).then(function() {
            var waitingTime = 1000;
            setTimeout( function() {
                var data = steal.resources[url].options.text;
                self.templates = eval("(" + data + ")");

                Object.keys(self.templates).map(function(key) {
                    self.templates[key] = self.templateService.localization.translate(self.templates[key]);
                });

                defer.resolve();
            }, waitingTime);            
        });

        return defer.promise();
    },

    /**
     * set homePortalLayout section to start with
     * @param {String} startpage Values userstartpage property
     *  "" -> El usuario no ha configurado esta opción(usuario viejo).
     *  "1" -> Automatic
     *  "2" -> Me
     *  "3" -> Inbox
     * @param {*} currentUser 
     */
    sortMenuItemsByStartPage: function(startpage, currentUser) {
        var self = this
            _isStakeholder = typeof currentUser.associatedStakeholders !== "undefined" && currentUser.associatedStakeholders.length > 0,
            _automaticOrMe = startpage === "1" || startpage === "2",
            _changingView = function() {
                var actualChanging = self.homePortalFramework.isChangingView();
                self.homePortalFramework.isChangingView(false);
                return actualChanging;
            },
            _isChangingView = _changingView(),
            _loadMe = self.meSection(_automaticOrMe && _isStakeholder && !_isChangingView);

        if (_loadMe) {
                // Merge layouts - Load dashboard "dashboard"
                self.homePortalFramework.homePortalLayout = $.extend(self.homePortalFramework.homePortalLayoutDashboard,
                    self.homePortalFramework.homePortalLayoutTaskFeed,
                    self.homePortalFramework.homePortalLayoutComplement,
                    self.homePortalFramework.homePortalLayoutSyncErrors);
        } else {
            // Merge layouts - Load task feed  "taskFeed"
            self.homePortalFramework.homePortalLayout = $.extend(self.homePortalFramework.homePortalLayoutTaskFeed,
                self.homePortalFramework.homePortalLayoutDashboard,
                self.homePortalFramework.homePortalLayoutComplement,
                self.homePortalFramework.homePortalLayoutSyncErrors);
        }
    },

    /**
     * set the section to start with
     * @param {Boolean} value true => me,  false => taskfeed
     */
    meSection: function(value) {
        var self = this;
        if (value !== undefined) {
            self.loadMeSection = value;
        }
        return self.loadMeSection;
    },

    /**
     * validate if the user is a stakeholder
     */
    hasStakeholders: function() {
        return bizagi.currentUser.associatedStakeholders && bizagi.currentUser.associatedStakeholders.length > 0;
    },

    /**
     * the initial value is set only, let to know if the user started the app on offline mode
     * @param {Boolean} value
     */
    startedOffline: function(value) {
        var self = this;
        if (value !== undefined) {
            self._startedOffline = value;
        }
        return self._startedOffline;
    },

    /**
     * review if is necessary call endpoint for get stakeholder info
     */
    validateUserInformation: function() {
        var self = this,
            _needStakeholderInfo = self.startedOffline() === true,
            _isReady = function() {
                var defer = new $.Deferred();
                defer.resolve();
                return defer;
            };
        if (_needStakeholderInfo && self.dataService.online)
            self.firstConnectionDone();
        return _needStakeholderInfo ? self.executeWebparts(true) : _isReady();
    },

    /**
     * any method can execute this one, to execute something on first time get internet
     * on first time to get online resolve the promise, else all promise will reject
     */
    executeOnFirstOnline: function() {
        var self = this,
            _startedOnline = !self.startedOffline(),
            _firstConDone = self._firstConnectionDone === undefined ? _startedOnline : self._firstConnectionDone,
            _needWait = self.startedOffline() && _firstConDone === false,
            _defer = self._firstConnectionDefer === undefined ? new $.Deferred() : self._firstConnectionDefer;

        self._firstConnectionDefer = _defer;
        self._firstConnectionDone = _firstConDone;
        if(!_needWait)_defer.reject();
        return _defer;
    },

    /**
     * resolve the firstConnection promise ans set the flag firstConnectionDone in true
     */
    firstConnectionDone: function() {
        var self = this;
        self._firstConnectionDone = true;
        if (self._firstConnectionDefer !== undefined)
            self._firstConnectionDefer.resolve();
    },

    loadModule: function(bizagiModule) {
        var self = this;
        if (typeof bizagiModule !== "string") {
            return;
        }

        if (typeof self.modules[bizagiModule] !== "undefined") {
            return self.modules[bizagiModule];
        }

        self.modules[bizagiModule] = new $.Deferred();

        bizagi.loader.start(bizagiModule).then(function() {
            self.modules[bizagiModule].resolve();
        });

        return self.modules[bizagiModule].promise();
    },

    defaultLogout: function() {
        /* istanbul ignore next: untestable */
        if (bizagi.util.isCordovaSupported()) {
            window.location = bizagi.services.ajax.logoutPage;
        } else {
            window.location.replace("");
        }
    }
});