var MainViewModel = (function () {
    function MainViewModel() {
        var _this = this;
        this.CurrentPage = ko.observable();
        this.CurrentPageViewModel = ko.observable();
        $(window).bind("hashchange", function (e) {
            return _this.HashChange();
        });
        this.HashChange();
    }
    MainViewModel.prototype.HashChange = function () {
        var hash = window.location.hash.length == 0 ? "" : window.location.hash.substr(1);

        var page = hash;

        this.CurrentPage(null);

        switch (page) {
            case "":
                this.CurrentPageViewModel(new HomeViewModel());
                break;
            case "Mood":
                this.CurrentPageViewModel(new MoodViewModel());
                break;
            default:
                this.CurrentPageViewModel(new HomeViewModel());
        }

        this.CurrentPage(page);

        if (this.CurrentPageViewModel() != null)
            this.CurrentPageViewModel().Initialize();
    };
    return MainViewModel;
})();
