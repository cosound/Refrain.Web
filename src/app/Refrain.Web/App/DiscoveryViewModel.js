﻿var DiscoveryViewModel = (function () {
    function DiscoveryViewModel() {
    }
    DiscoveryViewModel.prototype.Initialize = function () {
        twttr.ready(function () {
            return twttr.widgets.load();
        });
    };

    DiscoveryViewModel.prototype.PortalReady = function () {
    };
    return DiscoveryViewModel;
})();
