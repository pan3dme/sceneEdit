var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CLoginTipsBaseVo = /** @class */ (function () {
                function CLoginTipsBaseVo() {
                }
                CLoginTipsBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.tip = data.getUTFBytes(data.getUint32());
                    this.maxnum = data.getUint32();
                };
                return CLoginTipsBaseVo;
            }());
            template.CLoginTipsBaseVo = CLoginTipsBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CLoginTipsBaseVo.js.map