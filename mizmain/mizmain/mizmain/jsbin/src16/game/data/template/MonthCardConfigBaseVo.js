/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MonthCardConfigBaseVo = /** @class */ (function () {
                function MonthCardConfigBaseVo() {
                }
                MonthCardConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.rewardid = data.getUint32();
                    this.itemid = data.getUint32();
                    this.itemnum = data.getUint32();
                    this.type = data.getUint32();
                };
                return MonthCardConfigBaseVo;
            }());
            template.MonthCardConfigBaseVo = MonthCardConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MonthCardConfigBaseVo.js.map