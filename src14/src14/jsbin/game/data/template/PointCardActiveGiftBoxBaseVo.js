/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PointCardActiveGiftBox = /** @class */ (function () {
                function PointCardActiveGiftBox() {
                }
                PointCardActiveGiftBox.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.needactvalue = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                    this.itemid = data.getUint32();
                };
                return PointCardActiveGiftBox;
            }());
            template.PointCardActiveGiftBox = PointCardActiveGiftBox;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PointCardActiveGiftBoxBaseVo.js.map