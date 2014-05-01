var SongSimilarity = (function () {
    function SongSimilarity(similarity, selector) {
        this.IsSelected = ko.observable(false);
        this.Id = similarity.SongId;

        this._selector = selector;
    }
    SongSimilarity.prototype.Select = function () {
        if (!this.IsSelected())
            this._selector.SelectSimilarity(this);

        return false;
    };
    return SongSimilarity;
})();
